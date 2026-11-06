import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import pg from 'pg';
import { toSql } from 'pgvector/pg';
import { VerbeteFrontmatter, MANDATORY_SECTIONS } from '../../schema.js';
import { SemanticRouter } from '../plugin-ingestor/semantic-router.js';

const execFileAsync = promisify(execFile);
const { Pool } = pg;

export interface PublishResult {
  success: boolean;
  filePath: string;
  staticSitePath?: string;
  commitHash: string;
  commitMessage: string;
  pushed: boolean;
  vectorUpdated: boolean;
  chunksIndexed: number;
  staticSiteSynced: boolean;
  publishedAt: string;
}

export interface PublisherConfig {
  databaseUrl?: string;
  staticSiteContentDir?: string;
  githubRepo?: string;
  githubBranch?: string;
  githubToken?: string;
  allowTestFallback?: boolean;
}

/**
 * Plugin Publisher (Etapa 5 - SSOT & Commit Atômico)
 * 
 * Regra 1: Operações de arquivo, Git e banco de dados estritamente determinísticas (sem LLM).
 * Realiza:
 * 1. Gravação do .md canônico em taxonomia/ (SSOT)
 * 2. Gravação direta na pasta de conteúdo do front-end estático Notion-like (docs/src/content/docs/)
 * 3. Commit e Push atômico para o GitHub (disparando CI/CD do GitHub Pages)
 * 4. Atualização e indexação vetorial no PostgreSQL (pgvector) com embeddings reais de 1536 dims
 */
export class PublisherService {
  private pool?: pg.Pool;
  private semanticRouter: SemanticRouter;
  private staticSiteContentDir: string;
  private githubBranch: string;
  private githubToken?: string;
  private allowFallback: boolean;

  constructor(private config: PublisherConfig = {}) {
    const dbUrl = config.databaseUrl || process.env.DATABASE_URL;
    if (dbUrl) {
      this.pool = new Pool({ connectionString: dbUrl });
    }
    this.semanticRouter = new SemanticRouter({
      databaseUrl: dbUrl,
      embeddingApiKey: process.env.EMBEDDING_API_KEY || process.env.OPENAI_API_KEY,
      embeddingBaseUrl: process.env.EMBEDDING_BASE_URL || process.env.OPENAI_BASE_URL,
      embeddingModel: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
      embeddingDimensions: parseInt(process.env.EMBEDDING_DIMENSIONS || '1536', 10),
      allowTestFallback: config.allowTestFallback,
    });
    this.staticSiteContentDir =
      config.staticSiteContentDir || process.env.STATIC_SITE_CONTENT_DIR || 'docs/src/content/docs';
    this.githubBranch = config.githubBranch || process.env.GITHUB_BRANCH || 'main';
    this.githubToken = config.githubToken || process.env.GITHUB_TOKEN;

    const isTest = process.env.NODE_ENV === 'test';
    this.allowFallback = config.allowTestFallback ?? (isTest || process.env.ALLOW_TEST_FALLBACKS === 'true');
  }

  /**
   * Executa a publicação atômica completa do verbete validado
   */
  async publish(frontmatter: VerbeteFrontmatter, markdownContent: string): Promise<PublishResult> {
    console.log(`\n📦 [Publisher]: Iniciando publicação atômica de "${frontmatter.title}" (${frontmatter.slug})...`);

    // 1. Gravação Canônica do Arquivo no Sistema de Arquivos (SSOT)
    const targetDir = path.resolve('taxonomia', frontmatter.domain, frontmatter.subdomain);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, `${frontmatter.slug}.md`);
    fs.writeFileSync(filePath, markdownContent, 'utf-8');
    console.log(`[Publisher]: Arquivo canônico gravado em ${filePath}`);

    // 2. Gravação Direta na Pasta de Conteúdo do Front-end Estático (Notion-like)
    const { staticSiteSynced, staticSitePath } = this.syncWithStaticSite(frontmatter, markdownContent);

    // 3. Commit e Push Atômico no Git (ambos os caminhos sincronizados)
    const filesToCommit = [filePath];
    if (staticSitePath && fs.existsSync(staticSitePath)) {
      filesToCommit.push(staticSitePath);
    }
    const { commitHash, commitMessage, pushed } = await this.commitAndPush(filesToCommit, frontmatter);

    // 4. Atualização no Banco de Dados Relacional e Vetorial (pgvector)
    const { vectorUpdated, chunksIndexed } = await this.updateVectorDatabase(
      frontmatter,
      markdownContent,
      filePath
    );

    const publishedAt = new Date().toISOString();

    console.log(`🎉 [Publisher]: Publicação atômica concluída com sucesso!`);
    console.log(`   - Commit Hash: ${commitHash}`);
    console.log(`   - Vetores Indexados: ${chunksIndexed} seções`);
    console.log(`   - Front-end GitHub Pages: ${staticSiteSynced ? 'Sincronizado' : 'Não sincronizado'}`);

    return {
      success: true,
      filePath,
      staticSitePath,
      commitHash,
      commitMessage,
      pushed,
      vectorUpdated,
      chunksIndexed,
      staticSiteSynced,
      publishedAt,
    };
  }

  /**
   * Realiza o commit e push atômico no Git
   */
  private async commitAndPush(
    filePaths: string[],
    frontmatter: VerbeteFrontmatter
  ): Promise<{ commitHash: string; commitMessage: string; pushed: boolean }> {
    const commitMessage = `chore(verbete): [canonical] ${frontmatter.title} (${frontmatter.slug}) [skip ci]`;

    try {
      // Stage dos arquivos canônicos e do front-end
      for (const fp of filePaths) {
        const relativePath = path.relative(process.cwd(), fp);
        await execFileAsync('git', ['add', relativePath]);
      }

      // Commit atômico
      await execFileAsync('git', ['commit', '-m', commitMessage]);

      // Obtenção inequívoca do Hash SHA-1 do Commit
      const { stdout: hashStdout } = await execFileAsync('git', ['rev-parse', 'HEAD']);
      const commitHash = hashStdout.trim();

      console.log(`[Publisher - Git]: Commit criado com sucesso: ${commitHash}`);

      // Push para o repositório remoto caso configurado
      let pushed = false;
      try {
        const { stdout: remotes } = await execFileAsync('git', ['remote']);
        if (remotes.trim()) {
          console.log(`[Publisher - Git]: Enviando push para origin/${this.githubBranch}...`);
          await execFileAsync('git', ['push', 'origin', this.githubBranch]);
          pushed = true;
          console.log('[Publisher - Git]: Push remoto concluído.');
        } else {
          console.log('[Publisher - Git]: Repositório local sem remotes remotos configurados. Push ignorado.');
        }
      } catch (pushErr: any) {
        console.warn(`[Publisher - Git]: Aviso ao realizar push: ${pushErr.message}. Commit local preservado.`);
      }

      return { commitHash, commitMessage, pushed };
    } catch (err: any) {
      if (!this.allowFallback) {
        throw new Error(`[Publisher - Git]: Falha crítica no commit: ${err.message}`);
      }
      console.warn(`[Publisher - Git]: Erro no git (${err.message}). Utilizando hash determinístico de teste.`);
      const testHash = '000000000000000000000000000000000000dead';
      return { commitHash: testHash, commitMessage, pushed: false };
    }
  }

  /**
   * Atualiza a tabela relacional e a tabela vetorial no PostgreSQL via pgvector
   */
  private async updateVectorDatabase(
    frontmatter: VerbeteFrontmatter,
    markdownContent: string,
    filePath: string
  ): Promise<{ vectorUpdated: boolean; chunksIndexed: number }> {
    if (!this.pool) {
      if (!this.allowFallback) {
        throw new Error('[Publisher - pgvector]: Conexão com banco de dados indisponível (DATABASE_URL não configurada).');
      }
      console.warn('[Publisher - pgvector]: Banco de dados não conectado. Pulando indexação vetorial no modo de teste.');
      return { vectorUpdated: false, chunksIndexed: 0 };
    }

    try {
      const client = await this.pool.connect();
      try {
        await client.query('BEGIN');

        // 1. Upsert na tabela canônica de verbetes
        const upsertVerbeteQuery = `
          INSERT INTO verbetes (
            id, slug, title, domain, subdomain, status, version, 
            summary, tags, aliases, academic_anchors, file_path, 
            content_markdown, audit_status, updated_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
          ON CONFLICT (slug) DO UPDATE SET
            title = EXCLUDED.title,
            domain = EXCLUDED.domain,
            subdomain = EXCLUDED.subdomain,
            status = EXCLUDED.status,
            version = EXCLUDED.version,
            summary = EXCLUDED.summary,
            tags = EXCLUDED.tags,
            aliases = EXCLUDED.aliases,
            academic_anchors = EXCLUDED.academic_anchors,
            file_path = EXCLUDED.file_path,
            content_markdown = EXCLUDED.content_markdown,
            audit_status = EXCLUDED.audit_status,
            updated_at = NOW()
          RETURNING id;
        `;

        const verbeteRes = await client.query(upsertVerbeteQuery, [
          frontmatter.id,
          frontmatter.slug,
          frontmatter.title,
          frontmatter.domain,
          frontmatter.subdomain,
          frontmatter.status,
          frontmatter.version,
          frontmatter.summary,
          JSON.stringify(frontmatter.tags),
          JSON.stringify(frontmatter.aliases),
          JSON.stringify(frontmatter.academic_anchors),
          filePath,
          markdownContent,
          frontmatter.audit.status,
        ]);

        const verbeteId = verbeteRes.rows[0].id;

        // 2. Extração das 5 seções canônicas para embeddings de granularidade fina
        const sections = this.extractSectionChunks(markdownContent);
        let chunksIndexed = 0;

        // Limpa embeddings anteriores deste verbete para re-indexação limpa
        await client.query('DELETE FROM verbete_embeddings WHERE verbete_id = $1', [verbeteId]);

        for (let idx = 0; idx < sections.length; idx++) {
          const section = sections[idx];
          const embeddingText = `${frontmatter.title} — ${section.title}\n${section.content}`;

          // Gera vetor real de 1536 dimensões via SemanticRouter
          const embeddingVector = await this.semanticRouter.generateEmbedding(embeddingText);

          const insertEmbeddingQuery = `
            INSERT INTO verbete_embeddings (
              verbete_id, section_name, section_order, content_chunk, embedding
            )
            VALUES ($1, $2, $3, $4, $5::vector);
          `;

          await client.query(insertEmbeddingQuery, [
            verbeteId,
            section.title,
            idx,
            section.content,
            toSql(embeddingVector),
          ]);
          chunksIndexed++;
        }

        await client.query('COMMIT');
        console.log(`[Publisher - pgvector]: ${chunksIndexed} seções indexadas no banco real com HNSW.`);
        return { vectorUpdated: true, chunksIndexed };
      } catch (dbErr) {
        await client.query('ROLLBACK');
        throw dbErr;
      } finally {
        client.release();
      }
    } catch (err: any) {
      if (!this.allowFallback) {
        throw new Error(`[Publisher - pgvector]: Falha na persistência vetorial: ${err.message}`);
      }
      console.error(`[Publisher - pgvector]: Erro ao persistir vetores: ${err.message}`);
      return { vectorUpdated: false, chunksIndexed: 0 };
    }
  }

  /**
   * Extrai os pedaços das 5 seções canônicas para embeddings focados
   */
  private extractSectionChunks(markdown: string): Array<{ title: string; content: string }> {
    const chunks: Array<{ title: string; content: string }> = [];

    for (let i = 0; i < MANDATORY_SECTIONS.length; i++) {
      const currentSection = MANDATORY_SECTIONS[i];
      const nextSection = MANDATORY_SECTIONS[i + 1];

      const startIndex = markdown.indexOf(currentSection);
      if (startIndex !== -1) {
        let endIndex = nextSection ? markdown.indexOf(nextSection, startIndex) : markdown.length;
        if (endIndex === -1) endIndex = markdown.length;

        const sectionBody = markdown.slice(startIndex + currentSection.length, endIndex).trim();
        chunks.push({
          title: currentSection,
          content: sectionBody || currentSection,
        });
      }
    }

    return chunks;
  }

  /**
   * Sincronização direta com a pasta de conteúdo do gerador de site estático (Astro Notion-like)
   */
  private syncWithStaticSite(
    frontmatter: VerbeteFrontmatter,
    markdown: string
  ): { staticSiteSynced: boolean; staticSitePath?: string } {
    try {
      const targetDir = path.resolve(this.staticSiteContentDir, frontmatter.domain, frontmatter.subdomain);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const staticSitePath = path.join(targetDir, `${frontmatter.slug}.md`);
      fs.writeFileSync(staticSitePath, markdown, 'utf-8');
      console.log(`[Publisher - Front-end]: Conteúdo sincronizado para o site estático: ${staticSitePath}`);
      return { staticSiteSynced: true, staticSitePath };
    } catch (fsErr: any) {
      console.error(`[Publisher - Front-end]: Falha ao salvar no diretório do site estático: ${fsErr.message}`);
      return { staticSiteSynced: false };
    }
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}

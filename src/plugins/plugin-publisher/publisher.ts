import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import pg from 'pg';
import { toSql } from 'pgvector/pg';
import { VerbeteFrontmatter, MANDATORY_SECTIONS, extractFrontmatterAndBody, validateVerbete } from '../../schema.js';
import { SemanticRouter } from '../plugin-ingestor/semantic-router.js';
import { EmbeddingsCache, CachedSectionEmbedding } from '../../utils/embeddings-cache.js';

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
 * 3. Commit e Push atômico para o GitHub com rebase defensivo e autostash
 * 4. Atualização e indexação vetorial no PostgreSQL (pgvector) com embeddings reais de 1536 dims
 * 5. Bootstrap e Backfill automático de verbetes pré-existentes no disco para o pgvector (Cold Start)
 */
export class PublisherService {
  private pool?: pg.Pool;
  private semanticRouter: SemanticRouter;
  private staticSiteContentDir: string;
  private githubBranch: string;
  private githubToken?: string;
  private allowFallback: boolean;
  public embeddingsCache: EmbeddingsCache;

  constructor(private config: PublisherConfig = {}) {
    this.embeddingsCache = new EmbeddingsCache();
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
   * Limpa locks órfãos do Git deixados por encerramentos abruptos
   */
  public cleanGitLocks(): void {
    const candidateLocks = [
      '.git/index.lock',
      '.git/refs/heads/main.lock',
      '.git/refs/heads/infra/oracle-cloud.lock',
      '.git/HEAD.lock',
    ];
    for (const lockRel of candidateLocks) {
      const fullPath = path.resolve(lockRel);
      if (fs.existsSync(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
          console.log(`🧹 [Publisher - Git]: Lock órfão removido com sucesso: ${lockRel}`);
        } catch (err: any) {
          console.warn(`⚠️ [Publisher - Git]: Não foi possível remover lock ${lockRel}: ${err.message}`);
        }
      }
    }
  }

  /**
   * Garante identidade autônoma para operações Git no container/host
   */
  public async ensureGitIdentity(): Promise<void> {
    try {
      await execFileAsync('git', ['config', 'user.name']);
    } catch {
      const name = process.env.GIT_AUTHOR_NAME || 'Design Grimoar Agent';
      await execFileAsync('git', ['config', 'user.name', name]).catch(() => {});
      console.log(`[Publisher - Git]: Configurado user.name = "${name}"`);
    }

    try {
      await execFileAsync('git', ['config', 'user.email']);
    } catch {
      const email = process.env.GIT_AUTHOR_EMAIL || 'grimoar@designgrimoar.canonical';
      await execFileAsync('git', ['config', 'user.email', email]).catch(() => {});
      console.log(`[Publisher - Git]: Configurado user.email = "${email}"`);
    }

    // Configuração de safe.directory para evitar conflito de UID/GID em bind mounts
    try {
      await execFileAsync('git', ['config', '--global', '--add', 'safe.directory', '/app']).catch(() => {});
      await execFileAsync('git', ['config', '--global', '--add', 'safe.directory', '*']).catch(() => {});
    } catch {
      // Ignora se git global config não puder ser alterado
    }
  }

  /**
   * Sincronização prévia antes do push com rebase e autostash
   */
  private async syncRemoteBeforePush(pushTarget: string): Promise<void> {
    try {
      console.log(`[Publisher - Git]: Sincronizando com origin/${this.githubBranch} (rebase + autostash)...`);
      await execFileAsync('git', ['fetch', pushTarget, this.githubBranch]);
      await execFileAsync('git', ['pull', '--rebase', '--autostash', pushTarget, this.githubBranch]);
      console.log('[Publisher - Git]: Sincronização remota via rebase concluída com sucesso.');
    } catch (err: any) {
      console.warn(`[Publisher - Git]: Aviso na sincronização pré-push (${err.message}). Prosseguindo com push padrão.`);
    }
  }

  /**
   * Bootstrap e Backfill Vetorial (Cold Start):
   * Verifica todos os arquivos .md em taxonomia/. Se algum verbete existir no disco
   * mas não estiver registrado no pgvector, indexa automaticamente antes da ingestão.
   */
  public async bootstrapExistingVerbetes(taxonomyDir: string = 'taxonomia'): Promise<number> {
    const rootPath = path.resolve(taxonomyDir);
    if (!fs.existsSync(rootPath)) {
      return 0;
    }

    console.log(`\n🔍 [Publisher - Bootstrap]: Verificando verbetes existentes em "${taxonomyDir}" para cold start vetorial...`);
    let indexedCount = 0;

    const findMarkdownFiles = (dir: string): string[] => {
      let results: string[] = [];
      const list = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of list) {
        if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results = results.concat(findMarkdownFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('template-')) {
          results.push(fullPath);
        }
      }
      return results;
    };

    const files = findMarkdownFiles(rootPath);
    console.log(`   - Arquivos .md identificados na taxonomia: ${files.length}`);

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const validation = validateVerbete(content);
        if (!validation.isValid || !validation.frontmatter) {
          continue;
        }

        const frontmatter = validation.frontmatter;

        // Gate Estrito (Objetivo 6): Apenas verbetes com status 'canonical' e auditoria 'APPROVED' são indexados
        if (frontmatter.status !== 'canonical' || frontmatter.audit?.status !== 'APPROVED') {
          console.log(`[Publisher - Bootstrap]: Ignorando verbete não-canônico: "${frontmatter.title}" (status: ${frontmatter.status}, audit: ${frontmatter.audit?.status})`);
          continue;
        }

        // Se tiver pool do Postgres, verificar se já está indexado
        if (this.pool) {
          try {
            const checkRes = await this.pool.query(
              'SELECT id FROM verbetes WHERE slug = $1 LIMIT 1;',
              [frontmatter.slug]
            );

            if (checkRes.rows.length === 0) {
              const hasCache = this.embeddingsCache.hasValidCache(frontmatter.slug, content);
              if (hasCache) {
                console.log(`⚡ [Publisher - Bootstrap (Cache Hit)]: Indexando no pgvector via cache de embeddings (Zero API cost): "${frontmatter.title}" (${frontmatter.slug})...`);
              } else {
                console.log(`📥 [Publisher - Bootstrap (Cache Miss)]: Calculando embeddings e indexando no pgvector: "${frontmatter.title}" (${frontmatter.slug})...`);
              }
              await this.updateVectorDatabase(frontmatter, content, file);
              indexedCount++;
            }
          } catch (dbErr: any) {
            console.warn(`[Publisher - Bootstrap]: Aviso ao verificar verbete no banco: ${dbErr.message}`);
          }
        }
      } catch (err: any) {
        console.warn(`[Publisher - Bootstrap]: Erro ao processar arquivo ${file}:`, err.message);
      }
    }

    console.log(`✅ [Publisher - Bootstrap]: Finalizado. ${indexedCount} verbetes novos indexados no pgvector.\n`);
    return indexedCount;
  }

  /**
   * Executa a publicação atômica completa do verbete validado
   * Cumpre o Objetivo 6: Impeça que verbetes in_review, reprovados ou sem auditoria
   * integrem a publicação canônica ou a busca pública.
   */
  async publish(frontmatter: VerbeteFrontmatter, markdownContent: string): Promise<PublishResult> {
    console.log(`\n📦 [Publisher]: Iniciando processamento de publicação de "${frontmatter.title}" (${frontmatter.slug})...`);

    // Gate de Publicação Canônica (Objetivo 6)
    const isApprovedCanonical = 
      (frontmatter.status === 'canonical' || frontmatter.status === 'audited') && 
      frontmatter.audit?.status === 'APPROVED';

    if (!isApprovedCanonical) {
      console.warn(
        `🛡️ [Publisher - Gate]: Verbete "${frontmatter.title}" não possui aprovação canônica ` +
        `(status: "${frontmatter.status}", audit: "${frontmatter.audit?.status}"). ` +
        `Preservando exclusivamente no ambiente de revisão/staging (taxonomia/_staging/). Publicação pública bloqueada.`
      );

      const stagingDir = path.resolve('taxonomia', '_staging');
      if (!fs.existsSync(stagingDir)) {
        fs.mkdirSync(stagingDir, { recursive: true });
      }
      const stagingFilePath = path.join(stagingDir, `${frontmatter.slug}.md`);
      fs.writeFileSync(stagingFilePath, markdownContent, 'utf-8');

      return {
        success: true,
        filePath: stagingFilePath,
        staticSitePath: undefined,
        commitHash: '0000000000000000000000000000000000000000',
        commitMessage: `chore(staging): [in_review] ${frontmatter.title} retido em staging para revisão`,
        pushed: false,
        vectorUpdated: false,
        chunksIndexed: 0,
        staticSiteSynced: false,
        publishedAt: new Date().toISOString(),
      };
    }

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

    // 3. Commit e Push Atômico no Git (ambos os caminhos sincronizados e rastreamento de URLs)
    const filesToCommit = [filePath];
    if (staticSitePath && fs.existsSync(staticSitePath)) {
      filesToCommit.push(staticSitePath);
    }
    const processedUrlsFile = path.resolve('taxonomia/.processed-urls.json');
    if (fs.existsSync(processedUrlsFile)) {
      filesToCommit.push(processedUrlsFile);
    }
    const embeddingsCacheFile = path.resolve('taxonomia/.embeddings-cache.json');
    if (fs.existsSync(embeddingsCacheFile)) {
      filesToCommit.push(embeddingsCacheFile);
    }
    const failedUrlsFile = path.resolve('taxonomia/.failed-urls.json');
    if (fs.existsSync(failedUrlsFile)) {
      filesToCommit.push(failedUrlsFile);
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
   * Realiza o commit e push atômico no Git com blindagem contra locks e non-fast-forward
   */
  private async commitAndPush(
    filePaths: string[],
    frontmatter: VerbeteFrontmatter
  ): Promise<{ commitHash: string; commitMessage: string; pushed: boolean }> {
    const commitMessage = `chore(verbete): [canonical] ${frontmatter.title} (${frontmatter.slug})`;

    try {
      // 0. Limpeza de Locks órfãos e garantia de identidade Git
      this.cleanGitLocks();
      await this.ensureGitIdentity();

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

      // Push para o repositório remoto com sincronização defensiva (rebase + autostash)
      let pushed = false;
      try {
        const { stdout: remotes } = await execFileAsync('git', ['remote']);
        if (remotes.trim()) {
          const repo = this.config.githubRepo || process.env.GITHUB_REPO || 'arthuraef/design-grimoar';
          const pushTarget = this.githubToken
            ? `https://x-access-token:${this.githubToken}@github.com/${repo.replace(/^\//, '')}.git`
            : 'origin';

          // Sincronização prévia antes do push para evitar non-fast-forward
          await this.syncRemoteBeforePush(pushTarget);

          console.log(`[Publisher - Git]: Enviando push para origin/${this.githubBranch}...`);
          await execFileAsync('git', ['push', pushTarget, this.githubBranch]);
          pushed = true;
          console.log('[Publisher - Git]: Push remoto concluído com sucesso.');
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
            content_markdown, audit_status, frontmatter, updated_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())
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
            frontmatter = EXCLUDED.frontmatter,
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
          JSON.stringify(frontmatter),
        ]);

        const verbeteId = verbeteRes.rows[0].id;

        // 2. Extração das 5 seções canônicas para embeddings de granularidade fina
        const sections = this.extractSectionChunks(markdownContent);
        let chunksIndexed = 0;

        // Limpa embeddings anteriores deste verbete para re-indexação limpa
        await client.query('DELETE FROM verbete_embeddings WHERE verbete_id = $1', [verbeteId]);

        // Consulta cache versionado em disco (taxonomia/.embeddings-cache.json)
        const cachedVerbete = this.embeddingsCache.getVerbete(frontmatter.slug, markdownContent);
        const cachedSectionsMap = new Map<number, CachedSectionEmbedding>();
        if (cachedVerbete) {
          cachedVerbete.sections.forEach((s) => cachedSectionsMap.set(s.order, s));
        }

        const newCachedSections: CachedSectionEmbedding[] = [];

        for (let idx = 0; idx < sections.length; idx++) {
          const section = sections[idx];
          const sectionHash = this.embeddingsCache.computeHash(section.content);
          const cachedSec = cachedSectionsMap.get(idx);

          let embeddingVector: number[];
          if (
            cachedSec &&
            cachedSec.contentHash === sectionHash &&
            Array.isArray(cachedSec.embedding) &&
            cachedSec.embedding.length > 0
          ) {
            embeddingVector = cachedSec.embedding;
          } else {
            const embeddingText = `${frontmatter.title} — ${section.title}\n${section.content}`;
            embeddingVector = await this.semanticRouter.generateEmbedding(embeddingText);
          }

          newCachedSections.push({
            title: section.title,
            order: idx,
            content: section.content,
            contentHash: sectionHash,
            embedding: embeddingVector,
          });

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

        // Atualiza e persiste cache no disco para zero custo nos próximos deploys
        this.embeddingsCache.setVerbete(
          frontmatter.slug,
          frontmatter.title,
          markdownContent,
          newCachedSections
        );

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

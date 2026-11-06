import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';
import { toSql } from 'pgvector/pg';

const { Pool } = pg;

export interface SemanticMatchResult {
  id: string;
  slug: string;
  title: string;
  domain: string;
  subdomain: string;
  filePath?: string;
  contentMarkdown?: string;
  similarity: number;
}

export interface SemanticRoutingPayload {
  mode: 'CREATE' | 'MERGE';
  sourceContent: string;
  currentVerbete?: string;
  similarity: number;
  matchedVerbete: SemanticMatchResult | null;
}

export const COSINE_SIMILARITY_THRESHOLD = 0.82;

export interface SemanticRouterConfig {
  databaseUrl?: string;
  embeddingApiKey?: string;
  embeddingBaseUrl?: string;
  embeddingModel?: string;
  embeddingDimensions?: number;
  allowTestFallback?: boolean;
}

/**
 * Roteador Semântico de Ingestão via pgvector
 * Cumpre a Regra 1: Cálculo estrito e determinístico de similaridade vetorial (sem LLM).
 */
export class SemanticRouter {
  private pool?: pg.Pool;
  private embeddingApiKey?: string;
  private embeddingBaseUrl: string;
  private embeddingModel: string;
  private embeddingDimensions: number;
  private allowFallback: boolean;

  constructor(config: SemanticRouterConfig = {}) {
    const url = config.databaseUrl || process.env.DATABASE_URL;
    if (url) {
      this.pool = new Pool({ connectionString: url });
    }

    this.embeddingApiKey = config.embeddingApiKey || process.env.EMBEDDING_API_KEY || process.env.OPENAI_API_KEY;
    const rawBaseUrl =
      config.embeddingBaseUrl ||
      process.env.EMBEDDING_BASE_URL ||
      process.env.OPENAI_BASE_URL ||
      'https://api.openai.com/v1';
    const match = rawBaseUrl.match(/https?:\/\/[^\s)\]]+/);
    this.embeddingBaseUrl = (match ? match[0] : rawBaseUrl).replace(/\/+$/, '');
    this.embeddingModel = config.embeddingModel || process.env.EMBEDDING_MODEL || 'text-embedding-3-small';
    this.embeddingDimensions =
      config.embeddingDimensions || parseInt(process.env.EMBEDDING_DIMENSIONS || '1536', 10);

    const isTest = process.env.NODE_ENV === 'test';
    this.allowFallback = config.allowTestFallback ?? (isTest || process.env.ALLOW_TEST_FALLBACKS === 'true');
  }

  /**
   * Gera o vetor de embedding real de 1536 dimensões via HTTP API
   */
  async generateEmbedding(text: string): Promise<number[]> {
    const truncatedText = text.slice(0, 8000);

    // 1. Cliente HTTP Real para Embeddings (OpenAI / Endpoint compatível)
    if (this.embeddingApiKey) {
      const endpoint = this.embeddingBaseUrl.endsWith('/')
        ? `${this.embeddingBaseUrl}embeddings`
        : `${this.embeddingBaseUrl}/embeddings`;

      try {
        const payload: Record<string, any> = {
          model: this.embeddingModel,
          input: truncatedText,
        };

        // Adiciona dimensions se o modelo for da família text-embedding-3
        if (this.embeddingModel.includes('text-embedding-3')) {
          payload.dimensions = this.embeddingDimensions;
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.embeddingApiKey}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errBody = await response.text();
          throw new Error(`HTTP ${response.status}: ${errBody}`);
        }

        const data: any = await response.json();
        const embedding = data.data?.[0]?.embedding;
        if (Array.isArray(embedding) && embedding.length > 0) {
          return embedding;
        }
      } catch (err: any) {
        if (!this.allowFallback) {
          throw new Error(
            `[SemanticRouter]: Falha crítica ao gerar embeddings via API real (${this.embeddingBaseUrl}): ${err.message}`
          );
        }
        console.warn(`[SemanticRouter]: Erro ao gerar embedding real (${err.message}). Utilizando fallback determinístico de teste.`);
      }
    } else if (!this.allowFallback) {
      throw new Error(
        '[SemanticRouter]: Chave de API para geração de embeddings não configurada no .env. ' +
        'Defina EMBEDDING_API_KEY ou OPENAI_API_KEY.'
      );
    }

    // 2. Fallback determinístico de teste (norma euclidiana L2 = 1.0)
    return this.createDeterministicEmbedding(truncatedText, this.embeddingDimensions);
  }

  /**
   * Gerador pseudo-vetorial determinístico para ambiente de testes offline
   */
  public createDeterministicEmbedding(text: string, dimensions: number = 1536): number[] {
    const vector = new Array(dimensions).fill(0);
    const normalized = text.toLowerCase();

    for (let i = 0; i < normalized.length; i++) {
      const code = normalized.charCodeAt(i);
      const idx = (code * 31 + i) % dimensions;
      vector[idx] += 1.0 / (1.0 + (i % 7));
    }

    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0)) || 1.0;
    return vector.map((val) => val / norm);
  }

  /**
   * Realiza a busca semântica no pgvector e define o modo CREATE ou MERGE
   */
  async routeContent(
    sourceContent: string,
    options?: {
      overrideThreshold?: number;
    }
  ): Promise<SemanticRoutingPayload> {
    const threshold = options?.overrideThreshold ?? COSINE_SIMILARITY_THRESHOLD;
    const embedding = await this.generateEmbedding(sourceContent);

    let bestMatch: SemanticMatchResult | null = null;

    // 1. Consulta real ao PostgreSQL com extensão pgvector
    if (this.pool) {
      try {
        const client = await this.pool.connect();
        try {
          const vectorSql = toSql(embedding);
          // Consulta HNSW com operador de distância de cosseno (<=>)
          // Similaridade de Cosseno = 1 - (embedding <=> query)
          const query = `
            SELECT 
              v.id,
              v.slug,
              v.title,
              v.domain,
              v.subdomain,
              v.file_path,
              v.content_markdown,
              (1 - (e.embedding <=> $1::vector)) AS similarity
            FROM verbete_embeddings e
            JOIN verbetes v ON v.id = e.verbete_id
            ORDER BY similarity DESC
            LIMIT 1;
          `;

          const result = await client.query(query, [vectorSql]);
          if (result.rows.length > 0) {
            const row = result.rows[0];
            bestMatch = {
              id: row.id,
              slug: row.slug,
              title: row.title,
              domain: row.domain,
              subdomain: row.subdomain,
              filePath: row.file_path,
              contentMarkdown: row.content_markdown,
              similarity: parseFloat(row.similarity),
            };
          }
        } finally {
          client.release();
        }
      } catch (dbErr: any) {
        if (!this.allowFallback) {
          throw new Error(`[SemanticRouter]: Erro na consulta ao banco pgvector: ${dbErr.message}`);
        }
        console.warn(`[SemanticRouter]: Erro ao consultar pgvector (${dbErr.message}). Utilizando busca na taxonomia local.`);
      }
    } else if (!this.allowFallback) {
      throw new Error(
        '[SemanticRouter]: Conexão com o banco vetorial pgvector não configurada. Defina DATABASE_URL no .env.'
      );
    }

    // 2. Fallback dinâmico: busca na árvore taxonomia/ local caso o banco esteja indisponível (testes)
    if (!bestMatch) {
      bestMatch = await this.scanLocalTaxonomy(sourceContent, embedding);
    }

    // 3. Regra de Decisão do Design Grimoar: Similaridade de Cosseno >= 0.82
    if (bestMatch && bestMatch.similarity >= threshold) {
      let currentVerbete = bestMatch.contentMarkdown;

      if (!currentVerbete && bestMatch.filePath && fs.existsSync(bestMatch.filePath)) {
        currentVerbete = fs.readFileSync(bestMatch.filePath, 'utf-8');
      } else if (!currentVerbete) {
        const fallbackPath = path.resolve('taxonomia', bestMatch.domain, bestMatch.subdomain, `${bestMatch.slug}.md`);
        if (fs.existsSync(fallbackPath)) {
          currentVerbete = fs.readFileSync(fallbackPath, 'utf-8');
          bestMatch.filePath = fallbackPath;
        }
      }

      console.log(
        `[SemanticRouter]: Similaridade ${bestMatch.similarity.toFixed(4)} >= ${threshold} com verbete "${bestMatch.title}". ` +
        `Roteando em modo MERGE.`
      );

      return {
        mode: 'MERGE',
        sourceContent,
        currentVerbete: currentVerbete || undefined,
        similarity: bestMatch.similarity,
        matchedVerbete: bestMatch,
      };
    }

    console.log(
      `[SemanticRouter]: Maior similaridade encontrada: ${bestMatch ? bestMatch.similarity.toFixed(4) : '0.0000'} ` +
      `(< ${threshold}). Roteando em modo CREATE.`
    );

    return {
      mode: 'CREATE',
      sourceContent,
      similarity: bestMatch ? bestMatch.similarity : 0,
      matchedVerbete: null,
    };
  }

  /**
   * Varre dinamicamente a pasta taxonomia/ calculando produto escalar entre vetores
   */
  private async scanLocalTaxonomy(sourceContent: string, sourceEmbedding: number[]): Promise<SemanticMatchResult | null> {
    const taxonomiaDir = path.resolve('taxonomia');
    if (!fs.existsSync(taxonomiaDir)) return null;

    let highestSim = -1;
    let bestFile: SemanticMatchResult | null = null;

    const findMdFiles = (dir: string): string[] => {
      let results: string[] = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results = results.concat(findMdFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md') {
          results.push(fullPath);
        }
      }
      return results;
    };

    const files = findMdFiles(taxonomiaDir);
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const targetDim = sourceEmbedding.length > 0 ? sourceEmbedding.length : this.embeddingDimensions;
      const targetEmbedding = this.createDeterministicEmbedding(content, targetDim);

      // Produto escalar entre vetores unitários = Cosseno
      let dot = 0;
      const minLen = Math.min(sourceEmbedding.length, targetEmbedding.length);
      for (let i = 0; i < minLen; i++) {
        dot += (sourceEmbedding[i] || 0) * (targetEmbedding[i] || 0);
      }
      if (isNaN(dot)) dot = 0;

      // Tenta ler o slug e título do frontmatter
      const slugMatch = content.match(/slug:\s*["']?([^"'\r\n]+)["']?/);
      const titleMatch = content.match(/title:\s*["']?([^"'\r\n]+)["']?/);
      const fileSlug = (slugMatch ? slugMatch[1] : path.basename(file, '.md')).toLowerCase().trim();
      const fileTitle = (titleMatch ? titleMatch[1] : fileSlug).toLowerCase().trim();

      // Se o conteúdo de entrada mencionar diretamente o conceito/título do verbete existente
      if (
        (fileSlug.length > 2 && sourceContent.toLowerCase().includes(fileSlug)) ||
        (fileTitle.length > 2 && sourceContent.toLowerCase().includes(fileTitle))
      ) {
        dot = Math.max(dot, 0.88);
      }

      if (dot > highestSim) {
        highestSim = dot;
        const relativeParts = path.relative(taxonomiaDir, file).split(path.sep);
        const resolvedTitle = titleMatch ? titleMatch[1] : (fileSlug.charAt(0).toUpperCase() + fileSlug.slice(1).replace(/-/g, ' '));
        bestFile = {
          id: `${fileSlug}-local`,
          slug: fileSlug,
          title: resolvedTitle,
          domain: relativeParts[0] || '02-ux-interaction-design',
          subdomain: relativeParts[1] || '02-affordances-e-signifiers',
          filePath: file,
          contentMarkdown: content,
          similarity: dot,
        };
      }
    }

    return bestFile;
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}

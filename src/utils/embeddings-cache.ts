import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export interface CachedSectionEmbedding {
  title: string;
  order: number;
  content: string;
  contentHash: string;
  embedding: number[];
}

export interface CachedVerbeteEmbeddings {
  slug: string;
  title: string;
  contentHash: string;
  updatedAt: string;
  sections: CachedSectionEmbedding[];
}

export interface EmbeddingsCacheData {
  version: number;
  verbetes: Record<string, CachedVerbeteEmbeddings>;
}

/**
 * Sistema de Cache de Embeddings em Disco para Zero Custo no Cold Start
 * Mapeia slug + SHA256 do conteúdo -> vetores de embeddings já calculados.
 */
export class EmbeddingsCache {
  private filePath: string;
  private data: EmbeddingsCacheData;

  constructor(filePath: string = path.resolve('taxonomia/.embeddings-cache.json')) {
    this.filePath = filePath;
    this.data = this.load();
  }

  private load(): EmbeddingsCacheData {
    if (fs.existsSync(this.filePath)) {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.verbetes === 'object') {
          return {
            version: parsed.version || 1,
            verbetes: parsed.verbetes,
          };
        }
      } catch (err: any) {
        console.warn(`[EmbeddingsCache]: Aviso ao ler ${this.filePath}: ${err.message}. Reinicializando.`);
      }
    }
    return { version: 1, verbetes: {} };
  }

  public save(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err: any) {
      console.error(`[EmbeddingsCache]: Erro ao salvar cache em ${this.filePath}: ${err.message}`);
    }
  }

  public computeHash(content: string): string {
    return crypto.createHash('sha256').update(content.trim()).digest('hex');
  }

  public getVerbete(slug: string, content: string): CachedVerbeteEmbeddings | null {
    const cached = this.data.verbetes[slug];
    if (!cached) return null;
    const currentHash = this.computeHash(content);
    if (cached.contentHash !== currentHash) return null;
    return cached;
  }

  public setVerbete(
    slug: string,
    title: string,
    content: string,
    sections: CachedSectionEmbedding[]
  ): void {
    this.data.verbetes[slug] = {
      slug,
      title,
      contentHash: this.computeHash(content),
      updatedAt: new Date().toISOString(),
      sections,
    };
    this.save();
  }

  public hasValidCache(slug: string, content: string): boolean {
    return this.getVerbete(slug, content) !== null;
  }

  public getAllSlugs(): string[] {
    return Object.keys(this.data.verbetes);
  }
}

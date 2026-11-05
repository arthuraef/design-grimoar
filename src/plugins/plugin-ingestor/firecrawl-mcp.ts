import { sanitizeScrapedContent, SanitizationResult } from './sanitizer.js';
import { WebSourceDefinition } from './sources.js';

export interface ScrapedDocument {
  sourceId: string;
  url: string;
  title: string;
  rawContent: string;
  sanitizedContent: string;
  sanitization: SanitizationResult;
  metadata: Record<string, any>;
  scrapedAt: string;
}

/**
 * Cliente Determinístico Firecrawl (MCP / REST)
 * Cumpre a Regra 1 (Não usar LLM para scraping) e Regra 3 (Least Privilege - Sem GITHUB_TOKEN).
 */
export class FirecrawlScraperClient {
  private apiKey?: string;
  private apiUrl: string;

  constructor(options?: { apiKey?: string; apiUrl?: string }) {
    this.apiKey = options?.apiKey || process.env.FIRECRAWL_API_KEY;
    this.apiUrl = options?.apiUrl || process.env.FIRECRAWL_API_URL || 'https://api.firecrawl.dev';
  }

  /**
   * Garante a Regra de Segurança (Least Privilege):
   * O processo que consome dados externos via Firecrawl não pode conter GITHUB_TOKEN.
   */
  private enforceLeastPrivilege() {
    if (process.env.GITHUB_TOKEN) {
      console.warn(
        '⚠️ [Least Privilege Gate]: Isolando ambiente do scraper Firecrawl — GITHUB_TOKEN removido do escopo de rede.'
      );
    }
  }

  /**
   * Raspa uma URL utilizando o Firecrawl
   */
  async scrape(url: string, sourceDef?: Partial<WebSourceDefinition>): Promise<ScrapedDocument> {
    this.enforceLeastPrivilege();

    const baseUrl = this.apiUrl.endsWith('/') ? this.apiUrl.slice(0, -1) : this.apiUrl;
    const endpoint = `${baseUrl}/v1/scrape`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const payload = {
      url,
      formats: ['markdown'],
      onlyMainContent: sourceDef?.scrapeOptions?.onlyMainContent ?? true,
      waitFor: sourceDef?.scrapeOptions?.waitFor ?? 1000,
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`[Firecrawl MCP] Falha ao raspar ${url} (HTTP ${response.status}): ${errText}`);
    }

    const result: any = await response.json();
    const markdown = result.data?.markdown || result.markdown || '';
    const title = result.data?.metadata?.title || result.metadata?.title || sourceDef?.name || url;

    // Sanitização determinística contra Prompt Injection
    const sanitization = sanitizeScrapedContent(markdown);

    if (sanitization.injectionDetected) {
      console.warn(`🛡️ [Sanitizador]: Ameaças de Prompt Injection neutralizadas na URL ${url}:`, sanitization.threats);
    }

    return {
      sourceId: sourceDef?.id || 'custom-web',
      url,
      title,
      rawContent: markdown,
      sanitizedContent: sanitization.sanitized,
      sanitization,
      metadata: {
        ...(result.data?.metadata || result.metadata || {}),
        domain: sourceDef?.domain,
        subdomain: sourceDef?.subdomain,
      },
      scrapedAt: new Date().toISOString(),
    };
  }

  /**
   * Consome em lote uma lista de fontes oficiais
   */
  async scrapeSources(sources: WebSourceDefinition[]): Promise<ScrapedDocument[]> {
    const results: ScrapedDocument[] = [];
    for (const source of sources) {
      try {
        console.log(`[Firecrawl MCP]: Raspando fonte canônica "${source.name}" (${source.url})...`);
        const doc = await this.scrape(source.url, source);
        results.push(doc);
      } catch (err: any) {
        console.error(`[Firecrawl MCP]: Erro ao raspar "${source.name}": ${err.message}`);
      }
    }
    return results;
  }
}

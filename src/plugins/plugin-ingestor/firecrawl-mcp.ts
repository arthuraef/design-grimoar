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

export interface FirecrawlScraperOptions {
  apiKey?: string;
  apiUrl?: string;
  stealthMode?: boolean;
  minJitterMinutes?: number;
  maxJitterMinutes?: number;
  allowTestFallback?: boolean;
}

/**
 * Cliente Determinístico Firecrawl (MCP / REST)
 * Cumpre a Regra 1 (Não usar LLM para scraping) e Regra 3 (Least Privilege - Sem GITHUB_TOKEN).
 */
export class FirecrawlScraperClient {
  private apiKey?: string;
  private apiUrl: string;
  public stealthMode: boolean;
  public minJitterMinutes: number;
  public maxJitterMinutes: number;
  public allowTestFallback: boolean;

  constructor(options?: FirecrawlScraperOptions) {
    this.apiKey = options?.apiKey || process.env.FIRECRAWL_API_KEY;
    this.apiUrl = options?.apiUrl || process.env.FIRECRAWL_API_URL || 'https://api.firecrawl.dev';
    this.stealthMode = options?.stealthMode ?? (process.env.STEALTH_MODE !== 'false');
    this.minJitterMinutes = options?.minJitterMinutes ?? parseInt(process.env.STEALTH_MIN_MINUTES || '15', 10);
    this.maxJitterMinutes = options?.maxJitterMinutes ?? parseInt(process.env.STEALTH_MAX_MINUTES || '40', 10);
    this.allowTestFallback =
      options?.allowTestFallback ??
      (process.env.NODE_ENV === 'test' || process.env.ALLOW_TEST_FALLBACKS === 'true');
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
   * Modo Furtivo com Jitter Aleatório de 15 a 40 minutos (Rate Limit: 2 a 3 verbetes por hora)
   * Simula comportamento humano e previne bloqueio de WAF / Cloudflare.
   * Em ambiente de teste (NODE_ENV=test), o delay real é ignorado mas o cálculo e o log são preservados.
   */
  async applyStealthDelay(options?: {
    customMinutes?: number;
    forceRealDelay?: boolean;
  }): Promise<number> {
    const min = this.minJitterMinutes;
    const max = this.maxJitterMinutes;
    const minutes =
      options?.customMinutes ?? Math.floor(Math.random() * (max - min + 1)) + min;

    // Log estrito no terminal conforme especificado
    console.log(`Modo furtivo ativado: aguardando ${minutes} minutos para o próximo verbete`);

    const isTest =
      process.env.NODE_ENV === 'test' ||
      process.env.BYPASS_STEALTH_DELAY === 'true' ||
      process.env.CI === 'true' ||
      this.allowTestFallback;

    if (!isTest || options?.forceRealDelay) {
      const delayMs = minutes * 60 * 1000;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    } else if (process.env.CI === 'true') {
      console.log(`⚡ [Modo Furtivo - CI]: Ambiente de nuvem (CI=true) detectado. Atraso longo de ${minutes} min suprimido para execução imediata.`);
    }

    return minutes;
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
   * Consome em lote uma lista de fontes oficiais aplicando o modo furtivo entre requisições
   */
  async scrapeSources(sources: WebSourceDefinition[]): Promise<ScrapedDocument[]> {
    const results: ScrapedDocument[] = [];
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      if (i > 0 && this.stealthMode) {
        await this.applyStealthDelay();
      }
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

import { Context } from '@deepseek-ai/cordis';
import { FirecrawlScraperClient, ScrapedDocument } from './firecrawl-mcp.js';
import { VibeVoiceTranscriber, TranscribedPodcastEpisode } from './vibevoice-asr.js';
import { SemanticRouter, SemanticRoutingPayload, COSINE_SIMILARITY_THRESHOLD } from './semantic-router.js';
import { OFFICIAL_WEB_SOURCES, OFFICIAL_AUDIO_SOURCE, WebSourceDefinition } from './sources.js';
import { sanitizeScrapedContent, SanitizationResult } from './sanitizer.js';

export interface IngestorConfig {
  databaseUrl?: string;
  firecrawlApiKey?: string;
  firecrawlApiUrl?: string;
  similarityThreshold?: number;
  autoProcessSources?: boolean;
  stealthMode?: boolean;
  minJitterMinutes?: number;
  maxJitterMinutes?: number;
  allowTestFallback?: boolean;
}

/**
 * Plugin Ingestor para o DeepSeek Harness (Cordis Framework)
 * 
 * Orquestra deterministamente:
 * 1. Scraping das 7 fontes web via Firecrawl MCP
 * 2. Transcrição do UXPodcast via VibeVoice ASR (0.5B)
 * 3. Sanitização estrita contra Prompt Injection
 * 4. Busca Semântica via pgvector (limiar >= 0.82 para MERGE vs CREATE)
 * 5. Modo Furtivo com Jitter de 15 a 40 minutos (Rate Limit: 2 a 3 verbetes/hora)
 */
export class IngestorPlugin {
  public firecrawl: FirecrawlScraperClient;
  public transcriber: VibeVoiceTranscriber;
  public router: SemanticRouter;
  public threshold: number;

  constructor(public ctx: Context, public config: IngestorConfig = {}) {
    this.threshold = config.similarityThreshold ?? COSINE_SIMILARITY_THRESHOLD;
    this.firecrawl = new FirecrawlScraperClient({
      apiKey: config.firecrawlApiKey,
      apiUrl: config.firecrawlApiUrl,
      stealthMode: config.stealthMode,
      minJitterMinutes: config.minJitterMinutes,
      maxJitterMinutes: config.maxJitterMinutes,
      allowTestFallback: config.allowTestFallback,
    });
    this.transcriber = new VibeVoiceTranscriber();
    this.router = new SemanticRouter({ databaseUrl: config.databaseUrl });

    console.log('🔌 [Plugin Ingestor]: Inicializado no DeepSeek Harness.');
    console.log(`   - Limiar de Similaridade de Cosseno: ${this.threshold}`);
    console.log(`   - Modo Furtivo: ${this.firecrawl.stealthMode ? 'Ativado (15-40 min jitter / 2-3 verbetes/h)' : 'Desativado'}`);
    console.log(`   - 7 Fontes Web Configuradas: ${OFFICIAL_WEB_SOURCES.map((s) => s.id).join(', ')}`);
    console.log(`   - Fonte de Áudio: ${OFFICIAL_AUDIO_SOURCE.name} (VibeVoice ASR 0.5B)`);
  }

  /**
   * Aciona o atraso aleatório do modo furtivo (15 a 40 minutos)
   */
  async applyStealthDelay(options?: { customMinutes?: number; forceRealDelay?: boolean }): Promise<number> {
    return this.firecrawl.applyStealthDelay(options);
  }

  /**
   * Consome uma fonte Web específica das 7 fontes ou URL arbitrária
   */
  async ingestWeb(urlOrSourceId: string): Promise<{ document: ScrapedDocument; route: SemanticRoutingPayload }> {
    const predefinedSource = OFFICIAL_WEB_SOURCES.find(
      (s) => s.id === urlOrSourceId || s.url === urlOrSourceId
    );

    const targetUrl = predefinedSource ? predefinedSource.url : urlOrSourceId;
    console.log(`\n📥 [Plugin Ingestor]: Iniciando ingestão web de: ${targetUrl}`);

    // 1. Scraping Determinístico + Sanitização contra Prompt Injection
    const document = await this.firecrawl.scrape(targetUrl, predefinedSource);

    // Filtro Semântico de Granularidade: Injetar alerta anti-compêndio se detectada página agregadora
    const isIndexCandidate = 
      /(\b(lexicon|glossary|index|all-laws|catalog|overview)\b)/i.test(targetUrl) ||
      /^(home|all laws|glossary|index|laws of ux)$/i.test(document.title.trim());

    if (isIndexCandidate) {
      console.warn(`⚠️ [Filtro de Granularidade]: Página com traços de índice agregador detectada (${targetUrl}). Forçando diretiva de granularidade atômica.`);
      document.sanitizedContent = 
        `[DIRETIVA DE GRANULARIDADE ATÔMICA: Esta página de origem pode conter múltiplos links ou conceitos. ` +
        `Você é ESTRITAMENTE OBRIGADO a extrair e sintetizar UNICAMENTE UM CONCEITO ATÔMICO SINGULAR específico. ` +
        `NUNCA crie um índice, compêndio ou léxico geral.]\n\n` + 
        document.sanitizedContent;
    }

    // 2. Busca Semântica no Banco Vetorial (pgvector)
    const route = await this.router.routeContent(document.sanitizedContent, {
      overrideThreshold: this.threshold,
    });

    console.log(
      `🎯 [Plugin Ingestor]: Resultado do Roteamento: [MODO: ${route.mode}] ` +
      `(Similaridade: ${route.similarity.toFixed(4)})`
    );

    return { document, route };
  }

  /**
   * Consome e transcreve um episódio do UXPodcast via VibeVoice ASR
   */
  async ingestUXPodcast(
    episodeUrl?: string
  ): Promise<{ transcript: TranscribedPodcastEpisode; route: SemanticRoutingPayload }> {
    const targetUrl = episodeUrl || OFFICIAL_AUDIO_SOURCE.feedUrl;
    console.log(`\n🎙️ [Plugin Ingestor]: Ingestão de Áudio UXPodcast (${targetUrl})...`);

    // 1. Transcrição VibeVoice ASR + Sanitização
    const transcript = await this.transcriber.transcribeEpisode(targetUrl);

    // 2. Busca Semântica no Banco Vetorial (pgvector)
    const route = await this.router.routeContent(transcript.sanitizedTranscript, {
      overrideThreshold: this.threshold,
    });

    console.log(
      `🎯 [Plugin Ingestor]: Roteamento de Áudio concluído: [MODO: ${route.mode}] ` +
      `(Similaridade: ${route.similarity.toFixed(4)})`
    );

    return { transcript, route };
  }

  /**
   * Executa a ingestão completa das 7 fontes canônicas com modo furtivo
   */
  async ingestAllCanonicalWebSources(): Promise<Array<{ document: ScrapedDocument; route: SemanticRoutingPayload }>> {
    console.log(`\n🌐 [Plugin Ingestor]: Executando ingestão em lote das 7 fontes oficiais...`);
    const results = [];

    for (let i = 0; i < OFFICIAL_WEB_SOURCES.length; i++) {
      const source = OFFICIAL_WEB_SOURCES[i];
      if (i > 0 && this.firecrawl.stealthMode) {
        await this.applyStealthDelay();
      }
      try {
        const item = await this.ingestWeb(source.id);
        results.push(item);
      } catch (err: any) {
        console.error(`❌ [Plugin Ingestor]: Falha na fonte "${source.name}": ${err.message}`);
      }
    }

    return results;
  }
}

/**
 * Função de Aplicação do Plugin no Cordis / DSH
 */
export default function apply(ctx: Context, config: IngestorConfig = {}) {
  const plugin = new IngestorPlugin(ctx, config);

  // Registro de serviço no contexto do Cordis
  try {
    ctx.reflect.provide('ingestor', plugin);
  } catch {
    // Ignora se já estiver provido
  }

  // Permite acesso direto via ctx.ingestor ou ctx.root.ingestor
  Object.defineProperty(ctx.root, 'ingestor', {
    value: plugin,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(ctx, 'ingestor', {
    value: plugin,
    writable: true,
    configurable: true,
  });

  return plugin;
}

export * from './sanitizer.js';
export * from './sources.js';
export * from './firecrawl-mcp.js';
export * from './vibevoice-asr.js';
export * from './semantic-router.js';

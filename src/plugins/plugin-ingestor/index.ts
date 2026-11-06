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
}

/**
 * Plugin Ingestor para o DeepSeek Harness (Cordis Framework)
 * 
 * Orquestra deterministamente:
 * 1. Scraping das 7 fontes web via Firecrawl MCP
 * 2. Transcrição do UXPodcast via VibeVoice ASR (0.5B)
 * 3. Sanitização estrita contra Prompt Injection
 * 4. Busca Semântica via pgvector (limiar >= 0.82 para MERGE vs CREATE)
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
    });
    this.transcriber = new VibeVoiceTranscriber();
    this.router = new SemanticRouter({ databaseUrl: config.databaseUrl });

    console.log('🔌 [Plugin Ingestor]: Inicializado no DeepSeek Harness.');
    console.log(`   - Limiar de Similaridade de Cosseno: ${this.threshold}`);
    console.log(`   - 7 Fontes Web Configuradas: ${OFFICIAL_WEB_SOURCES.map((s) => s.id).join(', ')}`);
    console.log(`   - Fonte de Áudio: ${OFFICIAL_AUDIO_SOURCE.name} (VibeVoice ASR 0.5B)`);
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
   * Executa a ingestão completa das 7 fontes canônicas
   */
  async ingestAllCanonicalWebSources(): Promise<Array<{ document: ScrapedDocument; route: SemanticRoutingPayload }>> {
    console.log(`\n🌐 [Plugin Ingestor]: Executando ingestão em lote das 7 fontes oficiais...`);
    const results = [];

    for (const source of OFFICIAL_WEB_SOURCES) {
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

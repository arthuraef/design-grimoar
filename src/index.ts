import { Context } from '@deepseek-ai/cordis';
import dotenv from 'dotenv';
import ingestorPlugin, { IngestorPlugin } from './plugins/plugin-ingestor/index.js';
import synthesizerPlugin, { SynthesizerPlugin } from './plugins/plugin-synthesizer/index.js';
import academicValidatorPlugin, { AcademicValidatorPlugin } from './plugins/plugin-academic-validator/index.js';
import publisherPlugin, { PublisherPlugin } from './plugins/plugin-publisher/index.js';
import hermesNotifierPlugin, { HermesNotifierPlugin } from './plugins/plugin-hermes-notifier/index.js';
import { VerificationLoopController } from './plugins/verification-loop.js';
import { PipelineExecutionResult } from './types/index.js';
import { ExecutionLock } from './utils/lock.js';
import { withExponentialBackoff } from './utils/retry.js';
import { ProcessedUrlsTracker } from './utils/url-tracker.js';

dotenv.config();

/**
 * Orquestrador DeepSeek Harness (Cordis Framework) — Design Grimoar
 * Configurado com clientes HTTP reais para todas as etapas produtivas.
 */
export const ctx = new Context();

export class GrimoarOrchestrator {
  private ingestor: IngestorPlugin;
  private synthesizer: SynthesizerPlugin;
  private validator: AcademicValidatorPlugin;
  private publisher: PublisherPlugin;
  private notifier: HermesNotifierPlugin;
  private loopController: VerificationLoopController;
  private lock: ExecutionLock;

  constructor(protected ctx: Context) {
    this.lock = new ExecutionLock();
    // 1. Ingestor: Firecrawl MCP / REST + VibeVoice ASR + pgvector + Modo Furtivo (Rate Limit 2-3 verbetes/h)
    this.ingestor = new IngestorPlugin(ctx, {
      similarityThreshold: parseFloat(process.env.SIMILARITY_THRESHOLD || '0.82'),
      databaseUrl: process.env.DATABASE_URL,
      firecrawlApiKey: process.env.FIRECRAWL_API_KEY,
      firecrawlApiUrl: process.env.FIRECRAWL_API_URL || 'https://api.firecrawl.dev',
      stealthMode: process.env.STEALTH_MODE !== 'false',
      minJitterMinutes: parseInt(process.env.STEALTH_MIN_MINUTES || '15', 10),
      maxJitterMinutes: parseInt(process.env.STEALTH_MAX_MINUTES || '40', 10),
      allowTestFallback: process.env.NODE_ENV === 'test' || process.env.ALLOW_TEST_FALLBACKS === 'true',
    });

    // 2. Synthesizer (Lexicógrafo - Generator): Leitura dinâmica do .env
    this.synthesizer = new SynthesizerPlugin(ctx, {
      promptPath: process.env.LEXICOGRAPHER_PROMPT_PATH || 'prompts/step2-lexicographer.md',
      apiKey: process.env.LEXICOGRAPHER_API_KEY || process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY,
      baseUrl:
        process.env.LEXICOGRAPHER_BASE_URL ||
        process.env.DEEPSEEK_BASE_URL ||
        (process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com' : 'https://api.openai.com/v1'),
      model:
        process.env.LEXICOGRAPHER_MODEL ||
        process.env.DEEPSEEK_MODEL ||
        (process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4o'),
      temperature: parseFloat(process.env.LEXICOGRAPHER_TEMPERATURE || '0.2'),
    });

    // 3. Academic Validator (Auditor - Verifier): Chamada isolada e independente
    this.validator = new AcademicValidatorPlugin(ctx, {
      promptPath: process.env.ACADEMIC_AUDITOR_PROMPT_PATH || 'prompts/step3-academic-auditor.md',
      apiKey:
        process.env.ACADEMIC_AUDITOR_API_KEY ||
        process.env.OPENAI_API_KEY ||
        process.env.DEEPSEEK_API_KEY,
      baseUrl:
        process.env.ACADEMIC_AUDITOR_BASE_URL ||
        process.env.OPENAI_BASE_URL ||
        (process.env.OPENAI_API_KEY ? 'https://api.openai.com/v1' : 'https://api.deepseek.com'),
      model:
        process.env.ACADEMIC_AUDITOR_MODEL ||
        process.env.OPENAI_MODEL ||
        (process.env.OPENAI_API_KEY ? 'gpt-4o' : 'deepseek-reasoner'),
      temperature: parseFloat(process.env.ACADEMIC_AUDITOR_TEMPERATURE || '0.1'),
    });

    // 4. Publisher (Git, pgvector e Front-end Estático): Operações atômicas no repositório
    this.publisher = new PublisherPlugin(ctx, {
      databaseUrl: process.env.DATABASE_URL,
      staticSiteContentDir: process.env.STATIC_SITE_CONTENT_DIR || 'docs/src/content/docs',
      githubBranch: process.env.GITHUB_BRANCH || 'main',
      githubToken: process.env.GITHUB_TOKEN,
    });

    // 5. Hermes Notifier: API / Webhook do Hermes Agent para push no dispositivo
    this.notifier = new HermesNotifierPlugin(ctx, {
      hermesApiUrl: process.env.HERMES_AGENT_API_URL || 'http://localhost:5055/webhook/step-completed',
      webhookUrl: process.env.NOTIFICATIONS_WEBHOOK_URL,
    });

    // Controlador do Loop de Verificação (Lexicógrafo -> Auditor -> Zod) com limite estrito
    const maxAttempts = parseInt(process.env.VERIFICATION_LOOP_MAX_ATTEMPTS || '3', 10);
    this.loopController = new VerificationLoopController({
      maxAttempts,
      synthesizer: this.synthesizer.service,
      validator: this.validator.service,
    });
  }

  /**
   * Execução do Pipeline Canônico Completo de 5 Etapas:
   * 1. Ingestão Web/Áudio Determinística + Sanitização Prompt Injection
   * 2. Roteamento Semântico (pgvector >= 0.82 MERGE vs CREATE)
   * 3. Loop de Verificação (Lexicógrafo -> Auditor Acadêmico -> Zod Hard Gate com retries)
   * 4. Publicação Atômica (Git commit/push + pgvector update + AppFlowy sync)
   * 5. Confirmação do Hash e Notificação Hermes Agent para dispositivo
   */
  async processContentToVerbete(urlOrSource: string, isAudio: boolean = false): Promise<PipelineExecutionResult & { commitHash?: string }> {
    console.log(`\n======================================================`);
    console.log(`🚀 Iniciando Pipeline Design Grimoar para: ${urlOrSource}`);
    console.log(`======================================================\n`);

    // ETAPA 1: Ingestão Determinística (plugin-ingestor com Firecrawl MCP / VibeVoice ASR + Sanitização)
    let contentToProcess = '';
    let routingMode: 'CREATE' | 'MERGE' = 'CREATE';
    let currentVerbete: string | undefined = undefined;

    if (isAudio) {
      console.log(`[Etapa 1]: Ingestão de áudio via VibeVoice ASR (0.5B)...`);
      const { transcript, route } = await withExponentialBackoff(
        () => this.ingestor.ingestUXPodcast(urlOrSource),
        { maxRetries: 3, initialDelayMs: 3000 },
        `Ingestão Áudio (${urlOrSource})`
      );
      contentToProcess = transcript.sanitizedTranscript;
      routingMode = route.mode;
      currentVerbete = route.currentVerbete;
    } else {
      console.log(`[Etapa 1]: Ingestão web via Firecrawl MCP com Sanitização de Injeção...`);
      const { document, route } = await withExponentialBackoff(
        () => this.ingestor.ingestWeb(urlOrSource),
        { maxRetries: 3, initialDelayMs: 3000 },
        `Ingestão Web (${urlOrSource})`
      );
      contentToProcess = document.sanitizedContent;
      routingMode = route.mode;
      currentVerbete = route.currentVerbete;
    }

    if (!contentToProcess) {
      return {
        success: false,
        stage: 1,
        errors: ['Conteúdo raspado/transcrito está vazio após sanitização.'],
      };
    }

    console.log(`\n[Etapa 1 - Roteador Semântico]: Modo selecionado: [${routingMode}]`);

    // ETAPAS 2, 3 e 4: Loop de Verificação (Lexicógrafo -> Auditor Acadêmico -> Zod Schema)
    // Se o Auditor reprovar ou o Zod apontar erro, reenvia automaticamente (máx. 3 tentativas)
    let loopResult;
    try {
      loopResult = await this.loopController.runLoop({
        mode: routingMode,
        sourceContent: contentToProcess,
        currentVerbete,
      });
    } catch (err: any) {
      return {
        success: false,
        stage: 3,
        errors: [err.message],
      };
    }

    // ETAPA 5: Publicação Atômica (Git Commit/Push + Atualização Vetorial no pgvector + AppFlowy Sync)
    console.log(`\n[Etapa 5]: Executando publicação atômica via plugin-publisher...`);
    const publishResult = await this.publisher.publish(loopResult.frontmatter, loopResult.finalMarkdown);

    if (!publishResult.commitHash) {
      return {
        success: false,
        stage: 5,
        errors: ['Falha crítica: hash de commit não confirmado no Git.'],
      };
    }

    // ETAPA FINAL: Confirmação do Hash e Notificação via Hermes Agent para o dispositivo
    console.log(`\n[Notificação Hermes Agent]: Confirmando hash ${publishResult.commitHash} e notificando dispositivo...`);
    await this.notifier.notify({
      publishResult,
      frontmatter: loopResult.frontmatter,
      attemptsUsed: loopResult.attemptsUsed,
      academicAnchors: loopResult.auditResult.academic_anchor_added,
    });

    return {
      success: true,
      stage: 5,
      verbetePath: publishResult.filePath,
      frontmatter: loopResult.frontmatter,
      commitHash: publishResult.commitHash,
    };
  }

  /**
   * Executa uma fila de fontes ou verbetes em modo furtivo com limite de taxa conservador (2 a 3 verbetes por hora).
   * Aplica atrasos aleatórios com jitter de 15 a 40 minutos entre cada requisição web/ASR.
   */
  async processQueue(
    sources: Array<string | { urlOrSource: string; isAudio?: boolean }>,
    options?: { bypassStealth?: boolean }
  ): Promise<Array<PipelineExecutionResult & { commitHash?: string }>> {
    console.log(`\n======================================================`);
    console.log(`🚦 Iniciando Fila de Execução Furtiva (${sources.length} itens)`);
    console.log(`🛡️ Rate Limit: 2 a 3 verbetes/hora | Jitter: 15 a 40 minutos`);
    console.log(`======================================================\n`);

    const results: Array<PipelineExecutionResult & { commitHash?: string }> = [];

    for (let i = 0; i < sources.length; i++) {
      const item = sources[i];
      const url = typeof item === 'string' ? item : item.urlOrSource;
      const isAudio = typeof item === 'string' ? item === 'uxpodcast' : Boolean(item.isAudio);

      // Aplica o atraso furtivo para o segundo item em diante
      if (i > 0 && !options?.bypassStealth && process.env.STEALTH_MODE !== 'false') {
        await this.ingestor.applyStealthDelay();
      }

      try {
        const res = await this.processContentToVerbete(url, isAudio);
        results.push(res);
      } catch (err: any) {
        console.error(`❌ Erro no processamento do item "${url}":`, err.message);
        results.push({
          success: false,
          stage: 1,
          errors: [err.message],
        });
      }
    }

    return results;
  }

  /**
   * Inicia a varredura autônoma contínua do Design Grimoar com lock determinístico e bootstrap vetorial.
   * Percorre ciclicamente as 7 fontes web canônicas e o UXPodcast com rate limit furtivo (15 a 40 min de jitter).
   */
  async startAutonomousScanner(): Promise<void> {
    if (!this.lock.acquire()) {
      console.warn('⚠️ [Varredura Autônoma]: Instância paralela já ativa. Encerrando chamada concorrente.');
      return;
    }

    const cleanup = () => {
      this.lock.release();
    };
    process.once('SIGINT', () => { cleanup(); process.exit(0); });
    process.once('SIGTERM', () => { cleanup(); process.exit(0); });
    process.once('exit', () => { cleanup(); });

    console.log(`\n======================================================`);
    console.log(`🌌 [Design Grimoar]: Varredura Autônoma Iniciada em Segundo Plano`);
    console.log(`🛡️ Rate Limit: 2 a 3 verbetes/hora | Jitter: 15 a 40 minutos`);
    console.log(`🌐 Fontes Monitoradas: 7 fontes web + UXPodcast ASR`);
    console.log(`======================================================\n`);

    // Cold Start: Bootstrap e backfill de verbetes pré-existentes na taxonomia para o pgvector
    try {
      await this.publisher.bootstrapExistingVerbetes('taxonomia');
    } catch (bootErr: any) {
      console.warn(`[Cold Start]: Aviso durante bootstrap vetorial: ${bootErr.message}`);
    }

    const canonicalQueue = [
      'nngroup',
      'ixdf',
      'lawsofux',
      'apple-hig',
      'material-design',
      'ux-collective',
      'design-systems-repo',
      'uxpodcast',
    ];

    while (true) {
      console.log(`\n[${new Date().toISOString()}] 🔍 Iniciando ciclo de varredura autônoma...`);
      try {
        await this.processQueue(canonicalQueue);
        console.log(`[${new Date().toISOString()}] ✅ Ciclo de varredura concluído com sucesso.`);
      } catch (err: any) {
        console.error(`[${new Date().toISOString()}] ⚠️ Erro no ciclo de varredura:`, err.message);
      }

      const restMinutes = 60;
      console.log(`💤 [Varredura]: Aguardando ${restMinutes} minutos para a próxima rodada de varredura...`);
      await new Promise((resolve) => setTimeout(resolve, restMinutes * 60 * 1000));
    }
  }

  /**
   * Executa uma rodada em lote para o GitHub Actions Autonomous Curator.
   * - Faz o bootstrap dos verbetes existentes da taxonomia no pgvector (Cold Start)
   * - Rastreia e avança de forma inédita pelas 8 fontes canônicas
   * - Aplica atraso randômico inicial (1 a 3 min) para simular navegação humana
   * - Limite estrito de 1 a 2 verbetes por lote para estabilidade e respeito a timeouts
   */
  async runBatchCurator(options?: { maxVerbetes?: number; initialJitter?: boolean }): Promise<void> {
    const maxVerbetes = Math.max(1, options?.maxVerbetes ?? parseInt(process.env.BATCH_SIZE || '1', 10));
    const initialJitter = options?.initialJitter ?? (process.env.INITIAL_JITTER !== 'false');

    if (!this.lock.acquire()) {
      console.warn('⚠️ [Curator Batch]: Instância concorrente já ativa. Encerrando execução.');
      return;
    }

    const cleanup = () => {
      this.lock.release();
    };
    process.once('SIGINT', () => { cleanup(); process.exit(0); });
    process.once('SIGTERM', () => { cleanup(); process.exit(0); });
    process.once('exit', () => { cleanup(); });

    console.log(`\n======================================================`);
    console.log(`🤖 [Autonomous Curator]: Rodada em Lote (Teto: ${maxVerbetes} verbete(s))`);
    console.log(`======================================================\n`);

    // 1. Cold Start: Bootstrap dos verbetes existentes da taxonomia para o pgvector
    try {
      await this.publisher.bootstrapExistingVerbetes('taxonomia');
    } catch (bootErr: any) {
      console.warn(`[Cold Start]: Aviso durante bootstrap vetorial: ${bootErr.message}`);
    }

    // 2. Rastreador de URLs processadas (memória persistente no Git)
    const tracker = new ProcessedUrlsTracker();
    console.log(`[UrlTracker]: ${tracker.getProcessedCount()} URLs previamente processadas no histórico.`);

    // 3. Atraso randômico inicial de 1 a 3 minutos para simular navegação humana (Anti-WAF)
    // No ambiente de nuvem do GitHub Actions (CI=true), desativa atrasos para processamento imediato
    const isCI = process.env.CI === 'true';
    if (initialJitter && !isCI && process.env.NODE_ENV !== 'test' && process.env.BYPASS_STEALTH_DELAY !== 'true') {
      const minSec = 60;
      const maxSec = 180;
      const delaySec = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
      console.log(`⏳ [Curator Batch]: Aguardando jitter inicial de ${delaySec}s (${(delaySec / 60).toFixed(1)} min)...`);
      await new Promise((resolve) => setTimeout(resolve, delaySec * 1000));
    } else if (isCI) {
      console.log('⚡ [Curator Batch - CI]: Ambiente de nuvem (CI=true) detectado. Jitter inicial desativado para processamento imediato.');
    }

    // 4. Selecionar próximos candidatos inéditos
    const candidates = tracker.getNextUnprocessedBatch(maxVerbetes);
    if (candidates.length === 0) {
      console.log('🎉 [Curator Batch]: Todas as URLs da fila canônica já foram processadas!');
      cleanup();
      return;
    }

    console.log(`📋 [Curator Batch]: Selecionados ${candidates.length} candidato(s) inédito(s):`);
    candidates.forEach((c, idx) => console.log(`   ${idx + 1}. [${c.sourceId}] ${c.conceptName} (${c.url})`));

    // 5. Processamento dos candidatos no pipeline de 5 etapas
    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      if (i > 0 && process.env.STEALTH_MODE !== 'false') {
        await this.ingestor.applyStealthDelay();
      }

      console.log(`\n▶️ Processando candidato ${i + 1}/${candidates.length}: "${candidate.conceptName}"...`);
      try {
        const result = await this.processContentToVerbete(candidate.url, Boolean(candidate.isAudio));
        if (result.success) {
          tracker.markAsProcessed(
            candidate.url,
            result.frontmatter?.slug,
            result.frontmatter?.title,
            candidate.sourceId
          );
          console.log(`✅ [Curator Batch]: Verbete "${candidate.conceptName}" processado e publicado com sucesso!`);
        } else {
          const errDetail = result.errors?.join('; ') || 'Erro não especificado';
          console.error(`❌ [Curator Batch]: Falha ao processar "${candidate.conceptName}":`, result.errors);
          tracker.dlq.recordFailure(candidate.url, candidate.sourceId, errDetail);
        }
      } catch (err: any) {
        console.error(`❌ [Curator Batch]: Erro fatal ao processar "${candidate.conceptName}":`, err.message);
        tracker.dlq.recordFailure(candidate.url, candidate.sourceId, err.message);
      }
    }

    cleanup();
    console.log('\n🏁 [Autonomous Curator]: Rodada em lote finalizada com sucesso.');
  }
}

// Registro de todos os plugins no Cordis
ctx.plugin(ingestorPlugin);
ctx.plugin(synthesizerPlugin);
ctx.plugin(academicValidatorPlugin);
ctx.plugin(publisherPlugin);
ctx.plugin(hermesNotifierPlugin);

ctx.plugin((ctx) => {
  const orchestrator = new GrimoarOrchestrator(ctx);
  console.log('⚡ [DeepSeek Harness / Cordis]: Orquestrador Design Grimoar 100% operacional.');

  const isBatchFlag = process.argv.includes('--batch') || process.env.CURATOR_BATCH === 'true';
  const target = process.argv[2];
  const isAudioFlag = process.argv.includes('--audio');
  const isQueueFlag = process.argv.includes('--queue');

  if (isBatchFlag) {
    orchestrator.runBatchCurator().catch((err) => {
      console.error('❌ Erro no curator batch:', err);
      process.exit(1);
    });
  } else if (target) {
    if (isQueueFlag || target.includes(',')) {
      const targets = target.split(',').map((s) => s.trim()).filter(Boolean);
      orchestrator
        .processQueue(targets)
        .then((results) => {
          const successes = results.filter((r) => r.success).length;
          console.log(`\n🏁 Fila finalizada: ${successes}/${results.length} verbetes processados com sucesso.`);
        })
        .catch((err) => {
          console.error('\n❌ Erro fatal na fila:', err);
          process.exit(1);
        });
    } else if (target.startsWith('http://') || target.startsWith('https://') || target === 'nngroup' || target === 'uxpodcast') {
      orchestrator
        .processContentToVerbete(target, isAudioFlag || target === 'uxpodcast')
        .then((res) => {
          if (res.success) {
            console.log(`\n🎉 Pipeline concluído com sucesso! Commit: ${res.commitHash} | Arquivo: ${res.verbetePath}`);
          } else {
            console.error(`\n❌ Falha no pipeline na etapa ${res.stage}:`, res.errors);
            process.exit(1);
          }
        })
        .catch((err) => {
          console.error('\n❌ Erro fatal no pipeline:', err);
          process.exit(1);
        });
    }
  } else if (process.env.NODE_ENV !== 'test') {
    // Inicialização da Varredura Autônoma em background quando executado sem alvos manuais
    orchestrator.startAutonomousScanner().catch((err) => {
      console.error('❌ Erro fatal no daemon autônomo:', err);
    });
  }
});

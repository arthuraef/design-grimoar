import { Context } from '@deepseek-ai/cordis';
import dotenv from 'dotenv';
import ingestorPlugin, { IngestorPlugin } from './plugins/plugin-ingestor/index.js';
import synthesizerPlugin, { SynthesizerPlugin } from './plugins/plugin-synthesizer/index.js';
import academicValidatorPlugin, { AcademicValidatorPlugin } from './plugins/plugin-academic-validator/index.js';
import { VerificationLoopController } from './plugins/verification-loop.js';
import { validateAndIndexVerbete } from './stages/stage4-validator.js';
import { saveCanonicalVerbete } from './stages/stage5-git.js';
import { PipelineExecutionResult } from './types/index.js';

dotenv.config();

/**
 * Orquestrador DeepSeek Harness (Cordis Framework) — Design Grimoar
 */
export const ctx = new Context();

export class GrimoarOrchestrator {
  private ingestor: IngestorPlugin;
  private synthesizer: SynthesizerPlugin;
  private validator: AcademicValidatorPlugin;
  private loopController: VerificationLoopController;

  constructor(protected ctx: Context) {
    this.ingestor = new IngestorPlugin(ctx, {
      similarityThreshold: 0.82,
      databaseUrl: process.env.DATABASE_URL,
      firecrawlApiKey: process.env.FIRECRAWL_API_KEY,
      firecrawlApiUrl: process.env.FIRECRAWL_API_URL,
    });

    this.synthesizer = new SynthesizerPlugin(ctx, {
      promptPath: 'prompts/step2-lexicographer.md',
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseUrl: 'https://api.deepseek.com',
      model: 'deepseek-chat',
    });

    this.validator = new AcademicValidatorPlugin(ctx, {
      promptPath: 'prompts/step3-academic-auditor.md',
      apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
      baseUrl: process.env.OPENAI_API_KEY ? 'https://api.openai.com/v1' : 'https://api.deepseek.com',
      model: process.env.OPENAI_API_KEY ? 'gpt-4o' : 'deepseek-reasoner',
    });

    // Controlador do Loop de Verificação (Lexicógrafo -> Auditor -> Zod) com limite de 3 tentativas
    this.loopController = new VerificationLoopController({
      maxAttempts: 3,
      synthesizer: this.synthesizer.service,
      validator: this.validator.service,
    });
  }

  /**
   * Execução do Pipeline Canônico com Roteamento Semântico e Loop de Verificação
   */
  async processContentToVerbete(urlOrSource: string, isAudio: boolean = false): Promise<PipelineExecutionResult> {
    console.log(`\n======================================================`);
    console.log(`🚀 Iniciando Pipeline Design Grimoar para: ${urlOrSource}`);
    console.log(`======================================================\n`);

    // ETAPA 1: Ingestão Determinística (plugin-ingestor com Firecrawl MCP / VibeVoice ASR + Sanitização)
    let contentToProcess = '';
    let routingMode: 'CREATE' | 'MERGE' = 'CREATE';
    let currentVerbete: string | undefined = undefined;

    if (isAudio) {
      console.log(`[Etapa 1]: Ingestão de áudio via VibeVoice ASR (0.5B)...`);
      const { transcript, route } = await this.ingestor.ingestUXPodcast(urlOrSource);
      contentToProcess = transcript.sanitizedTranscript;
      routingMode = route.mode;
      currentVerbete = route.currentVerbete;
    } else {
      console.log(`[Etapa 1]: Ingestão web via Firecrawl MCP com Sanitização de Injeção...`);
      const { document, route } = await this.ingestor.ingestWeb(urlOrSource);
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

    // Persistência no Banco Vetorial (pgvector)
    console.log(`\n[Persistência Vetorial]: Indexando verbete canônico no pgvector...`);
    await validateAndIndexVerbete(loopResult.finalMarkdown);

    // ETAPA 5: Armazenamento Canônico (SSOT) na Taxonomia
    console.log(`\n[Etapa 5]: Persistência do verbete canônico na taxonomia...`);
    const { filePath } = await saveCanonicalVerbete(loopResult.frontmatter, loopResult.finalMarkdown);

    return {
      success: true,
      stage: 5,
      verbetePath: filePath,
      frontmatter: loopResult.frontmatter,
    };
  }
}

// Registro dos plugins no Cordis
ctx.plugin(ingestorPlugin, {
  similarityThreshold: 0.82,
});
ctx.plugin(synthesizerPlugin, {
  promptPath: 'prompts/step2-lexicographer.md',
});
ctx.plugin(academicValidatorPlugin, {
  promptPath: 'prompts/step3-academic-auditor.md',
});

ctx.plugin((ctx) => {
  const orchestrator = new GrimoarOrchestrator(ctx);
  console.log('⚡ [DeepSeek Harness / Cordis]: Orquestrador Design Grimoar pronto para execução.');

  // CLI rápida para testes se fornecido argumento via linha de comando
  const target = process.argv[2];
  const isAudioFlag = process.argv.includes('--audio');
  if (target && (target.startsWith('http://') || target.startsWith('https://') || target === 'nngroup' || target === 'uxpodcast')) {
    orchestrator
      .processContentToVerbete(target, isAudioFlag || target === 'uxpodcast')
      .then((res) => {
        if (res.success) {
          console.log(`\n🎉 Pipeline concluído com sucesso! Arquivo gerado em: ${res.verbetePath}`);
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
});

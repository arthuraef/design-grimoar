import { Context } from '@deepseek-ai/cordis';
import { SynthesizerService, SynthesizerInput, CorrectionFeedback } from './plugins/plugin-synthesizer/synthesizer.js';
import { AcademicValidatorService, AcademicAuditResult } from './plugins/plugin-academic-validator/validator.js';
import { VerificationLoopController } from './plugins/verification-loop.js';
import synthesizerPlugin from './plugins/plugin-synthesizer/index.js';
import academicValidatorPlugin from './plugins/plugin-academic-validator/index.js';

async function runVerificationLoopTests() {
  console.log('========================================================================');
  console.log('🧪 TESTES: PLUGIN-SYNTHESIZER, PLUGIN-ACADEMIC-VALIDATOR & LOOP (3x)');
  console.log('========================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  // --------------------------------------------------------------------------
  // TESTE 1: Instanciação dos Serviços com Prompts Oficiais
  // --------------------------------------------------------------------------
  console.log('--- TESTE 1: Carregamento de Prompts Oficiais ---');

  const synthesizer = new SynthesizerService({
    promptPath: 'prompts/step2-lexicographer.md',
  });
  assert(synthesizer !== undefined, 'SynthesizerService deve instanciar com /prompts/step2-lexicographer.md');

  const validator = new AcademicValidatorService({
    promptPath: 'prompts/step3-academic-auditor.md',
  });
  assert(validator !== undefined, 'AcademicValidatorService deve instanciar com /prompts/step3-academic-auditor.md');

  // --------------------------------------------------------------------------
  // TESTE 2: Execução Direta do Loop em Cenário Nominal (Sucesso na 1ª tentativa)
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 2: Loop de Verificação — Cenário Nominal ---');

  const controller = new VerificationLoopController({
    maxAttempts: 3,
    synthesizer,
    validator,
  });

  const nominalResult = await controller.runLoop({
    mode: 'CREATE',
    sourceContent: 'Affordance e Signifiers em Design de Interação segundo Don Norman.',
  });

  assert(nominalResult.success === true, 'Loop deve concluir com sucesso');
  assert(nominalResult.attemptsUsed === 1, 'Cenário nominal deve passar na 1ª tentativa');
  assert(nominalResult.frontmatter.status === 'audited', 'Frontmatter deve ser marcado como audited');
  assert(nominalResult.frontmatter.audit.status === 'APPROVED', 'Audit status deve ser APPROVED');

  // --------------------------------------------------------------------------
  // TESTE 3: Auditor Reprova na 1ª tentativa -> Correção Automática na 2ª tentativa
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 3: Auto-Recuperação de Reprovação do Auditor Acadêmico ---');

  let synthCalls = 0;
  // Mock do Lexicógrafo que produz rascunho sem âncoras na tentativa 1, e correto na tentativa 2
  class MockRecoveringSynthesizer extends SynthesizerService {
    override async synthesize(input: SynthesizerInput, feedback?: CorrectionFeedback): Promise<string> {
      synthCalls++;
      if (synthCalls === 1) {
        console.log('[MockSynth]: Gerando rascunho propositalmente sem fundamentação científica...');
        return `---
title: "Opinião Superficial"
slug: "opiniao-superficial"
id: "opiniao-01"
domain: "02-ux-interaction-design"
subdomain: "05-heuristicas-e-usabilidade"
status: "draft"
version: "1.0.0"
created_at: "${new Date().toISOString()}"
updated_at: "${new Date().toISOString()}"
summary: "Um texto opinativo sem autores ou literatura acadêmica de design."
tags: ["opiniao"]
aliases: []
academic_anchors: []
audit:
  status: "PENDING"
  auditor: "lexicographer-agent"
  academic_anchor_added: []
sources: []
cross_references: []
---

# 1. Definição Canônica
Eu acho que o design deve ser bonito e moderno.

# 2. Fundamentação Teórica e Cognitiva
Minha experiência própria me diz isso.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- Heurística: Use degradê.

# 4. Métricas e Impacto em Produto
- Mais cliques.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- Nenhuma fonte.
`;
      }

      console.log('[MockSynth]: Recebido feedback do Auditor! Corrigindo com literatura científica (Norman/Nielsen)...');
      assert(feedback !== undefined, 'Lexicógrafo deve receber objeto feedback na 2ª tentativa');
      assert(feedback?.auditorCritique !== undefined, 'Feedback deve conter crítica do auditor');

      return nominalResult.finalMarkdown;
    }
  }

  const recoveringController = new VerificationLoopController({
    maxAttempts: 3,
    synthesizer: new MockRecoveringSynthesizer(),
    validator,
  });

  const recoveryResult = await recoveringController.runLoop({
    mode: 'CREATE',
    sourceContent: 'Texto corrigido com ancoragem científica.',
  });

  assert(recoveryResult.success === true, 'Loop deve ter sucesso após correção');
  assert(recoveryResult.attemptsUsed === 2, 'Deve ter necessitado de exatamente 2 tentativas');
  assert(recoveryResult.history.length === 2, 'Histórico deve registrar as 2 tentativas');
  assert(recoveryResult.history[0].passed === false, 'Primeira tentativa deve estar registrada como falha');
  assert(recoveryResult.history[1].passed === true, 'Segunda tentativa deve estar registrada como sucesso');

  // --------------------------------------------------------------------------
  // TESTE 4: Erro de Formatação Zod na 1ª tentativa -> Correção na 2ª tentativa
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 4: Auto-Recuperação de Erro de Formatação do Zod ---');

  let zodSynthCalls = 0;
  class MockZodFixingSynthesizer extends SynthesizerService {
    override async synthesize(input: SynthesizerInput, feedback?: CorrectionFeedback): Promise<string> {
      zodSynthCalls++;
      if (zodSynthCalls === 1) {
        console.log('[MockSynth]: Gerando rascunho com seção 4 faltando (erro de formatação proposital)...');
        // Texto aprovado pelo auditor (tem Norman/Nielsen), mas que falta a seção 4 exigida pelo schema.ts
        return `---
title: "Affordance Mal Formatada"
slug: "affordance-mal-formatada"
id: "affordance-bad-01"
domain: "02-ux-interaction-design"
subdomain: "02-affordances-e-signifiers"
status: "draft"
version: "1.0.0"
created_at: "${new Date().toISOString()}"
updated_at: "${new Date().toISOString()}"
summary: "Resumo explicativo sobre affordances no design de produto."
tags: ["ux", "affordance"]
aliases: []
academic_anchors: ["Don Norman (1988)"]
audit:
  status: "PENDING"
  auditor: "lexicographer-agent"
  academic_anchor_added: []
sources: []
cross_references: []
---

# 1. Definição Canônica
Affordance segundo Don Norman e James Gibson.

# 2. Fundamentação Teórica e Cognitiva
Norman e Gibson estabelecem as propriedades perceptíveis.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- Heurística: Elemento interativo deve ter pistas visuais claras.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Signifier]]
`;
      }

      console.log('[MockSynth]: Feedback do Zod recebido! Inserindo seção obrigatória faltante...');
      assert(feedback?.zodErrors !== undefined, 'Feedback deve conter erros de validação do Zod');
      assert(
        (feedback?.zodErrors?.some((e) => e.includes('# 4. Métricas e Impacto em Produto'))) ?? false,
        'Erro do Zod deve alertar sobre seção 4 ausente'
      );

      return nominalResult.finalMarkdown;
    }
  }

  const zodFixingController = new VerificationLoopController({
    maxAttempts: 3,
    synthesizer: new MockZodFixingSynthesizer(),
    validator,
  });

  const zodFixResult = await zodFixingController.runLoop({
    mode: 'CREATE',
    sourceContent: 'Conteúdo para correção de formatação.',
  });

  assert(zodFixResult.success === true, 'Loop deve ter sucesso após correção de formatação do Zod');
  assert(zodFixResult.attemptsUsed === 2, 'Deve ter necessitado de 2 tentativas');

  // --------------------------------------------------------------------------
  // TESTE 5: Limite Estrito de 3 Tentativas
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 5: Limite Estrito de 3 Tentativas ---');

  class UnfixableSynthesizer extends SynthesizerService {
    override async synthesize(): Promise<string> {
      return 'Texto completamente fora de escopo sem frontmatter e sem literatura.';
    }
  }

  const failingController = new VerificationLoopController({
    maxAttempts: 3,
    synthesizer: new UnfixableSynthesizer(),
    validator,
  });

  let loopFailedAsExpected = false;
  try {
    await failingController.runLoop({
      mode: 'CREATE',
      sourceContent: 'Texto incorrigível.',
    });
  } catch (err: any) {
    loopFailedAsExpected = true;
    assert(err.message.includes('após 3 tentativas'), 'Mensagem de erro deve explicitar que 3 tentativas se esgotaram');
  }

  assert(loopFailedAsExpected === true, 'O loop deve lançar erro e parar estritamente após 3 tentativas');

  // --------------------------------------------------------------------------
  // TESTE 6: Registro dos Plugins no Cordis Framework
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 6: Registro dos Plugins no Cordis Framework ---');

  const ctx = new Context();
  const synthFiber = await ctx.plugin(synthesizerPlugin);
  const valFiber = await ctx.plugin(academicValidatorPlugin);

  assert(synthFiber !== undefined, 'Plugin Synthesizer deve registrar Fiber no Cordis');
  assert(valFiber !== undefined, 'Plugin Academic Validator deve registrar Fiber no Cordis');
  assert((ctx as any).synthesizer !== undefined, 'ctx.synthesizer deve estar disponível');
  assert((ctx as any).academicValidator !== undefined, 'ctx.academicValidator deve estar disponível');

  console.log('\n========================================================================');
  console.log(`📊 RESULTADO FINAL: ${passed} passaram, ${failed} falharam.`);
  console.log('========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runVerificationLoopTests().catch((err) => {
  console.error('Erro na execução dos testes:', err);
  process.exit(1);
});

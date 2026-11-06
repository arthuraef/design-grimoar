import dotenv from 'dotenv';
dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

import fs from 'node:fs';
import path from 'node:path';
import { SemanticIntegrityGate } from './plugins/semantic-integrity-gate.js';
import { SemanticRouter } from './plugins/plugin-ingestor/semantic-router.js';
import { AcademicValidatorService } from './plugins/plugin-academic-validator/validator.js';
import { PublisherService } from './plugins/plugin-publisher/publisher.js';
import { VerbeteFrontmatter, validateVerbete } from './schema.js';

async function runConceptualIntegrityRegressionTests() {
  console.log('========================================================================');
  console.log('🧪 SUITE DE REGRESSÃO: INTEGRIDADE CONCEITUAL & ISOLAMENTO ANTI-CONTAMINAÇÃO');
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

  const integrityGate = new SemanticIntegrityGate();
  const router = new SemanticRouter();
  const academicValidator = new AcademicValidatorService();
  const publisher = new PublisherService();

  // --------------------------------------------------------------------------
  // TESTE 1: ROTEAMENTO SEMÂNTICO — CONCEITOS PRÓXIMOS PORÉM DISTINTOS
  // --------------------------------------------------------------------------
  console.log('--- TESTE 1: Roteamento Semântico e Decisão MERGE vs CREATE ---');

  // 1.1 Controle Negativo: Signifier vs Affordance
  console.log('\n[1.1] Roteando "Signifier" contra base existente contendo "Affordance"...');
  const signifierContent = `
    Signifiers em Design de Interação.
    Don Norman (2008) publicou "Signifiers, Not Affordances" esclarecendo que designers frequentemente
    dizem affordance quando na verdade querem dizer signifiers. Signifiers são indicadores perceptíveis
    que comunicam onde a ação deve acontecer, enquanto affordances são as possibilidades reais de ação.
  `;
  const signifierDecision = await router.routeContent(signifierContent);
  assert(signifierDecision.mode === 'CREATE', 'Signifier deve ser roteado em modo CREATE (não pode fundir com Affordance)');
  assert(signifierDecision.typed_relations !== undefined && signifierDecision.typed_relations.length > 0, 'Signifier deve conter relações tipadas com conceitos correlatos');
  assert(
    signifierDecision.typed_relations?.some(r => r.target_concept === 'affordance' && r.relation_type === 'distinguished_from') ?? false,
    'Signifier deve estabelecer relação tipada "distinguished_from" com "affordance"'
  );

  // 1.2 Controle Negativo: Cognitive Load vs Affordance
  console.log('\n[1.2] Roteando "Cognitive Load" contra base existente contendo "Affordance"...');
  const cogLoadContent = `
    Cognitive Load Theory por John Sweller (1988).
    A capacidade da memória de trabalho humana é limitada. Carga cognitiva intrínseca, estrínseca e germane.
    Embora interfaces com boas affordances reduzam a carga mental, a teoria da carga cognitiva é um
    conceito ontologicamente independente de psicologia cognitiva.
  `;
  const affordanceCandidate = {
    id: 'affordance-02-01',
    slug: 'affordance',
    title: 'Affordance',
    domain: '02-ux-interaction-design',
    subdomain: '02-affordances-e-signifiers',
    similarity: 0.88,
  };
  const cogEquiv = router.assessConceptualEquivalence(cogLoadContent, affordanceCandidate);
  assert(cogEquiv.isEquivalent === false, 'Hard Gate DEVE rejeitar fusão de Cognitive Load em Affordance');
  assert(cogEquiv.relationTypeIfDistinct === 'influences', 'Cognitive Load vs Affordance deve tipar relação como "influences"');

  const cogLoadDecision = await router.routeContent(cogLoadContent);
  assert(cogLoadDecision.mode === 'CREATE', 'Cognitive Load com conteúdo misto deve ser roteado em modo CREATE');

  // 1.3 Controle Positivo: Aprofundamento de Affordance -> MERGE Legítimo
  console.log('\n[1.3] Roteando conteúdo sobre "Perceived Affordances" de Don Norman...');
  const affordanceDeepening = `
    Affordance e Perceived Affordances segundo Donald Norman e James J. Gibson.
    A affordance física e digital descreve o potencial de ação relacional entre o artefato e o ator.
    Este texto aprofunda a ontologia das affordances percebidas em interfaces móveis e desktop.
  `;
  const affordanceDecision = await router.routeContent(affordanceDeepening);
  assert(affordanceDecision.mode === 'MERGE', 'Conteúdo sobre aprofundamento de Affordance deve autorizar MERGE');
  assert(affordanceDecision.matchedVerbete?.slug === 'affordance', 'MERGE deve apontar exatamente para o verbete canônico de affordance');

  // 1.4 Usability Geral vs Affordance/Cognitive Load
  console.log('\n[1.4] Roteando "Usability" (ISO 9241-11)...');
  const usabilityContent = `
    Usabilidade e Heurísticas de Usabilidade Geral (ISO 9241-11).
    A eficácia, eficiência e satisfação com que usuários alcançam objetivos específicos em ambientes definidos.
    Envolve as 10 heurísticas de Nielsen e medições empíricas com usuários.
  `;
  const usabilityDecision = await router.routeContent(usabilityContent);
  assert(usabilityDecision.mode === 'CREATE', 'Usabilidade Geral deve ser mantida como entidade independente (CREATE)');

  // --------------------------------------------------------------------------
  // TESTE 2: SEMANTIC INTEGRITY GATE — DETECÇÃO DE CONTAMINAÇÃO E DIVERGÊNCIA
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 2: Semantic Integrity Gate (Controles Negativos & Positivos) ---');

  // 2.1 Controle Negativo: Título "Usabilidade Cognitiva" com definição de "Affordance" (O caso real observado!)
  console.log('\n[2.1] Avaliando chimera contaminada: Título "Usabilidade Cognitiva" + Definição de "Affordance"...');
  const contaminatedChimeraFrontmatter: VerbeteFrontmatter = {
    title: 'Usabilidade Cognitiva',
    slug: 'usabilidade-cognitiva',
    id: 'usabilidade-cognitiva-02-01',
    domain: '02-ux-interaction-design',
    subdomain: '02-affordances-e-signifiers',
    status: 'in_review',
    version: '1.0.0',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    summary: 'Conceito fundamental sobre potenciais de ação.',
    tags: ['usabilidade', 'affordance'],
    aliases: ['Potencial de Ação'],
    academic_anchors: [
      'Don Norman (1988) - The Design of Everyday Things',
      'James J. Gibson (1979) - The Ecological Approach to Visual Perception',
      'Sweller (1988) - Cognitive Load Theory',
    ],
    distinction_criteria: [],
    typed_relations: [],
    audit: { status: 'PENDING', auditor: 'lexicographer-agent', academic_anchor_added: [] },
    sources: [],
    cross_references: [],
  };

  const contaminatedChimeraMarkdown = `---
title: "Usabilidade Cognitiva"
---

# 1. Definição Canônica
Affordance descreve a relação física e digital entre as características de um artefato e as capacidades do usuário.

# 2. Fundamentação Teórica e Cognitiva
Ancorado em James J. Gibson (1979), Don Norman (1988) e Sweller (1988).

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- Heurística: Fornecer pistas de ação claras.

# 4. Métricas e Impacto em Produto
- Redução de Misclick Rate.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Signifier]]
`;

  const chimeraEval = integrityGate.evaluate(contaminatedChimeraFrontmatter, contaminatedChimeraMarkdown);
  assert(chimeraEval.passed === false, 'Gate DEVE rejeitar verbete com divergência entre título e definição');
  assert(chimeraEval.checks.titleDefinitionMatch === false, 'titleDefinitionMatch deve ser avaliado como false');
  assert(chimeraEval.checks.academicAnchorEpistemicMatch === false, 'academicAnchorEpistemicMatch deve detectar âncora indevida (Sweller em Affordance)');
  assert(chimeraEval.criticalInconsistencies.length >= 2, 'Gate deve reportar múltiplas inconsistências críticas fundamentadas');

  // 2.2 Controle Negativo: Âncora Epistêmica Inválida (Sweller em Affordance)
  console.log('\n[2.2] Avaliando "Affordance" com âncora acadêmica indevida (Sweller)...');
  const affordanceWithSwellerFrontmatter: VerbeteFrontmatter = {
    title: 'Affordance',
    slug: 'affordance',
    id: 'affordance-02-01',
    domain: '02-ux-interaction-design',
    subdomain: '02-affordances-e-signifiers',
    status: 'in_review',
    version: '1.0.0',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    summary: 'Potenciais de ação de um artefato.',
    tags: ['affordance'],
    aliases: [],
    academic_anchors: ['John Sweller (1988) - Cognitive Load Theory'],
    distinction_criteria: [],
    typed_relations: [],
    audit: { status: 'PENDING', auditor: 'lexicographer-agent', academic_anchor_added: [] },
    sources: [],
    cross_references: [],
  };

  const affordanceWithSwellerMarkdown = `---
title: "Affordance"
---

# 1. Definição Canônica
Affordance descreve o potencial de ação relacional entre um objeto e um agente humano.

# 2. Fundamentação Teórica e Cognitiva
Teoria da Carga Cognitiva de Sweller.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- Heurística: Indicar affordances claras.

# 4. Métricas e Impacto em Produto
- Métricas de usabilidade.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Signifier]]
`;

  const swellerEval = integrityGate.evaluate(affordanceWithSwellerFrontmatter, affordanceWithSwellerMarkdown);
  assert(swellerEval.passed === false, 'Gate DEVE rejeitar Affordance ancorado primariamente em Sweller');
  assert(swellerEval.checks.academicAnchorEpistemicMatch === false, 'academicAnchorEpistemicMatch deve ser false para Sweller em Affordance');

  // 2.3 Controle Negativo: Âncora Epistêmica Inválida (Gibson em Cognitive Load)
  console.log('\n[2.3] Avaliando "Cognitive Load" com âncora indevida (Gibson)...');
  const cogLoadWithGibsonFrontmatter: VerbeteFrontmatter = {
    title: 'Cognitive Load',
    slug: 'cognitive-load',
    id: 'cognitive-load-01-02',
    domain: '01-psicologia-cognitiva',
    subdomain: '02-carga-cognitiva-e-memoria',
    status: 'in_review',
    version: '1.0.0',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    summary: 'Esforço mental imposto à memória de trabalho.',
    tags: ['cognicao'],
    aliases: [],
    academic_anchors: ['James J. Gibson (1979) - Ecological Psychology'],
    distinction_criteria: [],
    typed_relations: [],
    audit: { status: 'PENDING', auditor: 'lexicographer-agent', academic_anchor_added: [] },
    sources: [],
    cross_references: [],
  };

  const cogLoadWithGibsonMarkdown = `---
title: "Cognitive Load"
---

# 1. Definição Canônica
Cognitive Load descreve o volume de esforço mental imposto à memória de trabalho humana.

# 2. Fundamentação Teórica e Cognitiva
Estudos de percepção ecológica de James J. Gibson.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- Heurística: Reduzir esforço mental.

# 4. Métricas e Impacto em Produto
- Redução de Time on Task.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Affordance]]
`;

  const gibsonEval = integrityGate.evaluate(cogLoadWithGibsonFrontmatter, cogLoadWithGibsonMarkdown);
  assert(gibsonEval.passed === false, 'Gate DEVE rejeitar Cognitive Load ancorado em James J. Gibson');
  assert(gibsonEval.checks.academicAnchorEpistemicMatch === false, 'academicAnchorEpistemicMatch deve ser false para Gibson em Cognitive Load');

  // 2.4 Controle Positivo: Verbete Canônico Íntegro e Aprovado
  console.log('\n[2.4] Avaliando verbete canônico íntegro de "Affordance" (Gibson + Norman)...');
  const affordanceCanonicalFile = fs.readFileSync('taxonomia/02-ux-interaction-design/02-affordances-e-signifiers/affordance.md', 'utf-8');
  const parsedAffordance = validateVerbete(affordanceCanonicalFile);
  assert(parsedAffordance.isValid === true, 'affordance.md deve passar na validação estrita do schema Zod');

  const affordanceCanonicalEval = integrityGate.evaluate(parsedAffordance.frontmatter!, affordanceCanonicalFile);
  assert(affordanceCanonicalEval.passed === true, 'affordance.md canônico DEVE ser aprovado pelo Semantic Integrity Gate');
  assert(affordanceCanonicalEval.score === 100, 'Score de integridade semântica de affordance.md deve ser 100/100');
  assert(affordanceCanonicalEval.criticalInconsistencies.length === 0, 'affordance.md não deve conter nenhuma inconsistência crítica');

  // --------------------------------------------------------------------------
  // TESTE 3: AUDITOR ACADÊMICO DETERMINÍSTICO — RASTREABILIDADE EPISTÊMICA
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 3: Auditor Acadêmico Epistêmico (Anti-Name-Dropping) ---');

  const deterministicAuditFail = academicValidator.deterministicAudit(contaminatedChimeraMarkdown);
  assert(deterministicAuditFail.status === 'REJECTED', 'deterministicAudit deve rejeitar chimera conceitual');
  assert(deterministicAuditFail.claims_audited !== undefined, 'Auditoria deve registrar claims_audited estruturadas');
  assert(
    deterministicAuditFail.claims_audited?.some(c => c.verified === false) ?? false,
    'claims_audited deve conter veredito verified=false para afirmação contaminada'
  );

  const deterministicAuditPass = academicValidator.deterministicAudit(affordanceCanonicalFile);
  assert(deterministicAuditPass.status === 'APPROVED', 'deterministicAudit deve aprovar verbete canônico com âncoras válidas');
  assert(deterministicAuditPass.academic_anchor_added.length > 0, 'Auditor deve registrar âncoras acadêmicas aprovadas');

  // --------------------------------------------------------------------------
  // TESTE 4: PUBLISHER GATE — ISOLAMENTO EM STAGING & EXCLUSÃO PÚBLICA
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 4: Publisher Gate e Isolamento Staging (Objetivo 6) ---');

  // 4.1 Rascunho in_review não pode ser publicado na taxonomia canônica nem no Astro
  const draftFrontmatter: VerbeteFrontmatter = {
    title: 'Rascunho Não Aprovado',
    slug: 'rascunho-nao-aprovado',
    id: 'rascunho-01',
    domain: '02-ux-interaction-design',
    subdomain: '02-affordances-e-signifiers',
    status: 'in_review',
    version: '1.0.0',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    summary: 'Rascunho de teste em processo de revisão.',
    tags: ['draft'],
    aliases: [],
    academic_anchors: [],
    distinction_criteria: [],
    typed_relations: [],
    audit: { status: 'PENDING', auditor: 'lexicographer-agent', academic_anchor_added: [] },
    sources: [],
    cross_references: [],
  };

  const draftMarkdown = `---
title: "Rascunho Não Aprovado"
slug: "rascunho-nao-aprovado"
status: "in_review"
audit:
  status: "PENDING"
---

# 1. Definição Canônica
Texto de teste não aprovado.
# 2. Fundamentação Teórica e Cognitiva
Texto.
# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- Heurística.
# 4. Métricas e Impacto em Produto
- Métricas.
# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Ref]]
`;

  const publishDraftResult = await publisher.publish(draftFrontmatter, draftMarkdown);
  assert(publishDraftResult.success === true, 'Publicação de rascunho deve ser interceptada com segurança');
  assert(publishDraftResult.staticSiteSynced === false, 'Rascunho in_review NÃO pode ser sincronizado com o site estático público');
  assert(publishDraftResult.filePath.includes('taxonomia/_staging/rascunho-nao-aprovado.md'), 'Rascunho deve ser preservado exclusivamente em taxonomia/_staging/');
  assert(
    !fs.existsSync('docs/src/content/docs/02-ux-interaction-design/02-affordances-e-signifiers/rascunho-nao-aprovado.md'),
    'Arquivo de rascunho não deve existir na pasta de conteúdo do front-end público'
  );

  // Limpeza do arquivo de staging temporário do teste
  if (fs.existsSync(publishDraftResult.filePath)) {
    fs.unlinkSync(publishDraftResult.filePath);
  }

  // --------------------------------------------------------------------------
  // TESTE 5: AUDITORIA DO AMBIENTE EXISTENTE & QUARENTENA
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 5: Auditoria e Quarentena da Taxonomia Existente (Objetivo 8) ---');

  assert(
    fs.existsSync('taxonomia/_archive/quarantine-usabilidade-cognitiva.md'),
    'Arquivo contaminado original deve estar preservado em taxonomia/_archive/quarantine-usabilidade-cognitiva.md'
  );
  assert(
    fs.existsSync('taxonomia/_archive/AUDIT_LOG.md'),
    'AUDIT_LOG.md deve existir registrando a proveniência da contaminação (commit befb217)'
  );
  assert(
    !fs.existsSync('docs/src/content/docs/02-ux-interaction-design/02-affordances-e-signifiers/usabilidade-cognitiva.md'),
    'usabilidade-cognitiva.md NÃO deve existir no front-end público (GitHub Pages / Pagefind)'
  );
  assert(
    !fs.existsSync('taxonomia/02-ux-interaction-design/02-affordances-e-signifiers/usabilidade-cognitiva.md'),
    'usabilidade-cognitiva.md NÃO deve residir na taxonomia canônica pública'
  );

  console.log('\n========================================================================');
  console.log(`📊 RESULTADO DA SUÍTE DE INTEGRIDADE: ${passed} passaram, ${failed} falharam.`);
  console.log('========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runConceptualIntegrityRegressionTests().catch((err) => {
  console.error('Erro fatal nos testes de integridade conceitual:', err);
  process.exit(1);
});

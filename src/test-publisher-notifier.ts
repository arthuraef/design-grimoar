import dotenv from 'dotenv';
dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

import { Context } from '@deepseek-ai/cordis';
import fs from 'node:fs';
import path from 'node:path';
import { PublisherService, PublishResult } from './plugins/plugin-publisher/publisher.js';
import { HermesNotifierService, NotificationResult } from './plugins/plugin-hermes-notifier/notifier.js';
import publisherPlugin from './plugins/plugin-publisher/index.js';
import hermesNotifierPlugin from './plugins/plugin-hermes-notifier/index.js';
import { VerbeteFrontmatter } from './schema.js';

async function runPublisherNotifierTests() {
  console.log('========================================================================');
  console.log('🧪 TESTES: PLUGIN-PUBLISHER & PLUGIN-HERMES-NOTIFIER');
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
  // TESTE 1: Publicação Atômica no Git, pgvector e AppFlowy
  // --------------------------------------------------------------------------
  console.log('--- TESTE 1: Publicação Atômica via PublisherService ---');

  const testFrontmatter: VerbeteFrontmatter = {
    title: 'Cognitive Load',
    slug: 'cognitive-load',
    id: 'cognitive-load-01-02',
    domain: '01-psicologia-cognitiva',
    subdomain: '02-carga-cognitiva-e-memoria',
    status: 'audited',
    version: '1.0.0',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    summary: 'Teoria formulada por John Sweller sobre o esforço mental requerido na memória de trabalho.',
    tags: ['psicologia-cognitiva', 'memoria', 'usabilidade'],
    aliases: ['Carga Mental'],
    academic_anchors: ['John Sweller (1988) - Cognitive Load Theory'],
    audit: {
      status: 'APPROVED',
      auditor: 'academic-auditor-v1',
      audited_at: new Date().toISOString(),
      academic_anchor_added: ['Sweller (1988) Teoria da Carga Cognitiva Intrínseca, Estrínseca e Germane'],
    },
    sources: [
      {
        title: 'Cognitive Load During Problem Solving',
        url: 'https://www.sciencedirect.com/science/article/pii/0364021388900237',
        type: 'paper',
        accessed_at: new Date().toISOString().slice(0, 10),
      },
    ],
    cross_references: ['[[Affordance]]', '[[Feedback Loop]]'],
    distinction_criteria: [],
    typed_relations: [],
  };

  const testMarkdown = `---
title: "Cognitive Load"
slug: "cognitive-load"
id: "cognitive-load-01-02"
domain: "01-psicologia-cognitiva"
subdomain: "02-carga-cognitiva-e-memoria"
status: "canonical"
version: "1.0.0"
created_at: "${testFrontmatter.created_at}"
updated_at: "${testFrontmatter.updated_at}"
summary: "${testFrontmatter.summary}"
tags:
  - "psicologia-cognitiva"
  - "memoria"
aliases:
  - "Carga Mental"
academic_anchors:
  - "John Sweller (1988) - Cognitive Load Theory"
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  academic_anchor_added:
    - "Sweller (1988) Carga Cognitiva"
sources:
  - title: "Cognitive Load Paper"
    url: "https://example.com/sweller"
    type: "paper"
cross_references:
  - "[[Affordance]]"
---

# 1. Definição Canônica
*Carga Cognitiva* refere-se à quantidade total de esforço mental imposta à memória de trabalho durante o processamento de informações.

# 2. Fundamentação Teórica e Cognitiva
Formulada por John Sweller em 1988, categoriza a carga mental em intrínseca, estrínseca (inerente ao design) e germane.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- **Heurística:** Eliminar ruído visual e dividir formulários complexos em etapas progressivas.
- **Anti-padrão:** Telas densas com múltiplas ações concorrentes e falta de hierarquia tipográfica.

# 4. Métricas e Impacto em Produto
- Redução na Taxa de Abandono (Drop-off Rate) em fluxos de checkout e onboarding.
- Redução no Time on Task (ToT) e no índice de erros de preenchimento.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Affordance]]
- [[Feedback Loop]]
`;

  const publisher = new PublisherService({
    staticSiteContentDir: 'docs/src/content/docs',
    githubBranch: 'main',
  });

  const publishResult = await publisher.publish(testFrontmatter, testMarkdown);

  assert(publishResult.success === true, 'Publicação deve ter sucesso');
  assert(fs.existsSync(publishResult.filePath), 'Arquivo canônico deve existir no disco');
  assert(publishResult.filePath.endsWith('cognitive-load.md'), 'Caminho deve conter o slug correto');
  assert(typeof publishResult.commitHash === 'string' && publishResult.commitHash.length >= 7, 'Deve gerar hash de commit SHA válido');
  assert(publishResult.staticSiteSynced === true, 'Deve sincronizar documento com o repositório do front-end estático');
  assert(fs.existsSync(path.resolve('./docs/src/content/docs/01-psicologia-cognitiva/02-carga-cognitiva-e-memoria/cognitive-load.md')), 'Arquivo no front-end estático deve existir');

  // --------------------------------------------------------------------------
  // TESTE 2: Notificação Estruturada Hermes Agent
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 2: Notificação Hermes Agent pós-confirmação do Hash ---');

  const notifier = new HermesNotifierService();

  const formattedMsg = notifier.formatNotificationMessage({
    publishResult,
    frontmatter: testFrontmatter,
    attemptsUsed: 1,
    academicAnchors: ['John Sweller (1988)'],
  });

  assert(formattedMsg.includes(publishResult.commitHash), 'Mensagem deve conter o hash de commit confirmado');
  assert(formattedMsg.includes('Cognitive Load'), 'Mensagem deve conter o título do verbete');
  assert(formattedMsg.includes('Front-end (GitHub Pages)'), 'Mensagem deve referenciar o Front-end GitHub Pages');
  assert(formattedMsg.includes('John Sweller (1988)'), 'Mensagem deve conter as âncoras acadêmicas aprovadas');

  const notificationResult = await notifier.notifyStepCompletion({
    publishResult,
    frontmatter: testFrontmatter,
    attemptsUsed: 1,
    academicAnchors: ['John Sweller (1988)'],
  });

  assert(notificationResult.success === true, 'Notificação deve ser processada com sucesso');
  assert(notificationResult.commitHash === publishResult.commitHash, 'Hash notificado deve bater com o hash publicado');

  // --------------------------------------------------------------------------
  // TESTE 3: Integração dos Plugins no Cordis Framework
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 3: Integração dos Plugins no Cordis Framework ---');

  const ctx = new Context();
  const pubFiber = await ctx.plugin(publisherPlugin);
  const notFiber = await ctx.plugin(hermesNotifierPlugin);

  assert(pubFiber !== undefined, 'PublisherPlugin deve registrar Fiber no Cordis');
  assert(notFiber !== undefined, 'HermesNotifierPlugin deve registrar Fiber no Cordis');
  assert((ctx as any).publisher !== undefined, 'ctx.publisher deve estar disponível');
  assert((ctx as any).hermesNotifier !== undefined, 'ctx.hermesNotifier deve estar disponível');

  // --------------------------------------------------------------------------
  // TESTE 4: Blindagem Git (Locks Órfãos e Identidade Autônoma)
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 4: Blindagem Git & Limpeza de Locks Órfãos ---');

  // Simula a existência de um lock órfão
  const dummyLock = path.resolve('.git/index.lock');
  fs.writeFileSync(dummyLock, 'dummy lock test');
  assert(fs.existsSync(dummyLock), 'Lock de teste deve ter sido criado');

  publisher.cleanGitLocks();
  assert(!fs.existsSync(dummyLock), 'cleanGitLocks deve remover lock órfão com segurança');

  await publisher.ensureGitIdentity();
  assert(true, 'ensureGitIdentity deve executar sem erros');

  // --------------------------------------------------------------------------
  // TESTE 5: Cold Start & Bootstrap Vetorial da Taxonomia Existente
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 5: Bootstrap / Backfill Vetorial da Taxonomia ---');

  const indexedCount = await publisher.bootstrapExistingVerbetes('taxonomia');
  assert(typeof indexedCount === 'number', 'bootstrapExistingVerbetes deve retornar a quantidade de verbetes verificados');

  // --------------------------------------------------------------------------
  // TESTE 6: Mecanismo de Lock e Exponential Backoff
  // --------------------------------------------------------------------------
  console.log('\n--- TESTE 6: Resiliência (ExecutionLock & Backoff) ---');

  const { ExecutionLock } = await import('./utils/lock.js');
  const { withExponentialBackoff } = await import('./utils/retry.js');

  const testLock = new ExecutionLock('.test-scanner.lock');
  const acquiredFirst = testLock.acquire();
  assert(acquiredFirst === true, 'Primeira aquisição do lock deve ter sucesso');

  const acquiredSecond = testLock.acquire();
  assert(acquiredSecond === true, 'Reaquisição pelo mesmo PID deve ser permitida');

  testLock.release();
  assert(true, 'Release do lock deve concluir sem falhas');

  let callAttempts = 0;
  const backoffResult = await withExponentialBackoff(
    async () => {
      callAttempts++;
      if (callAttempts < 2) {
        throw new Error('503 Service Unavailable transitório');
      }
      return 'ok';
    },
    { maxRetries: 3, initialDelayMs: 50 },
    'TesteBackoff'
  );

  assert(backoffResult === 'ok', 'withExponentialBackoff deve recuperar operação após erro 503');
  assert(callAttempts === 2, 'withExponentialBackoff deve retentar exatamente a quantidade necessária');

  console.log('\n========================================================================');
  console.log(`📊 RESULTADO FINAL: ${passed} passaram, ${failed} falharam.`);
  console.log('========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPublisherNotifierTests().catch((err) => {
  console.error('Erro na execução dos testes:', err);
  process.exit(1);
});

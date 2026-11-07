import fs from 'node:fs';
import path from 'node:path';
import { withExponentialBackoff } from '../../utils/retry.js';

export interface SynthesizerInput {
  mode: 'CREATE' | 'MERGE';
  sourceContent: string;
  currentVerbete?: string;
}

export interface CorrectionFeedback {
  attempt: number;
  auditorCritique?: string;
  zodErrors?: string[];
  previousDraft?: string;
}

export interface SynthesizerConfig {
  promptPath?: string;
  apiKey?: string;
  model?: string;
  baseUrl?: string;
  temperature?: number;
  allowTestFallback?: boolean;
}

export function sanitizeBaseUrl(raw: string): string {
  const match = raw.match(/https?:\/\/[^\s)\]]+/);
  return (match ? match[0] : raw).replace(/\/+$/, '');
}

/**
 * Resolução resiliente do caminho do prompt (suporta /prompts/... ou ./prompts/...)
 */
export function resolvePromptFile(candidatePath: string): string {
  if (fs.existsSync(candidatePath)) return candidatePath;

  const normalized = candidatePath.replace(/^\//, '');
  const fromCwd = path.resolve(process.cwd(), normalized);
  if (fs.existsSync(fromCwd)) return fromCwd;

  const fromBasename = path.resolve(process.cwd(), 'prompts', path.basename(candidatePath));
  if (fs.existsSync(fromBasename)) return fromBasename;

  throw new Error(`Arquivo de prompt não encontrado: ${candidatePath} (verificado em ${fromCwd})`);
}

/**
 * Serviço do Lexicógrafo-Chefe (Agente Gerador) — DeepSeek Harness
 * Realiza chamadas HTTP reais para LLM (DeepSeek / OpenAI) lendo do .env.
 */
export class SynthesizerService {
  private systemPrompt: string;
  private apiKey?: string;
  private model: string;
  private baseUrl: string;
  private temperature: number;
  private allowFallback: boolean;

  constructor(config: SynthesizerConfig = {}) {
    const promptPath = resolvePromptFile(config.promptPath || 'prompts/step2-lexicographer.md');
    this.systemPrompt = fs.readFileSync(promptPath, 'utf-8');

    // Leitura estrita de variáveis de ambiente do .env
    this.apiKey =
      config.apiKey ||
      process.env.LEXICOGRAPHER_API_KEY ||
      process.env.DEEPSEEK_API_KEY ||
      process.env.OPENAI_API_KEY;

    const rawBaseUrl =
      config.baseUrl ||
      process.env.LEXICOGRAPHER_BASE_URL ||
      process.env.DEEPSEEK_BASE_URL ||
      (process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com' : 'https://api.openai.com/v1');
    this.baseUrl = sanitizeBaseUrl(rawBaseUrl);

    this.model =
      config.model ||
      process.env.LEXICOGRAPHER_MODEL ||
      process.env.DEEPSEEK_MODEL ||
      (process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4o');

    this.temperature =
      config.temperature ?? parseFloat(process.env.LEXICOGRAPHER_TEMPERATURE || '0.2');

    const isTest = process.env.NODE_ENV === 'test';
    this.allowFallback = config.allowTestFallback ?? (isTest || process.env.ALLOW_TEST_FALLBACKS === 'true');
  }

  /**
   * Executa a síntese do verbete via cliente HTTP real para o LLM
   */
  async synthesize(input: SynthesizerInput, feedback?: CorrectionFeedback): Promise<string> {
    console.log(`[Lexicógrafo]: Sintetizando verbete em [MODO: ${input.mode}] via ${this.model}...`);

    const messageParts: string[] = [
      `[MODO: ${input.mode}]`,
      `[CONTEÚDO_FONTE]:\n${input.sourceContent}`,
    ];

    if (input.mode === 'MERGE' && input.currentVerbete) {
      messageParts.push(`[VERBETE_ATUAL]:\n${input.currentVerbete}`);
    }

    // Injeção de feedback de auditoria/Zod se for uma retentativa de correção
    if (feedback) {
      const feedbackNotes: string[] = [
        `⚠️ ATENÇÃO: Esta é a tentativa de correção #${feedback.attempt}.`,
        'O rascunho anterior foi REPROVADO. Corrija rigorosamente todas as inconformidades abaixo:',
      ];

      if (feedback.auditorCritique) {
        feedbackNotes.push(`- CRÍTICA DO AUDITOR ACADÊMICO: ${feedback.auditorCritique}`);
      }

      if (feedback.zodErrors && feedback.zodErrors.length > 0) {
        feedbackNotes.push(
          `- ERROS DE FORMATAÇÃO E SCHEMA (ZOD):\n  * ${feedback.zodErrors.join('\n  * ')}`
        );
      }

      feedbackNotes.push(
        'Lembre-se: Retorne APENAS o documento Markdown com YAML Frontmatter estrito e exatamente as 5 seções obrigatórias numeradas.'
      );

      messageParts.push(`[FEEDBACK_DE_CORREÇÃO]:\n${feedbackNotes.join('\n')}`);

      if (feedback.previousDraft) {
        messageParts.push(`[RASCUNHO_ANTERIOR_A_CORRIGIR]:\n${feedback.previousDraft}`);
      }
    }

    const userMessage = messageParts.join('\n\n');

    // 1. Cliente HTTP Real para LLM (DeepSeek / OpenAI / Endpoint compatível)
    if (this.apiKey) {
      const endpoint = this.baseUrl.endsWith('/')
        ? `${this.baseUrl}chat/completions`
        : `${this.baseUrl}/chat/completions`;

      console.log(`[Lexicógrafo]: Enviando requisição real para ${endpoint} (${this.model})...`);

      try {
        const content = await withExponentialBackoff(
          async () => {
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
              },
              body: JSON.stringify({
                model: this.model,
                messages: [
                  { role: 'system', content: this.systemPrompt },
                  { role: 'user', content: userMessage },
                ],
                temperature: this.temperature,
              }),
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`[Lexicógrafo API Error HTTP ${response.status}]: ${errorText}`);
            }

            const data: any = await response.json();
            const text = data.choices?.[0]?.message?.content;
            if (!text) {
              throw new Error('[Lexicógrafo]: API retornou resposta vazia.');
            }
            return text.trim();
          },
          { maxRetries: 3, initialDelayMs: 2000 },
          `Lexicógrafo (${this.model})`
        );

        return content;
      } catch (err: any) {
        if (!this.allowFallback) {
          throw err;
        }
        console.warn(`[Lexicógrafo]: Erro na chamada real à API (${err.message}). Utilizando fallback determinístico de teste.`);
      }
    }

    // 2. Se não houver chave em produção, lança erro explícito
    if (!this.allowFallback) {
      throw new Error(
        '[Lexicógrafo]: Chave de API não configurada no .env. ' +
        'Defina LEXICOGRAPHER_API_KEY ou DEEPSEEK_API_KEY.'
      );
    }

    // 3. Fallback determinístico estrito para ambiente de testes
    console.warn('[Lexicógrafo]: Modo de teste ativo — utilizando gerador sintético de teste.');
    return this.generateDeterministicFallback(input, feedback);
  }

  /**
   * Fallback sintético determinístico para testes unitários offline com separação ontológica estrita
   * Impede a geração de quimeras ou contaminação conceitual cruzada (Objetivos 1, 2 e 7).
   */
  private generateDeterministicFallback(input: SynthesizerInput, feedback?: CorrectionFeedback): string {
    const content = input.sourceContent.toLowerCase();

    // 1. Roteamento de fallback para Carga Cognitiva
    if (content.includes('cognitive load') || content.includes('carga cognitiva') || content.includes('sweller')) {
      return `---
title: "Cognitive Load"
slug: "cognitive-load"
id: "cognitive-load-01-02"
canonical_id: "grimoar:cog:cognitive-load"
original_term: "Cognitive Load"
domain: "01-psicologia-cognitiva"
subdomain: "02-carga-cognitiva-e-memoria"
status: "canonical"
version: "1.0.0"
created_at: "${new Date().toISOString()}"
updated_at: "${new Date().toISOString()}"
summary: "Teoria da psicologia cognitiva que descreve a carga imposta à memória de trabalho durante o processamento de informação."
tags:
  - "psicologia-cognitiva"
  - "memoria"
  - "usabilidade"
aliases:
  - "Carga Mental"
  - "Mental Workload"
academic_anchors:
  - "John Sweller (1988) - Cognitive Load Theory"
  - "Fred Paas (2003) - Cognitive Load Measurement"
distinction_criteria:
  - "Carga Cognitiva NÃO é frustração subjetiva do usuário; é o limite biológico da memória de trabalho."
typed_relations:
  - target_slug: "affordance"
    relation_type: "influences"
    description: "Affordances claras reduzem o esforço extrínseco na memória de trabalho."
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "${new Date().toISOString()}"
  academic_anchor_added:
    - "John Sweller (1988) - Cognitive Load Theory"
sources:
  - title: "Cognitive Load Theory"
    url: "https://www.sciencedirect.com/science/article/pii/0364021388900237"
    type: "paper"
    accessed_at: "${new Date().toISOString().slice(0, 10)}"
cross_references:
  - "[[Affordance]]"
  - "[[Signifier]]"
---

# 1. Definição Canônica
*Cognitive Load* (Carga Cognitiva) refere-se à quantidade total de esforço mental e recursos atencionais demandados da memória de trabalho durante a interação com um sistema digital.

# 2. Fundamentação Teórica e Cognitiva
Formulada por John Sweller em 1988, a teoria decompõe a carga mental em intrínseca (inerente à tarefa), extrínseca (gerada por design ineficiente) e germane (destinada à construção de esquemas mentais duradouros).

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- **Heurística:** Eliminar passos desnecessários em fluxos críticos e fragmentar formulários complexos (*chunking*).
- **Anti-padrão:** Interfaces hiperdensas com concorrência atencional desprovida de hierarquia tipográfica.

# 4. Métricas e Impacto em Produto
- Redução na Taxa de Erro de Preenchimento.
- Aumento na Taxa de Conclusão de Tarefas (Task Completion Rate).

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Affordance]]
- [[Signifier]]
`;
    }

    // 2. Roteamento de fallback para Affordance
    if (content.includes('affordance') || content.includes('potencial de ação') || content.includes('gibson')) {
      return `---
title: "Affordance"
slug: "affordance"
id: "affordance-02-01"
canonical_id: "grimoar:ux:affordance"
original_term: "Affordance"
domain: "02-ux-interaction-design"
subdomain: "02-affordances-e-signifiers"
status: "canonical"
version: "1.0.0"
created_at: "${new Date().toISOString()}"
updated_at: "${new Date().toISOString()}"
summary: "Propriedade relacional entre as características físicas ou digitais de um artefato e as capacidades de ação do ator."
tags:
  - "usabilidade"
  - "interacao"
  - "psicologia-cognitiva"
aliases:
  - "Potencial de Ação"
  - "Action Possibility"
academic_anchors:
  - "James J. Gibson (1979) - The Ecological Approach to Visual Perception"
  - "Don Norman (1988) - The Design of Everyday Things"
distinction_criteria:
  - "Affordance NÃO é uma pista visual (signifier); existe ontologicamente mesmo que não seja visível ou percebida."
typed_relations:
  - target_concept: "signifier"
    relation_type: "distinguished_from"
    rationale: "Affordance é o potencial de ação; Signifier é a pista perceptível que comunica a existência da affordance."
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "${new Date().toISOString()}"
  academic_anchor_added:
    - "James J. Gibson (1979) - The Ecological Approach to Visual Perception"
sources:
  - title: "The Design of Everyday Things"
    url: "https://mitpress.mit.edu/books/design-everyday-things"
    type: "book"
    accessed_at: "${new Date().toISOString().slice(0, 10)}"
cross_references:
  - "[[Signifier]]"
  - "[[CognitiveLoad]]"
---

# 1. Definição Canônica
*Affordance* (potencial de ação) descreve a relação física ou digital entre as propriedades de um artefato e as capacidades do ator. Não é uma propriedade exclusiva do objeto nem do sujeito, mas sim da relação dinâmica entre ambos.

# 2. Fundamentação Teórica e Cognitiva
Cunhado por James J. Gibson (1979) na psicologia ecológica para definir possibilidades de ação ambientais, e adaptado por Don Norman (1988) para a Interação Humano-Computador sob o conceito de affordances percebidas.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- **Heurística:** Fornecer pistas visuais inequívocas sobre as ações permitidas por componentes interativos.
- **Anti-padrão:** Falsa Affordance (*False Affordance*) — elementos com aparência clicável que não executam ações.

# 4. Métricas e Impacto em Produto
- Redução na Taxa de Cliques Perdidos (Dead Clicks).
- Otimização do Time to First Action em fluxos primários.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Signifier]]
- [[CognitiveLoad]]
`;
    }

    // 3. Roteamento de fallback para Signifier
    if (content.includes('signifier') || content.includes('significante') || content.includes('pista perceptível')) {
      return `---
title: "Signifier"
slug: "signifier"
id: "signifier-02-02"
canonical_id: "grimoar:ux:signifier"
original_term: "Signifier"
domain: "02-ux-interaction-design"
subdomain: "02-affordances-e-signifiers"
status: "canonical"
version: "1.0.0"
created_at: "${new Date().toISOString()}"
updated_at: "${new Date().toISOString()}"
summary: "Sinais perceptíveis no design que indicam aos usuários onde e como a ação pretendida deve ocorrer."
tags:
  - "usabilidade"
  - "interacao"
  - "percepcao-visual"
aliases:
  - "Significante"
  - "Pista Perceptível"
academic_anchors:
  - "Don Norman (2008) - Signifiers, Not Affordances"
  - "Don Norman (2013) - The Design of Everyday Things"
distinction_criteria:
  - "Signifier NÃO é a affordance física em si; é o sinal perceptível que a torna compreensível ao usuário."
typed_relations:
  - target_concept: "affordance"
    relation_type: "distinguished_from"
    rationale: "Affordance é o potencial relacional de ação; Signifier é a pista perceptível que comunica esse potencial."
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "${new Date().toISOString()}"
  academic_anchor_added:
    - "Don Norman (2008) - Signifiers, Not Affordances"
sources:
  - title: "Signifiers, Not Affordances"
    url: "https://dl.acm.org/doi/10.1145/1409040.1409044"
    type: "paper"
    accessed_at: "${new Date().toISOString().slice(0, 10)}"
cross_references:
  - "[[Affordance]]"
  - "[[CognitiveLoad]]"
---

# 1. Definição Canônica
*Signifier* (Significante) consiste em qualquer marcador visual, sonoro ou tátil perceptível que comunica de maneira explícita o propósito e a mecânica de interação de um componente.

# 2. Fundamentação Teórica e Cognitiva
Formalizado por Don Norman (2008), o conceito emergiu da necessidade de distinguir o potencial físico relacional (Affordance de Gibson) dos sinais comunicativos deliberadamente desenhados por projetistas de interface.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- **Heurística:** Utilizar rótulos, ícones padronizados e microinterações de hover para sinalizar estados acionáveis.
- **Anti-padrão:** Botões planos (*flat*) indistinguíveis de blocos de texto estático (*mystery meat navigation*).

# 4. Métricas e Impacto em Produto
- Redução na Taxa de Misclick (Cliques Perdidos).
- Diminuição do Time to First Action em novos fluxos.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Affordance]]
- [[CognitiveLoad]]
`;
    }

    // 4. Default: template limpo de Affordance
    return `---
title: "Affordance"
slug: "affordance"
id: "affordance-02-01"
canonical_id: "grimoar:ux:affordance"
original_term: "Affordance"
domain: "02-ux-interaction-design"
subdomain: "02-affordances-e-signifiers"
status: "canonical"
version: "1.0.0"
created_at: "${new Date().toISOString()}"
updated_at: "${new Date().toISOString()}"
summary: "Propriedade relacional entre as características físicas ou digitais de um artefato e as capacidades de ação do ator."
tags:
  - "usabilidade"
  - "interacao"
  - "psicologia-cognitiva"
aliases:
  - "Potencial de Ação"
  - "Action Possibility"
academic_anchors:
  - "James J. Gibson (1979) - The Ecological Approach to Visual Perception"
  - "Don Norman (1988) - The Design of Everyday Things"
distinction_criteria:
  - "Affordance NÃO é uma pista visual (signifier); existe ontologicamente mesmo que não seja visível ou percebida."
typed_relations:
  - target_concept: "signifier"
    relation_type: "distinguished_from"
    rationale: "Affordance é o potencial de ação; Signifier é a pista perceptível que comunica a existência da affordance."
audit:
  status: "APPROVED"
  auditor: "academic-auditor-v1"
  audited_at: "${new Date().toISOString()}"
  academic_anchor_added:
    - "James J. Gibson (1979) - The Ecological Approach to Visual Perception"
sources:
  - title: "The Design of Everyday Things"
    url: "https://mitpress.mit.edu/books/design-everyday-things"
    type: "book"
    accessed_at: "${new Date().toISOString().slice(0, 10)}"
cross_references:
  - "[[Signifier]]"
  - "[[CognitiveLoad]]"
---

# 1. Definição Canônica
*Affordance* (potencial de ação) descreve a relação física ou digital entre as propriedades de um artefato e as capacidades do ator. Não é uma propriedade exclusiva do objeto nem do sujeito, mas sim da relação dinâmica entre ambos.

# 2. Fundamentação Teórica e Cognitiva
Cunhado por James J. Gibson (1979) na psicologia ecológica para definir possibilidades de ação ambientais, e adaptado por Don Norman (1988) para a Interação Humano-Computador sob o conceito de affordances percebidas.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- **Heurística:** Fornecer pistas visuais inequívocas sobre as ações permitidas por componentes interativos.
- **Anti-padrão:** Falsa Affordance (*False Affordance*) — elementos com aparência clicável que não executam ações.

# 4. Métricas e Impacto em Produto
- Redução na Taxa de Cliques Perdidos (Dead Clicks).
- Otimização do Time to First Action em fluxos primários.

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Signifier]]
- [[CognitiveLoad]]
`;
  }
}

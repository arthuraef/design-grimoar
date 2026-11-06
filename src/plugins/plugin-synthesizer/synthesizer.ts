import fs from 'node:fs';
import path from 'node:path';

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
        const content = data.choices?.[0]?.message?.content;
        if (!content) {
          throw new Error('[Lexicógrafo]: API retornou resposta vazia.');
        }
        return content.trim();
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
   * Fallback sintético determinístico para testes unitários offline
   */
  private generateDeterministicFallback(input: SynthesizerInput, feedback?: CorrectionFeedback): string {
    const slug = input.sourceContent.toLowerCase().includes('affordance') ? 'affordance' : 'usabilidade-cognitiva';
    const title = slug === 'affordance' ? 'Affordance' : 'Usabilidade Cognitiva';

    return `---
title: "${title}"
slug: "${slug}"
id: "${slug}-02-01"
domain: "02-ux-interaction-design"
subdomain: "02-affordances-e-signifiers"
status: "in_review"
version: "1.0.0"
created_at: "${new Date().toISOString()}"
updated_at: "${new Date().toISOString()}"
summary: "Conceito fundamental de design e psicologia sobre as possibilidades de ação percebidas ou reais entre atores e objetos."
tags:
  - "usabilidade"
  - "design-tokens"
  - "psicologia-cognitiva"
aliases:
  - "Potencial de Ação"
academic_anchors:
  - "Don Norman (1988) - The Design of Everyday Things"
  - "James J. Gibson (1979) - The Ecological Approach to Visual Perception"
  - "Sweller (1988) - Cognitive Load Theory"
audit:
  status: "PENDING"
  auditor: "lexicographer-agent"
  academic_anchor_added: []
sources:
  - title: "The Design of Everyday Things"
    url: "https://mitpress.mit.edu/books/design-everyday-things"
    type: "book"
    accessed_at: "${new Date().toISOString().slice(0, 10)}"
cross_references:
  - "[[Signifier]]"
  - "[[Feedback Loop]]"
---

# 1. Definição Canônica
*Affordance* descreve a relação física e digital entre as características de um artefato e as capacidades de interação do usuário.

# 2. Fundamentação Teórica e Cognitiva
Ancorado nos estudos de percepção de James J. Gibson (1979) e adaptado para o design centrado no usuário por Don Norman (1988), correlacionando-se com a Teoria da Carga Cognitiva de Sweller.

# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)
- **Heurística:** Fornecer pistas visuais de interação inequívocas em elementos interativos.
- **Anti-padrão:** Botões e áreas acionáveis desprovidos de relevo, borda ou distinção tátil.

# 4. Métricas e Impacto em Produto
- Redução na Taxa de Cliques Errôneos (Misclick Rate).
- Otimização da Curva de Aprendizado e Redução do Time to Complete (TTC).

# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes
- [[Signifier]]
- [[Feedback Loop]]
`;
  }
}

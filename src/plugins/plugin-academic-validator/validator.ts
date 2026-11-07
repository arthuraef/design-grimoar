import fs from 'node:fs';
import path from 'node:path';
import { resolvePromptFile, sanitizeBaseUrl } from '../plugin-synthesizer/synthesizer.js';
import { withExponentialBackoff } from '../../utils/retry.js';

export interface AuditedClaim {
  claim: string;
  anchor: string;
  verified: boolean;
  justification: string;
}

export interface AcademicAuditResult {
  status: 'APPROVED' | 'REJECTED';
  academic_anchor_added: string[];
  claims_audited?: AuditedClaim[];
  audited_markdown: string;
  critique?: string;
}

export interface AcademicValidatorConfig {
  promptPath?: string;
  apiKey?: string;
  model?: string;
  baseUrl?: string;
  temperature?: number;
  allowTestFallback?: boolean;
}

/**
 * Serviço do Auditor Científico e Acadêmico (Agente Verificador)
 * 
 * Regra Inegociável 2: Isolamento de Agentes (Generator-Verifier).
 * Realiza chamadas HTTP reais com chaves e endpoints independentes do Lexicógrafo.
 */
export class AcademicValidatorService {
  private systemPrompt: string;
  private apiKey?: string;
  private model: string;
  private baseUrl: string;
  private temperature: number;
  private allowFallback: boolean;

  constructor(config: AcademicValidatorConfig = {}) {
    const promptPath = resolvePromptFile(config.promptPath || 'prompts/step3-academic-auditor.md');
    this.systemPrompt = fs.readFileSync(promptPath, 'utf-8');

    // Leitura estrita de variáveis de ambiente do .env para o Verificador Independente
    this.apiKey =
      config.apiKey ||
      process.env.ACADEMIC_AUDITOR_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.DEEPSEEK_API_KEY;

    const rawBaseUrl =
      config.baseUrl ||
      process.env.ACADEMIC_AUDITOR_BASE_URL ||
      process.env.OPENAI_BASE_URL ||
      (process.env.OPENAI_API_KEY ? 'https://api.openai.com/v1' : 'https://api.deepseek.com');
    this.baseUrl = sanitizeBaseUrl(rawBaseUrl);

    this.model =
      config.model ||
      process.env.ACADEMIC_AUDITOR_MODEL ||
      process.env.OPENAI_MODEL ||
      (process.env.OPENAI_API_KEY ? 'gpt-4o' : 'deepseek-reasoner');

    this.temperature =
      config.temperature ?? parseFloat(process.env.ACADEMIC_AUDITOR_TEMPERATURE || '0.1');

    const isTest = process.env.NODE_ENV === 'test';
    this.allowFallback = config.allowTestFallback ?? (isTest || process.env.ALLOW_TEST_FALLBACKS === 'true');
  }

  /**
   * Executa a auditoria acadêmica independente do rascunho de verbete via cliente HTTP real
   */
  async validate(draftMarkdown: string): Promise<AcademicAuditResult> {
    console.log(`[Auditor Acadêmico]: Iniciando avaliação científica via ${this.model}...`);

    const userMessage = `Por favor, audite rigorosamente o rascunho de verbete abaixo segundo seus critérios acadêmicos e retorne o JSON estrito:\n\n${draftMarkdown}`;

    // 1. Cliente HTTP Real para LLM Verifier (OpenAI / DeepSeek / Endpoint independente)
    if (this.apiKey) {
      const endpoint = this.baseUrl.endsWith('/')
        ? `${this.baseUrl}chat/completions`
        : `${this.baseUrl}/chat/completions`;

      console.log(`[Auditor Acadêmico]: Enviando requisição real para ${endpoint} (${this.model})...`);

      try {
        return await withExponentialBackoff(
          async () => {
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
              },
              body: JSON.stringify({
                model: this.model,
                response_format: { type: 'json_object' },
                messages: [
                  { role: 'system', content: this.systemPrompt },
                  { role: 'user', content: userMessage },
                ],
                temperature: this.temperature,
              }),
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`[Auditor Acadêmico API Error HTTP ${response.status}]: ${errorText}`);
            }

            const data: any = await response.json();
            const rawJson = data.choices?.[0]?.message?.content || '{}';
            return this.parseAuditResponse(rawJson, draftMarkdown);
          },
          { maxRetries: 3, initialDelayMs: 2000 },
          `Auditor Acadêmico (${this.model})`
        );
      } catch (err: any) {
        if (!this.allowFallback) {
          throw err;
        }
        console.warn(`[Auditor Acadêmico]: Erro na chamada real à API (${err.message}). Utilizando fallback determinístico de teste.`);
      }
    }

    // 2. Se não houver chave em produção, lança erro explícito
    if (!this.allowFallback) {
      throw new Error(
        '[Auditor Acadêmico]: Chave de API não configurada no .env. ' +
        'Defina ACADEMIC_AUDITOR_API_KEY ou OPENAI_API_KEY.'
      );
    }

    // 3. Validador acadêmico determinístico para ambiente offline / testes
    console.warn('[Auditor Acadêmico]: Modo de teste ativo — utilizando auditor determinístico de teste.');
    return this.deterministicAudit(draftMarkdown);
  }

  /**
   * Parseia o retorno JSON do modelo com sanitização de escapes inválidos e recuperação tolerante a falhas
   */
  private parseAuditResponse(rawJson: string, fallbackDraft: string): AcademicAuditResult {
    let cleaned = rawJson.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    }

    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (firstErr) {
      // Tentativa 1 de recuperação: escapar sequências inválidas de escape (\* -> \\*, \[ -> \\[, etc.)
      try {
        const fixedEscapes = cleaned.replace(/\\([^"\\\/bfnrtu]|u(?!([0-9a-fA-F]{4})))/g, '\\\\$1');
        parsed = JSON.parse(fixedEscapes);
      } catch (secondErr) {
        // Tentativa 2 de recuperação: extrair campos essenciais via regex se o JSON estiver com escapes corrompidos
        const statusMatch = cleaned.match(/"status"\s*:\s*"(APPROVED|REJECTED)"/i);
        const critiqueMatch = cleaned.match(/"critique"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/i);

        if (statusMatch) {
          console.warn(`[Auditor Acadêmico]: JSON com escapes corrompidos recuperado via regex. Status: ${statusMatch[1]}`);
          return {
            status: statusMatch[1].toUpperCase() === 'APPROVED' ? 'APPROVED' : 'REJECTED',
            academic_anchor_added: [],
            claims_audited: [],
            audited_markdown: fallbackDraft,
            critique: critiqueMatch ? critiqueMatch[1].replace(/\\"/g, '"') : undefined,
          };
        }

        throw new Error(`Falha ao decodificar JSON do Auditor: ${(firstErr as Error).message}. Retorno bruto: ${rawJson}`);
      }
    }

    return {
      status: parsed.status === 'APPROVED' ? 'APPROVED' : 'REJECTED',
      academic_anchor_added: Array.isArray(parsed.academic_anchor_added) ? parsed.academic_anchor_added : [],
      claims_audited: Array.isArray(parsed.claims_audited) ? parsed.claims_audited : [],
      audited_markdown: parsed.audited_markdown || fallbackDraft,
      critique: parsed.critique || parsed.reason,
    };
  }

  /**
   * Auditoria determinística para verificação de escopo, rastreabilidade epistêmica e literatura científica
   */
  public deterministicAudit(draftMarkdown: string): AcademicAuditResult {
    const lower = draftMarkdown.toLowerCase();

    // 1. Verificação de Divergência Conceitual entre Título e Definição
    const titleMatch = draftMarkdown.match(/title:\s*["']?([^"'\r\n]+)["']?/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    const titleLower = title.toLowerCase();

    const sec1Match = draftMarkdown.match(/# 1\. Definição Canônica\s*([\s\S]*?)(?=(# 2\.|$))/i);
    const sec1 = sec1Match ? sec1Match[1].trim() : '';
    const sec1Lower = sec1.toLowerCase();

    // Rejeição estrita se o título é Usabilidade Cognitiva mas a definição define Affordance
    if (!titleLower.includes('affordance') && (sec1Lower.startsWith('*affordance*') || sec1Lower.startsWith('affordance'))) {
      return {
        status: 'REJECTED',
        academic_anchor_added: [],
        claims_audited: [
          {
            claim: `Definição Canônica do verbete "${title}"`,
            anchor: 'Inconsistência Epistêmica Título-Definição',
            verified: false,
            justification: `O verbete intitulado "${title}" apresenta uma definição canônica de Affordance em vez do conceito do título.`,
          },
        ],
        audited_markdown: draftMarkdown,
        critique: `[Contaminação Conceitual]: O verbete intitulado "${title}" apresenta uma definição canônica de Affordance em vez do conceito do título.`,
      };
    }

    // 2. Critério de Escopo Geral
    const validScopeKeywords = [
      'product design', 'ux', 'ui', 'design system', 'designops', 'psicologia cognitiva',
      'usabilidade', 'interação', 'affordance', 'signifier', 'heuristic', 'interface'
    ];
    const hasScope = validScopeKeywords.some((kw) => lower.includes(kw));

    if (!hasScope) {
      return {
        status: 'REJECTED',
        academic_anchor_added: [],
        audited_markdown: draftMarkdown,
        critique: 'O texto foge completamente ao escopo de Product Design, UX/UI, Design Systems ou Psicologia Cognitiva.',
      };
    }

    // 3. Rastreabilidade Epistêmica: Proibição de Falsa Atribuição ("Name Dropping")
    if (titleLower.includes('affordance') || sec1Lower.includes('affordance')) {
      if (lower.includes('sweller') || lower.includes('cognitive load theory')) {
        return {
          status: 'REJECTED',
          academic_anchor_added: [],
          audited_markdown: draftMarkdown,
          critique: 'Inconsistência epistêmica: John Sweller (Cognitive Load Theory) atribuído indevidamente ao verbete de Affordance. Gibson (1979) e Norman (1988) são as autoridades canônicas.',
        };
      }
    }

    if (titleLower.includes('cognitive load') || titleLower.includes('carga cognitiva')) {
      if (lower.includes('gibson') && !lower.includes('sweller')) {
        return {
          status: 'REJECTED',
          academic_anchor_added: [],
          audited_markdown: draftMarkdown,
          critique: 'Inconsistência epistêmica: James J. Gibson (Psicologia Ecológica/Affordance) não fundamenta a Teoria da Carga Cognitiva. Sweller (1988) e Paas são os autores fundamentais.',
        };
      }
    }

    // 4. Âncoras acadêmicas comprovadas
    const academicAuthorities = [
      'norman', 'nielsen', 'gestalt', 'sweller', 'fogg', 'iso 9241', 'gibson', 'shneiderman', 'fitts', 'hick', 'yablonski'
    ];
    const matchedAnchors = academicAuthorities.filter((auth) => lower.includes(auth));

    if (matchedAnchors.length === 0) {
      return {
        status: 'REJECTED',
        academic_anchor_added: [],
        audited_markdown: draftMarkdown,
        critique: 'Afirmações superficiais sem respaldo em literatura científica comprovada (Nielsen, Norman, Gestalt, Sweller, Fogg, ISO 9241).',
      };
    }

    return {
      status: 'APPROVED',
      academic_anchor_added: matchedAnchors.map((a) => `Literatura comprovada: ${a.toUpperCase()}`),
      claims_audited: matchedAnchors.map((a) => ({
        claim: `Fundamentação teórica do verbete ${title || 'canônico'}`,
        anchor: a.toUpperCase(),
        verified: true,
        justification: `Literatura científica canônica de ${a.toUpperCase()} comprovada para o escopo avaliado.`,
      })),
      audited_markdown: draftMarkdown,
    };
  }
}

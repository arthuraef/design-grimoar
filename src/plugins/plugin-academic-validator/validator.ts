import fs from 'node:fs';
import path from 'node:path';
import { resolvePromptFile, sanitizeBaseUrl } from '../plugin-synthesizer/synthesizer.js';

export interface AcademicAuditResult {
  status: 'APPROVED' | 'REJECTED';
  academic_anchor_added: string[];
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
   * Parseia o retorno JSON do modelo
   */
  private parseAuditResponse(rawJson: string, fallbackDraft: string): AcademicAuditResult {
    try {
      const parsed = JSON.parse(rawJson);
      return {
        status: parsed.status === 'APPROVED' ? 'APPROVED' : 'REJECTED',
        academic_anchor_added: Array.isArray(parsed.academic_anchor_added) ? parsed.academic_anchor_added : [],
        audited_markdown: parsed.audited_markdown || fallbackDraft,
        critique: parsed.critique || parsed.reason,
      };
    } catch (err: any) {
      throw new Error(`Falha ao decodificar JSON do Auditor: ${err.message}. Retorno bruto: ${rawJson}`);
    }
  }

  /**
   * Auditoria determinística para verificação de escopo e literatura científica sem LLM ativo
   */
  public deterministicAudit(draftMarkdown: string): AcademicAuditResult {
    const lower = draftMarkdown.toLowerCase();

    // Critério 1: Escopo (Product Design, UX/UI, Design Systems, DesignOps, Psicologia Cognitiva)
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

    // Critério 2: Âncoras acadêmicas (Nielsen, Norman, Gestalt, Sweller, Fogg, ISO 9241, Gibson)
    const academicAuthorities = [
      'norman', 'nielsen', 'gestalt', 'sweller', 'fogg', 'iso 9241', 'gibson', 'shneiderman', 'fitts', 'hick'
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
      audited_markdown: draftMarkdown,
    };
  }
}

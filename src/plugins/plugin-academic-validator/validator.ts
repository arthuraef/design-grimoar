import fs from 'node:fs';
import path from 'node:path';
import { resolvePromptFile } from '../plugin-synthesizer/synthesizer.js';

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
}

/**
 * Serviço do Auditor Científico e Acadêmico (Agente Verificador)
 * 
 * Regra Inegociável 2: Isolamento de Agentes (Generator-Verifier).
 * Chamada de API e prompt de sistema totalmente independentes do Lexicógrafo.
 */
export class AcademicValidatorService {
  private systemPrompt: string;
  private apiKey?: string;
  private model: string;
  private baseUrl: string;
  private temperature: number;

  constructor(config: AcademicValidatorConfig = {}) {
    const promptPath = resolvePromptFile(config.promptPath || 'prompts/step3-academic-auditor.md');
    this.systemPrompt = fs.readFileSync(promptPath, 'utf-8');

    // Isolamento: prioriza chave independente para o verificador
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY;
    this.model = config.model || (process.env.OPENAI_API_KEY ? 'gpt-4o' : 'deepseek-reasoner');
    this.baseUrl = config.baseUrl || (process.env.OPENAI_API_KEY ? 'https://api.openai.com/v1' : 'https://api.deepseek.com');
    this.temperature = config.temperature ?? 0.1; // Baixa temperatura para auditoria rigorosa
  }

  /**
   * Executa a auditoria acadêmica independente do rascunho de verbete
   */
  async validate(draftMarkdown: string): Promise<AcademicAuditResult> {
    console.log('[Auditor Acadêmico]: Iniciando avaliação científica rigorosa do rascunho...');

    const userMessage = `Por favor, audite rigorosamente o rascunho de verbete abaixo segundo seus critérios acadêmicos e retorne o JSON estrito:\n\n${draftMarkdown}`;

    if (this.apiKey) {
      const endpoint = this.baseUrl.endsWith('/') ? `${this.baseUrl}chat/completions` : `${this.baseUrl}/chat/completions`;
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
        throw new Error(`[Auditor Acadêmico API Error ${response.status}]: ${errorText}`);
      }

      const data: any = await response.json();
      const rawJson = data.choices?.[0]?.message?.content || '{}';
      return this.parseAuditResponse(rawJson, draftMarkdown);
    }

    // Validador acadêmico determinístico para ambiente offline / testes
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

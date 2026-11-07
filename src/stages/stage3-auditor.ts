import fs from 'node:fs';
import path from 'node:path';
import { AcademicAuditResult } from '../types/index.js';

/**
 * ETAPA 3: Auditoria Científica e Acadêmica (Agente Verificador)
 * Regra Inegociável 2: Isolamento de Agentes (Generator-Verifier).
 * Chamada de API e prompt de sistema totalmente independentes da Etapa 2.
 */
export async function runAcademicAuditor(
  draftMarkdown: string,
  options?: {
    apiKey?: string;
    model?: string;
    baseUrl?: string;
  }
): Promise<AcademicAuditResult> {
  const promptPath = path.resolve('prompts/step3-academic-auditor.md');
  if (!fs.existsSync(promptPath)) {
    throw new Error(`Arquivo de prompt do Auditor Acadêmico não encontrado em ${promptPath}`);
  }
  const systemPrompt = fs.readFileSync(promptPath, 'utf-8');

  // Isolamento: pode usar chave/modelo verifier separado (ex: OpenAI / DeepSeek Reasoner)
  const apiKey = options?.apiKey || process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY;
  const baseUrl = options?.baseUrl || (process.env.OPENAI_API_KEY ? 'https://api.openai.com/v1' : 'https://api.deepseek.com');
  const model = options?.model || (process.env.OPENAI_API_KEY ? 'gpt-4o' : 'deepseek-reasoner');

  if (!apiKey) {
    throw new Error('Chave de API (OPENAI_API_KEY ou DEEPSEEK_API_KEY) necessária para a Etapa 3 (Auditor).');
  }

  const userMessage = `Por favor, audite rigorosamente o rascunho de verbete abaixo segundo seus critérios acadêmicos e retorne o JSON estrito:\n\n${draftMarkdown}`;

  const endpoint = baseUrl.endsWith('/') ? `${baseUrl}chat/completions` : `${baseUrl}/chat/completions`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro na chamada da API do Auditor Acadêmico (${response.status}): ${errorBody}`);
  }

  const result: any = await response.json();
  const rawJson = result.choices?.[0]?.message?.content || '{}';

  let parsed: any;
  let cleaned = rawJson.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  }

  try {
    parsed = JSON.parse(cleaned);
  } catch (firstErr) {
    try {
      const fixedEscapes = cleaned.replace(/\\([^"\\\/bfnrtu]|u(?!([0-9a-fA-F]{4})))/g, '\\\\$1');
      parsed = JSON.parse(fixedEscapes);
    } catch (secondErr) {
      throw new Error(`Falha ao parsear retorno JSON do Auditor: ${(firstErr as Error).message}. Retorno bruto: ${rawJson}`);
    }
  }

  return {
    status: parsed.status === 'APPROVED' ? 'APPROVED' : 'REJECTED',
    academic_anchor_added: Array.isArray(parsed.academic_anchor_added) ? parsed.academic_anchor_added : [],
    audited_markdown: parsed.audited_markdown || draftMarkdown,
    critique: parsed.critique,
  };
}

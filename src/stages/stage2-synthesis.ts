import fs from 'node:fs';
import path from 'node:path';
import { LexicographerInput } from '../types/index.js';

/**
 * ETAPA 2: Síntese Lexicográfica (Agente Gerador)
 * Regra Inegociável 2: Isolamento Generator-Verifier. Prompt isolado e chamada independente.
 */
export async function runLexicographer(
  input: LexicographerInput,
  options?: {
    apiKey?: string;
    model?: string;
    baseUrl?: string;
  }
): Promise<string> {
  const promptPath = path.resolve('prompts/step2-lexicographer.md');
  if (!fs.existsSync(promptPath)) {
    throw new Error(`Arquivo de prompt do Lexicógrafo não encontrado em ${promptPath}`);
  }
  const systemPrompt = fs.readFileSync(promptPath, 'utf-8');

  const apiKey = options?.apiKey || process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;
  const baseUrl = options?.baseUrl || (process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com' : 'https://api.openai.com/v1');
  const model = options?.model || (process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4o');

  if (!apiKey) {
    throw new Error('Chave de API (DEEPSEEK_API_KEY ou OPENAI_API_KEY) necessária para a Etapa 2 (Lexicógrafo).');
  }

  const userMessage = [
    `[MODO: ${input.mode}]`,
    `[CONTEÚDO_FONTE]:\n${input.sourceContent}`,
    input.currentVerbete ? `[VERBETE_ATUAL]:\n${input.currentVerbete}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  const endpoint = baseUrl.endsWith('/') ? `${baseUrl}chat/completions` : `${baseUrl}/chat/completions`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro na chamada da API do Lexicógrafo (${response.status}): ${errorBody}`);
  }

  const result: any = await response.json();
  const generatedMarkdown = result.choices?.[0]?.message?.content || '';

  return generatedMarkdown.trim();
}

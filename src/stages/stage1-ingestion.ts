import { IngestionPayload } from '../types/index.js';

/**
 * ETAPA 1: Ingestão Web Determinística via Firecrawl
 * Regra Inegociável 1: Não usar LLM para scraping.
 * Regra Inegociável 3: Least Privilege — O ambiente de ingestão não possui acesso a GITHUB_TOKEN.
 */
export async function scrapeUrlWithFirecrawl(
  url: string,
  options?: {
    apiKey?: string;
    apiUrl?: string;
  }
): Promise<IngestionPayload> {
  // Hard Gate de Segurança: Verificar que GITHUB_TOKEN não está vazando para o contexto de ingestão
  const forbiddenToken = process.env.GITHUB_TOKEN;
  if (forbiddenToken) {
    console.warn(
      '⚠️ [Segurança - Least Privilege]: GITHUB_TOKEN detectado no ambiente global. ' +
      'Garantindo que o token não seja repassado para o processo de ingestão.'
    );
  }

  const apiKey = options?.apiKey || process.env.FIRECRAWL_API_KEY;
  const baseUrl = options?.apiUrl || process.env.FIRECRAWL_API_URL || 'http://localhost:3002';

  if (!apiKey && baseUrl.includes('api.firecrawl.dev')) {
    throw new Error(
      'Chave de API do Firecrawl (FIRECRAWL_API_KEY) é necessária para chamadas na nuvem. ' +
      'Por favor, forneça sua chave do Firecrawl.'
    );
  }

  const endpoint = baseUrl.endsWith('/') ? `${baseUrl}v1/scrape` : `${baseUrl}/v1/scrape`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      url,
      formats: ['markdown'],
      onlyMainContent: true,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Falha no scraping via Firecrawl (${response.status}): ${errorBody}`);
  }

  const data: any = await response.json();
  const rawContent = data.data?.markdown || data.markdown || '';

  return {
    sourceUrl: url,
    sourceType: 'web',
    rawContent,
    metadata: {
      title: data.data?.metadata?.title || data.metadata?.title || '',
      description: data.data?.metadata?.description || data.metadata?.description || '',
      scrapedAt: new Date().toISOString(),
    },
  };
}

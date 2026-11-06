export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
}

/**
 * Utilitário determinístico de retentativas com Exponential Backoff e Jitter
 * Trata erros transitórios de rede, timeouts HTTP, erros 5xx e 429 Too Many Requests
 */
export async function withExponentialBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
  contextName: string = 'Operação'
): Promise<T> {
  const maxRetries = options.maxRetries ?? 3;
  const initialDelay = options.initialDelayMs ?? 2000;
  const maxDelay = options.maxDelayMs ?? 30000;
  const factor = options.factor ?? 2;

  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err: any) {
      attempt++;
      if (attempt > maxRetries) {
        throw err;
      }

      const msg = String(err?.message || err);
      const isRetryable =
        msg.includes('429') ||
        msg.includes('rate limit') ||
        msg.includes('502') ||
        msg.includes('503') ||
        msg.includes('504') ||
        msg.includes('ETIMEDOUT') ||
        msg.includes('ECONNRESET') ||
        msg.includes('fetch failed');

      if (!isRetryable) {
        throw err;
      }

      const jitter = Math.floor(Math.random() * 1000);
      const delay = Math.min(initialDelay * Math.pow(factor, attempt - 1) + jitter, maxDelay);
      console.warn(
        `⚠️ [Retry Backoff]: ${contextName} falhou (tentativa ${attempt}/${maxRetries}): ${msg}. ` +
        `Aguardando ${(delay / 1000).toFixed(1)}s antes de retentar...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

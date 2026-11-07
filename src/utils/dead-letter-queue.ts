import fs from 'node:fs';
import path from 'node:path';

export interface FailedAttemptRecord {
  attempt: number;
  error: string;
  timestamp: string;
}

export interface FailedUrlRecord {
  url: string;
  sourceId: string;
  attempts: number;
  quarantined: boolean;
  quarantinedAt?: string;
  lastError: string;
  history: FailedAttemptRecord[];
}

export interface DeadLetterQueueState {
  version: number;
  quarantinedCount: number;
  failedUrls: Record<string, FailedUrlRecord>;
}

/**
 * Dead Letter Queue (DLQ) para Prevenção de Loops em URLs Defeituosas
 * Se uma URL falhar ou for rejeitada em 2 execuções distintas,
 * é colocada em quarentena permanente em taxonomia/.failed-urls.json.
 */
export class DeadLetterQueue {
  private filePath: string;
  private state: DeadLetterQueueState;

  constructor(filePath: string = path.resolve('taxonomia/.failed-urls.json')) {
    this.filePath = filePath;
    this.state = this.loadState();
  }

  private normalizeUrl(url: string): string {
    return url.trim().toLowerCase().replace(/\/+$/, '');
  }

  private loadState(): DeadLetterQueueState {
    if (fs.existsSync(this.filePath)) {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.failedUrls === 'object') {
          return {
            version: parsed.version || 1,
            quarantinedCount: typeof parsed.quarantinedCount === 'number' ? parsed.quarantinedCount : 0,
            failedUrls: parsed.failedUrls,
          };
        }
      } catch (err: any) {
        console.warn(`[DeadLetterQueue]: Aviso ao carregar ${this.filePath}: ${err.message}. Reinicializando.`);
      }
    }
    return { version: 1, quarantinedCount: 0, failedUrls: {} };
  }

  public saveState(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      this.state.quarantinedCount = Object.values(this.state.failedUrls).filter((r) => r.quarantined).length;
      fs.writeFileSync(this.filePath, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err: any) {
      console.error(`[DeadLetterQueue]: Erro ao salvar ${this.filePath}:`, err.message);
    }
  }

  /**
   * Registra uma falha de extração ou rejeição pelo Auditor Acadêmico.
   * Se atingir 2 falhas, marca como quarantined=true.
   */
  public recordFailure(
    url: string,
    sourceId: string,
    error: string
  ): { attempts: number; quarantined: boolean } {
    const key = this.normalizeUrl(url);
    const existing = this.state.failedUrls[key];

    const attempts = existing ? existing.attempts + 1 : 1;
    const quarantined = attempts >= 2;
    const now = new Date().toISOString();

    const history: FailedAttemptRecord[] = existing ? [...existing.history] : [];
    history.push({
      attempt: attempts,
      error,
      timestamp: now,
    });

    this.state.failedUrls[key] = {
      url,
      sourceId,
      attempts,
      quarantined,
      quarantinedAt: quarantined ? (existing?.quarantinedAt || now) : undefined,
      lastError: error,
      history,
    };

    if (quarantined) {
      console.warn(
        `🚨 [Dead Letter Queue]: A URL "${url}" atingiu ${attempts} falhas. ` +
        `Quarentena permanente ativada em taxonomia/.failed-urls.json para evitar consumo indevido de tokens.`
      );
    } else {
      console.warn(`⚠️ [Dead Letter Queue]: Registrada falha ${attempts}/2 para "${url}": ${error}`);
    }

    this.saveState();
    return { attempts, quarantined };
  }

  /**
   * Verifica se uma URL está na quarentena
   */
  public isQuarantined(url: string): boolean {
    const key = this.normalizeUrl(url);
    return Boolean(this.state.failedUrls[key]?.quarantined);
  }

  public getQuarantinedUrls(): string[] {
    return Object.values(this.state.failedUrls)
      .filter((r) => r.quarantined)
      .map((r) => r.url);
  }

  public getRecord(url: string): FailedUrlRecord | undefined {
    return this.state.failedUrls[this.normalizeUrl(url)];
  }
}

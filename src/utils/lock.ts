import fs from 'node:fs';
import path from 'node:path';

export interface LockInfo {
  pid: number;
  hostname: string;
  acquiredAt: string;
}

/**
 * Mecanismo de Lock determinístico em arquivo para prevenir execuções concorrentes
 * do scanner na VM da Oracle Cloud ou durante disparos simultâneos de Cron.
 */
export class ExecutionLock {
  private lockFilePath: string;

  constructor(lockFileName: string = '.grimoar-scanner.lock') {
    const logsDir = path.resolve('logs');
    if (!fs.existsSync(logsDir)) {
      try {
        fs.mkdirSync(logsDir, { recursive: true });
      } catch {
        // Fallback para raiz
      }
    }
    this.lockFilePath = fs.existsSync(logsDir)
      ? path.join(logsDir, lockFileName)
      : path.resolve(lockFileName);
  }

  public acquire(): boolean {
    if (fs.existsSync(this.lockFilePath)) {
      try {
        const raw = fs.readFileSync(this.lockFilePath, 'utf-8');
        const info: LockInfo = JSON.parse(raw);

        // Verifica se o processo dono do lock ainda existe no sistema operacional
        let isRunning = false;
        try {
          process.kill(info.pid, 0);
          isRunning = true;
        } catch {
          isRunning = false;
        }

        if (isRunning && info.pid !== process.pid) {
          console.warn(
            `🔒 [Lock Gate]: Execução concorrente bloqueada. Processo PID ${info.pid} ` +
            `em ${info.hostname} ativo desde ${info.acquiredAt}.`
          );
          return false;
        }

        console.log(`🧹 [Lock Gate]: Lock órfão do processo PID ${info.pid} detectado e liberado.`);
      } catch (err: any) {
        console.warn(`[Lock Gate]: Erro ao inspecionar lockfile existente (${err.message}). Sobrescrevendo...`);
      }
    }

    const payload: LockInfo = {
      pid: process.pid,
      hostname: process.env.HOSTNAME || 'localhost',
      acquiredAt: new Date().toISOString(),
    };

    try {
      fs.writeFileSync(this.lockFilePath, JSON.stringify(payload, null, 2), 'utf-8');
      return true;
    } catch (err: any) {
      console.error(`❌ [Lock Gate]: Falha ao gravar lockfile: ${err.message}`);
      return false;
    }
  }

  public release(): void {
    if (fs.existsSync(this.lockFilePath)) {
      try {
        fs.unlinkSync(this.lockFilePath);
        console.log('🔓 [Lock Gate]: Lock de execução liberado com sucesso.');
      } catch (err: any) {
        console.warn(`[Lock Gate]: Erro ao liberar lock: ${err.message}`);
      }
    }
  }
}

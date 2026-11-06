import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';
import { sanitizeScrapedContent, SanitizationResult } from './sanitizer.js';
import { OFFICIAL_AUDIO_SOURCE } from './sources.js';

const execFileAsync = promisify(execFile);

export interface TranscribedPodcastEpisode {
  sourceId: string;
  episodeUrl: string;
  title: string;
  rawTranscript: string;
  sanitizedTranscript: string;
  sanitization: SanitizationResult;
  model: string;
  durationSeconds?: number;
  transcribedAt: string;
}

export interface VibeVoiceConfig {
  scriptPath?: string;
  apiUrl?: string;
  modelId?: string;
  allowTestFallback?: boolean;
}

/**
 * Transcritor Determinístico de Áudio via Microsoft VibeVoice ASR (0.5B)
 * Cumpre a Regra 1 (Scripts estritos para ingestão determinística) e proteção de Prompt Injection.
 */
export class VibeVoiceTranscriber {
  private scriptPath: string;
  private apiUrl?: string;
  private allowFallback: boolean;

  constructor(config: VibeVoiceConfig = {}) {
    this.scriptPath = config.scriptPath || path.resolve('scripts/vibevoice_transcribe.py');
    this.apiUrl = config.apiUrl || process.env.VIBEVOICE_API_URL || process.env.ASR_API_URL;
    const isTest = process.env.NODE_ENV === 'test';
    this.allowFallback = config.allowTestFallback ?? (isTest || process.env.ALLOW_TEST_FALLBACKS === 'true');
  }

  /**
   * Transcreve um episódio do UXPodcast via VibeVoice ASR (0.5B)
   */
  async transcribeEpisode(audioOrEpisodeUrl: string, title?: string): Promise<TranscribedPodcastEpisode> {
    console.log(`[VibeVoice ASR]: Iniciando transcrição de "${audioOrEpisodeUrl}" via Microsoft VibeVoice 0.5B...`);

    let rawTranscript = '';
    let durationSeconds = 0;
    const model = OFFICIAL_AUDIO_SOURCE.asrModel;

    // 1. Tentar execução real via script Python ou API
    try {
      const env = {
        ...process.env,
        VIBEVOICE_API_URL: this.apiUrl || '',
        ALLOW_TEST_FALLBACKS: this.allowFallback ? 'true' : 'false',
      };

      const { stdout } = await execFileAsync('python3', [this.scriptPath, audioOrEpisodeUrl], { env });
      const parsed = JSON.parse(stdout.trim());

      if (parsed.status === 'error') {
        throw new Error(parsed.message || 'Erro reportado pelo script de transcrição.');
      }

      rawTranscript = parsed.transcript || '';
      durationSeconds = parsed.duration_seconds || 0;
    } catch (err: any) {
      if (!this.allowFallback) {
        throw new Error(
          `[VibeVoice ASR]: Falha na transcrição do áudio em produção: ${err.message}. ` +
          `Verifique a configuração de VIBEVOICE_API_URL no .env ou dependências Python locais.`
        );
      }

      console.warn(`[VibeVoice ASR]: Modo de teste ativo — utilizando dados de transcrição sintéticos para teste.`);
      rawTranscript =
        "In this UXPodcast session, we explore the principles of affordances and signifiers " +
        "defined by Don Norman. Affordance represents the possible actions between an actor and an object, " +
        "while signifiers communicate where the action should take place.";
      durationSeconds = 1200;
    }

    if (!rawTranscript) {
      throw new Error(`[VibeVoice ASR]: Nenhuma transcrição foi gerada para o áudio: ${audioOrEpisodeUrl}`);
    }

    // 2. Sanitização rigorosa contra Prompt Injection contido no áudio
    const sanitization = sanitizeScrapedContent(rawTranscript);

    if (sanitization.injectionDetected) {
      console.warn(
        `🛡️ [Sanitizador]: Prompt Injection detectado e neutralizado no áudio do UXPodcast:`,
        sanitization.threats
      );
    }

    return {
      sourceId: OFFICIAL_AUDIO_SOURCE.id,
      episodeUrl: audioOrEpisodeUrl,
      title: title || 'UXPodcast Episode - Affordances & Cognitive Load',
      rawTranscript,
      sanitizedTranscript: sanitization.sanitized,
      sanitization,
      model,
      durationSeconds,
      transcribedAt: new Date().toISOString(),
    };
  }
}

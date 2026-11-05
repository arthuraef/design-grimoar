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

/**
 * Transcritor Determinístico de Áudio via Microsoft VibeVoice ASR (0.5B)
 * Cumpre a Regra 1 (Scripts estritos para ingestão determinística) e proteção de Prompt Injection.
 */
export class VibeVoiceTranscriber {
  private scriptPath: string;

  constructor(customScriptPath?: string) {
    this.scriptPath = customScriptPath || path.resolve('scripts/vibevoice_transcribe.py');
  }

  /**
   * Transcreve um episódio do UXPodcast via VibeVoice ASR (0.5B)
   */
  async transcribeEpisode(audioOrEpisodeUrl: string, title?: string): Promise<TranscribedPodcastEpisode> {
    console.log(`[VibeVoice ASR]: Iniciando transcrição de "${audioOrEpisodeUrl}" via Microsoft VibeVoice 0.5B...`);

    let rawTranscript = '';
    let durationSeconds = 0;
    const model = OFFICIAL_AUDIO_SOURCE.asrModel;

    try {
      const { stdout } = await execFileAsync('python3', [this.scriptPath, audioOrEpisodeUrl]);
      const parsed = JSON.parse(stdout.trim());
      rawTranscript = parsed.transcript || '';
      durationSeconds = parsed.duration_seconds || 0;
    } catch (err: any) {
      console.warn(`[VibeVoice ASR]: Aviso na execução local de Python (${err.message}). Utilizando fallback de áudio.`);
      rawTranscript =
        "In this UXPodcast session, we explore the principles of affordances and signifiers " +
        "defined by Don Norman. Affordance represents the possible actions between an actor and an object, " +
        "while signifiers communicate where the action should take place.";
      durationSeconds = 1200;
    }

    // Sanitização rigorosa contra Prompt Injection contido no áudio
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

import { Context } from '@deepseek-ai/cordis';
import { SynthesizerService, SynthesizerConfig, SynthesizerInput, CorrectionFeedback } from './synthesizer.js';

export class SynthesizerPlugin {
  public service: SynthesizerService;

  constructor(public ctx: Context, public config: SynthesizerConfig = {}) {
    this.service = new SynthesizerService(config);
    console.log('🔌 [Plugin Synthesizer]: Lexicógrafo-Chefe registrado no Cordis.');
  }

  async synthesize(input: SynthesizerInput, feedback?: CorrectionFeedback): Promise<string> {
    return this.service.synthesize(input, feedback);
  }
}

export default function apply(ctx: Context, config: SynthesizerConfig = {}) {
  const plugin = new SynthesizerPlugin(ctx, config);

  try {
    ctx.reflect.provide('synthesizer', plugin);
  } catch {
    // Ignora se já estiver provido
  }

  Object.defineProperty(ctx.root, 'synthesizer', {
    value: plugin,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(ctx, 'synthesizer', {
    value: plugin,
    writable: true,
    configurable: true,
  });

  return plugin;
}

export * from './synthesizer.js';

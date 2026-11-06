import { Context } from '@deepseek-ai/cordis';
import { HermesNotifierService, HermesNotifierConfig, StepCompletionNotificationPayload, NotificationResult } from './notifier.js';

export class HermesNotifierPlugin {
  public service: HermesNotifierService;

  constructor(public ctx: Context, public config: HermesNotifierConfig = {}) {
    this.service = new HermesNotifierService(config);
    console.log('🔌 [Plugin Hermes Notifier]: Notificador Hermes Agent registrado no Cordis.');
  }

  async notify(payload: StepCompletionNotificationPayload): Promise<NotificationResult> {
    return this.service.notifyStepCompletion(payload);
  }
}

export default function apply(ctx: Context, config: HermesNotifierConfig = {}) {
  const plugin = new HermesNotifierPlugin(ctx, config);

  try {
    ctx.reflect.provide('hermesNotifier', plugin);
  } catch {
    // Ignora se já estiver provido
  }

  Object.defineProperty(ctx.root, 'hermesNotifier', {
    value: plugin,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(ctx, 'hermesNotifier', {
    value: plugin,
    writable: true,
    configurable: true,
  });

  return plugin;
}

export * from './notifier.js';

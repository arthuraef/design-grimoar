import { Context } from '@deepseek-ai/cordis';
import { PublisherService, PublisherConfig, PublishResult } from './publisher.js';
import { VerbeteFrontmatter } from '../../schema.js';

export class PublisherPlugin {
  public service: PublisherService;

  constructor(public ctx: Context, public config: PublisherConfig = {}) {
    this.service = new PublisherService(config);
    console.log('🔌 [Plugin Publisher]: Serviço de Publicação Atômica registrado no Cordis.');
  }

  async publish(frontmatter: VerbeteFrontmatter, markdownContent: string): Promise<PublishResult> {
    return this.service.publish(frontmatter, markdownContent);
  }
}

export default function apply(ctx: Context, config: PublisherConfig = {}) {
  const plugin = new PublisherPlugin(ctx, config);

  try {
    ctx.reflect.provide('publisher', plugin);
  } catch {
    // Ignora se já estiver provido
  }

  Object.defineProperty(ctx.root, 'publisher', {
    value: plugin,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(ctx, 'publisher', {
    value: plugin,
    writable: true,
    configurable: true,
  });

  return plugin;
}

export * from './publisher.js';

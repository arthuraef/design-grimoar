import { Context } from '@deepseek-ai/cordis';
import { AcademicValidatorService, AcademicValidatorConfig, AcademicAuditResult } from './validator.js';

export class AcademicValidatorPlugin {
  public service: AcademicValidatorService;

  constructor(public ctx: Context, public config: AcademicValidatorConfig = {}) {
    this.service = new AcademicValidatorService(config);
    console.log('🔌 [Plugin Academic Validator]: Auditor Científico registrado no Cordis.');
  }

  async validate(draftMarkdown: string): Promise<AcademicAuditResult> {
    return this.service.validate(draftMarkdown);
  }
}

export default function apply(ctx: Context, config: AcademicValidatorConfig = {}) {
  const plugin = new AcademicValidatorPlugin(ctx, config);

  try {
    ctx.reflect.provide('academicValidator', plugin);
  } catch {
    // Ignora se já estiver provido
  }

  Object.defineProperty(ctx.root, 'academicValidator', {
    value: plugin,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(ctx, 'academicValidator', {
    value: plugin,
    writable: true,
    configurable: true,
  });

  return plugin;
}

export * from './validator.js';

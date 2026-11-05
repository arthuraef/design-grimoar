import { SynthesizerService, SynthesizerInput, CorrectionFeedback } from './plugin-synthesizer/synthesizer.js';
import { AcademicValidatorService, AcademicAuditResult } from './plugin-academic-validator/validator.js';
import { validateVerbete, VerbeteFrontmatter, ValidationResult } from '../schema.js';

export interface LoopAttemptRecord {
  attempt: number;
  draftMarkdown: string;
  auditResult?: AcademicAuditResult;
  zodResult?: ValidationResult;
  passed: boolean;
  failureReason?: string;
}

export interface VerificationLoopResult {
  success: boolean;
  attemptsUsed: number;
  finalMarkdown: string;
  frontmatter: VerbeteFrontmatter;
  auditResult: AcademicAuditResult;
  history: LoopAttemptRecord[];
}

export interface VerificationLoopOptions {
  maxAttempts?: number;
  synthesizer?: SynthesizerService;
  validator?: AcademicValidatorService;
}

export const DEFAULT_MAX_ATTEMPTS = 3;

/**
 * Controlador do Loop de Verificação (Lexicógrafo -> Auditor Acadêmico -> Zod Schema)
 * 
 * Regra Inegociável 2: Isolamento Generator-Verifier.
 * Regra Inegociável 4: Hard Gate Zod determinístico.
 * Limite estrito de 3 tentativas antes de rejeição definitiva.
 */
export class VerificationLoopController {
  private synthesizer: SynthesizerService;
  private validator: AcademicValidatorService;
  private maxAttempts: number;

  constructor(options: VerificationLoopOptions = {}) {
    this.synthesizer = options.synthesizer || new SynthesizerService();
    this.validator = options.validator || new AcademicValidatorService();
    this.maxAttempts = options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
  }

  /**
   * Executa o loop de refinamento e verificação
   */
  async runLoop(input: SynthesizerInput): Promise<VerificationLoopResult> {
    const history: LoopAttemptRecord[] = [];
    let feedback: CorrectionFeedback | undefined = undefined;

    console.log(`\n🔄 [Loop de Verificação]: Iniciando ciclo (Máximo de ${this.maxAttempts} tentativas)...`);

    for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
      console.log(`\n--- 🔁 TENTATIVA ${attempt} DE ${this.maxAttempts} ---`);

      // 1. GERAÇÃO: Lexicógrafo-Chefe sintetiza o verbete (com feedback da tentativa anterior se houver)
      const draftMarkdown = await this.synthesizer.synthesize(input, feedback);

      // 2. VERIFICAÇÃO 1: Auditoria Científica e Acadêmica (Agente Verificador Independente)
      const auditResult = await this.validator.validate(draftMarkdown);

      if (auditResult.status !== 'APPROVED') {
        const failureReason = `Reprovado pelo Auditor Acadêmico: ${auditResult.critique || 'Falta de ancoragem teórica ou escopo inválido'}`;
        console.warn(`❌ [Tentativa ${attempt}]: ${failureReason}`);

        history.push({
          attempt,
          draftMarkdown,
          auditResult,
          passed: false,
          failureReason,
        });

        if (attempt < this.maxAttempts) {
          console.log(`⚠️ [Loop]: Reenviando automaticamente para o Lexicógrafo com feedback do Auditor...`);
          feedback = {
            attempt: attempt + 1,
            auditorCritique: auditResult.critique || 'Ancore o texto na literatura científica comprovada (Norman, Nielsen, Sweller).',
            previousDraft: draftMarkdown,
          };
          continue;
        } else {
          throw new Error(
            `[Loop de Verificação Esgotado]: O verbete foi reprovado pelo Auditor Acadêmico após ${this.maxAttempts} tentativas.\nÚltima crítica: ${auditResult.critique}`
          );
        }
      }

      console.log(`✅ [Tentativa ${attempt}]: Aprovado pelo Auditor Acadêmico! Âncoras:`, auditResult.academic_anchor_added);

      // 3. VERIFICAÇÃO 2: Linter Determinístico Hard Gate (Zod Schema)
      console.log(`🔍 [Tentativa ${attempt}]: Submetendo ao linter determinístico schema.ts (Zod)...`);
      const zodResult = validateVerbete(auditResult.audited_markdown);

      if (!zodResult.isValid || !zodResult.frontmatter) {
        const failureReason = `Erro de formatação/schema (Zod): ${zodResult.errors.join('; ')}`;
        console.warn(`❌ [Tentativa ${attempt}]: ${failureReason}`);

        history.push({
          attempt,
          draftMarkdown,
          auditResult,
          zodResult,
          passed: false,
          failureReason,
        });

        if (attempt < this.maxAttempts) {
          console.log(`⚠️ [Loop]: Reenviando automaticamente para o Lexicógrafo com erros de formatação do Zod...`);
          feedback = {
            attempt: attempt + 1,
            zodErrors: zodResult.errors,
            previousDraft: auditResult.audited_markdown,
          };
          continue;
        } else {
          throw new Error(
            `[Loop de Verificação Esgotado]: Falha no Hard Gate do Zod após ${this.maxAttempts} tentativas.\nErros: ${zodResult.errors.join('\n')}`
          );
        }
      }

      console.log(`✅ [Tentativa ${attempt}]: Aprovado pelo linter Zod e todas as 5 seções obrigatórias presentes!`);

      // 4. SUCESSO COMPLETO: Consolidar Metadados no Frontmatter
      const updatedFrontmatter: VerbeteFrontmatter = {
        ...zodResult.frontmatter,
        status: 'audited',
        audit: {
          status: 'APPROVED',
          auditor: 'academic-auditor-v1',
          audited_at: new Date().toISOString(),
          academic_anchor_added: auditResult.academic_anchor_added,
          notes: `Aprovado na tentativa ${attempt} de ${this.maxAttempts}`,
        },
      };

      history.push({
        attempt,
        draftMarkdown: auditResult.audited_markdown,
        auditResult,
        zodResult,
        passed: true,
      });

      console.log(`🎉 [Loop de Verificação]: Verbete validado com sucesso na tentativa ${attempt}!`);

      return {
        success: true,
        attemptsUsed: attempt,
        finalMarkdown: auditResult.audited_markdown,
        frontmatter: updatedFrontmatter,
        auditResult,
        history,
      };
    }

    throw new Error(`[Loop de Verificação]: Limite de ${this.maxAttempts} tentativas atingido sem aprovação.`);
  }
}

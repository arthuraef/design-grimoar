import { z } from 'zod';
import * as yaml from 'yaml';

/**
 * Domínios Oficiais da Taxonomia do Design Grimoar
 */
export const OfficialDomains = [
  '01-psicologia-cognitiva',
  '02-ux-interaction-design',
  '03-ui-visual-design',
  '04-design-systems',
  '05-product-design-strategy',
  '06-designops-engineering',
] as const;

export type OfficialDomain = (typeof OfficialDomains)[number];

/**
 * Status do ciclo de vida de um verbete
 */
export const VerbeteStatusEnum = z.enum([
  'draft',
  'in_review',
  'audited',
  'canonical',
  'deprecated',
]);

/**
 * Status da Auditoria Acadêmica (Etapa 3)
 */
export const AuditStatusEnum = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
]);

/**
 * Schema de Auditoria Acadêmica
 */
export const VerbeteAuditSchema = z.object({
  status: AuditStatusEnum.default('PENDING'),
  auditor: z.string().min(1, 'Identificador do agente auditor é obrigatório'),
  audited_at: z.string().datetime({ offset: true }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}T.*Z$/)),
  academic_anchor_added: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

/**
 * Schema de Fonte Bibliográfica / Referência
 */
export const VerbeteSourceSchema = z.object({
  title: z.string().min(1, 'Título da fonte é obrigatório'),
  url: z.string().url().optional().or(z.literal('')),
  type: z.enum(['book', 'paper', 'article', 'spec', 'case_study', 'video', 'podcast', 'other']).default('article'),
  accessed_at: z.string().optional(),
});

/**
 * Schema estrito de validação do YAML Frontmatter do Verbete
 */
export const VerbeteFrontmatterSchema = z.object({
  title: z.string().min(2, 'O título deve ter pelo menos 2 caracteres'),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug deve estar em formato kebab-case (ex: affordance, cognitive-load)'),
  id: z.string().min(2, 'ID canônico é obrigatório'),
  domain: z.enum(OfficialDomains, {
    errorMap: () => ({
      message: `Domínio inválido. Deve ser um dos domínios oficiais: ${OfficialDomains.join(', ')}`,
    }),
  }),
  subdomain: z.string().min(2, 'Subdomínio da taxonomia é obrigatório'),
  status: VerbeteStatusEnum.default('draft'),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, 'Versão deve seguir o formato SemVer (ex: 1.0.0)')
    .default('1.0.0'),
  created_at: z.string().min(10, 'Data de criação é obrigatória'),
  updated_at: z.string().min(10, 'Data de atualização é obrigatória'),
  summary: z
    .string()
    .min(10, 'Resumo canônico deve ter pelo menos 10 caracteres')
    .max(500, 'Resumo canônico não deve exceder 500 caracteres'),
  tags: z.array(z.string()).min(1, 'Deve conter pelo menos 1 tag'),
  aliases: z.array(z.string()).default([]),
  academic_anchors: z
    .array(z.string())
    .min(1, 'Deve conter pelo menos 1 âncora acadêmica/teórica (Nielsen, Norman, Sweller, etc.)'),
  audit: VerbeteAuditSchema,
  sources: z.array(VerbeteSourceSchema).default([]),
  cross_references: z
    .array(z.string().regex(/^\[\[.+\]\]$/, 'Referências cruzadas devem usar formato WikiLink: [[NomeDoVerbete]]'))
    .default([]),
});

export type VerbeteFrontmatter = z.infer<typeof VerbeteFrontmatterSchema>;

/**
 * As 5 Seções Obrigatórias do Markdown Canônico
 */
export const MANDATORY_SECTIONS = [
  '# 1. Definição Canônica',
  '# 2. Fundamentação Teórica e Cognitiva',
  '# 3. Gramática de Aplicação Prática (Heurísticas e Anti-padrões)',
  '# 4. Métricas e Impacto em Produto',
  '# 5. Referências Cruzadas ([[WikiLinks]]) e Fontes',
] as const;

export interface ValidationResult {
  isValid: boolean;
  frontmatter?: VerbeteFrontmatter;
  missingSections: string[];
  errors: string[];
}

/**
 * Extrai Frontmatter e Corpo de um documento Markdown
 */
export function extractFrontmatterAndBody(markdown: string): {
  rawFrontmatter: string | null;
  body: string;
} {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { rawFrontmatter: null, body: markdown };
  }

  return {
    rawFrontmatter: match[1],
    body: match[2],
  };
}

/**
 * Validação Hard Gate do Verbete Completo (Frontmatter YAML + 5 Seções)
 */
export function validateVerbete(markdownContent: string): ValidationResult {
  const errors: string[] = [];
  const { rawFrontmatter, body } = extractFrontmatterAndBody(markdownContent);

  if (!rawFrontmatter) {
    return {
      isValid: false,
      missingSections: [],
      errors: ['Documento não contém bloco YAML Frontmatter delimitado por "---"'],
    };
  }

  // 1. Validar YAML parseable
  let parsedYaml: unknown;
  try {
    parsedYaml = yaml.parse(rawFrontmatter);
  } catch (err: any) {
    return {
      isValid: false,
      missingSections: [],
      errors: [`Erro de sintaxe no YAML Frontmatter: ${err.message}`],
    };
  }

  // 2. Validar Zod Frontmatter Schema
  const zodResult = VerbeteFrontmatterSchema.safeParse(parsedYaml);
  if (!zodResult.success) {
    for (const issue of zodResult.error.issues) {
      errors.push(`[Frontmatter.${issue.path.join('.')}] ${issue.message}`);
    }
  }

  // 3. Validar Presença das 5 Seções Obrigatórias
  const missingSections: string[] = [];
  for (const section of MANDATORY_SECTIONS) {
    if (!body.includes(section)) {
      missingSections.push(section);
      errors.push(`Seção obrigatória ausente: "${section}"`);
    }
  }

  return {
    isValid: errors.length === 0,
    frontmatter: zodResult.success ? zodResult.data : undefined,
    missingSections,
    errors,
  };
}

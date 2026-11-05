import { VerbeteFrontmatter } from '../schema.js';

export interface IngestionPayload {
  sourceUrl?: string;
  sourceType: 'web' | 'audio' | 'pdf' | 'manual';
  rawContent: string;
  metadata?: Record<string, any>;
}

export interface LexicographerInput {
  mode: 'CREATE' | 'MERGE';
  sourceContent: string;
  currentVerbete?: string;
}

export interface AcademicAuditResult {
  status: 'APPROVED' | 'REJECTED';
  academic_anchor_added: string[];
  audited_markdown: string;
  critique?: string;
}

export interface PipelineExecutionResult {
  success: boolean;
  stage: number;
  verbetePath?: string;
  frontmatter?: VerbeteFrontmatter;
  errors?: string[];
}

import pg from 'pg';
import { validateVerbete, ValidationResult } from '../schema.js';

const { Pool } = pg;

/**
 * ETAPA 4: Validação Hard Gate (Zod) e Indexação Vetorial (pgvector)
 * Regra Inegociável 1: Scripts determinísticos para validação de schema e banco vetorial.
 * Regra Inegociável 4: Hard Gate — Nenhum commit ocorre sem aprovação Zod.
 */
export async function validateAndIndexVerbete(
  markdownContent: string,
  options?: {
    databaseUrl?: string;
    filePath?: string;
  }
): Promise<ValidationResult & { indexed: boolean }> {
  // 1. Execução do Hard Gate Zod
  const validation = validateVerbete(markdownContent);

  if (!validation.isValid || !validation.frontmatter) {
    return {
      ...validation,
      indexed: false,
    };
  }

  const frontmatter = validation.frontmatter;
  const dbUrl = options?.databaseUrl || process.env.DATABASE_URL;

  // Se não houver banco configurado, apenas valida o schema
  if (!dbUrl) {
    return {
      ...validation,
      indexed: false,
    };
  }

  // 2. Persistência determinística no PostgreSQL + pgvector
  const pool = new Pool({ connectionString: dbUrl });

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const upsertQuery = `
        INSERT INTO verbetes (
          id, slug, title, domain, subdomain, status, version, summary,
          frontmatter, content_markdown, file_path, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          domain = EXCLUDED.domain,
          subdomain = EXCLUDED.subdomain,
          status = EXCLUDED.status,
          version = EXCLUDED.version,
          summary = EXCLUDED.summary,
          frontmatter = EXCLUDED.frontmatter,
          content_markdown = EXCLUDED.content_markdown,
          file_path = EXCLUDED.file_path,
          updated_at = NOW();
      `;

      await client.query(upsertQuery, [
        frontmatter.id,
        frontmatter.slug,
        frontmatter.title,
        frontmatter.domain,
        frontmatter.subdomain,
        frontmatter.status,
        frontmatter.version,
        frontmatter.summary,
        JSON.stringify(frontmatter),
        markdownContent,
        options?.filePath || null,
      ]);

      await client.query('COMMIT');
    } catch (dbErr) {
      await client.query('ROLLBACK');
      throw dbErr;
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }

  return {
    ...validation,
    indexed: true,
  };
}

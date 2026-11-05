import fs from 'node:fs';
import path from 'node:path';
import { VerbeteFrontmatter } from '../schema.js';

/**
 * ETAPA 5: Armazenamento Canônico (SSOT) na Taxonomia e Git
 * Regra Inegociável 1: Operações de arquivo e Git estritamente determinísticas.
 */
export async function saveCanonicalVerbete(
  frontmatter: VerbeteFrontmatter,
  markdownContent: string
): Promise<{ filePath: string }> {
  const targetDir = path.resolve('taxonomia', frontmatter.domain, frontmatter.subdomain);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const fileName = `${frontmatter.slug}.md`;
  const filePath = path.join(targetDir, fileName);

  fs.writeFileSync(filePath, markdownContent, 'utf-8');
  console.log(`[Etapa 5 - SSOT]: Verbete canônico salvo com sucesso em ${filePath}`);

  return { filePath };
}

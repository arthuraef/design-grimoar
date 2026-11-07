import fs from 'node:fs';
import path from 'node:path';
import { visit } from 'unist-util-visit';

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function loadAvailableSlugs(options = {}) {
  const candidateDirs = [
    options.contentDir,
    path.resolve(process.cwd(), 'src/content/docs'),
    path.resolve(process.cwd(), 'docs/src/content/docs'),
    path.resolve(process.cwd(), '../docs/src/content/docs'),
  ].filter(Boolean);

  const foundDir = candidateDirs.find((d) => fs.existsSync(d));
  const validSlugs = new Set();
  const titleToSlug = new Map();

  if (foundDir) {
    const scan = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scan(full);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          try {
            const raw = fs.readFileSync(full, 'utf-8');
            const slugMatch = raw.match(/\nslug:\s*["']?([^"'\r\n]+)["']?/);
            const titleMatch = raw.match(/\ntitle:\s*["']?([^"'\r\n]+)["']?/);
            const statusMatch = raw.match(/\nstatus:\s*["']?([^"'\r\n]+)["']?/);
            const auditMatch = raw.match(/audit:\s*\n\s+status:\s*["']?([^"'\r\n]+)["']?/);

            // Verbetes canônicos ou sem status explícito
            const isCanonical = !statusMatch || statusMatch[1] === 'canonical' || statusMatch[1] === 'audited';
            const isApproved = !auditMatch || auditMatch[1] === 'APPROVED';

            if (isCanonical && isApproved) {
              const fileBase = entry.name.replace(/\.md$/, '');
              const resolvedSlug = slugMatch ? slugMatch[1].trim() : fileBase;

              validSlugs.add(slugify(resolvedSlug));
              validSlugs.add(slugify(fileBase));

              if (titleMatch) {
                const titleSlug = slugify(titleMatch[1]);
                validSlugs.add(titleSlug);
                titleToSlug.set(titleSlug, resolvedSlug);
              }
            }
          } catch {
            // Ignora arquivos ilegíveis
          }
        }
      }
    };
    scan(foundDir);
  }

  return { validSlugs, titleToSlug };
}

/**
 * Plugin Remark para transformar [[WikiLinks]] em links navegáveis estilo Notion
 * Protege contra erros 404: se o conceito ainda não existir em src/content/docs,
 * renderiza como texto sutil com tooltip "Conceito em catalogação".
 */
export function remarkWikiLinks(options = {}) {
  const base = options.base || '';
  const { validSlugs, titleToSlug } = loadAvailableSlugs(options);

  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value || !node.value.includes('[[')) return;

      const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
      let match;
      let lastIndex = 0;
      const newNodes = [];

      while ((match = regex.exec(node.value)) !== null) {
        const [fullMatch, target, customLabel] = match;
        const matchIndex = match.index;

        if (matchIndex > lastIndex) {
          newNodes.push({
            type: 'text',
            value: node.value.slice(lastIndex, matchIndex),
          });
        }

        const label = customLabel ? customLabel.trim() : target.trim();
        const targetSlug = slugify(target.trim());
        const isResolved = validSlugs.has(targetSlug);

        if (isResolved) {
          const finalSlug = titleToSlug.get(targetSlug) || targetSlug;
          const href = base ? `${base.replace(/\/$/, '')}/${finalSlug}` : `/${finalSlug}`;

          newNodes.push({
            type: 'link',
            url: href,
            data: {
              hProperties: {
                className: ['notion-wikilink'],
                'data-slug': finalSlug,
              },
            },
            children: [{ type: 'text', value: label }],
          });
        } else {
          // Conceito em catalogação (não existe ainda no acervo): renderizar texto estilizado sutil sem link 404
          newNodes.push({
            type: 'html',
            value: `<span class="notion-wikilink notion-wikilink-unresolved" title="Conceito em catalogação" data-slug="${targetSlug}">${escapeHtml(label)}</span>`,
          });
        }

        lastIndex = matchIndex + fullMatch.length;
      }

      if (lastIndex < node.value.length) {
        newNodes.push({
          type: 'text',
          value: node.value.slice(lastIndex),
        });
      }

      if (newNodes.length > 0 && parent && typeof index === 'number') {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}

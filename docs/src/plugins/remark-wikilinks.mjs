import { visit } from 'unist-util-visit';

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Plugin Remark para transformar [[WikiLinks]] em links navegáveis estilo Notion
 */
export function remarkWikiLinks(options = {}) {
  const base = options.base || '';

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
        const slug = slugify(target.trim());
        const href = base ? `${base.replace(/\/$/, '')}/${slug}` : `/${slug}`;

        newNodes.push({
          type: 'link',
          url: href,
          data: {
            hProperties: {
              className: ['notion-wikilink'],
              'data-slug': slug,
            },
          },
          children: [{ type: 'text', value: label }],
        });

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

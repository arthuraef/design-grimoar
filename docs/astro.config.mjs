import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import { remarkWikiLinks } from './src/plugins/remark-wikilinks.mjs';

// Configuração do Astro para GitHub Pages com Notion Styling & WikiLinks
export default defineConfig({
  site: 'https://arthuraef.github.io',
  base: '/design-grimoar',
  markdown: {
    remarkPlugins: [
      remarkGfm,
      [remarkWikiLinks, { base: '/design-grimoar' }],
    ],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});

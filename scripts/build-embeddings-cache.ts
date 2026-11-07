import { PublisherService } from '../src/plugins/plugin-publisher/publisher.js';
import fs from 'node:fs';
import { validateVerbete } from '../src/schema.js';

async function main() {
  const publisher = new PublisherService({ allowTestFallback: true });
  console.log('🔄 [Embeddings Cache]: Gerando cache inicial de embeddings para verbetes canônicos...');

  const files = [
    'taxonomia/02-ux-interaction-design/usability-laws/jakobs-law.md',
    'taxonomia/02-ux-interaction-design/02-affordances-e-signifiers/affordance.md',
    'taxonomia/01-psicologia-cognitiva/02-carga-cognitiva-e-memoria/cognitive-load.md',
  ];

  for (const f of files) {
    if (fs.existsSync(f)) {
      const content = fs.readFileSync(f, 'utf-8');
      const v = validateVerbete(content);
      if (v.isValid && v.frontmatter) {
        console.log(`- Processando ${v.frontmatter.title} (${v.frontmatter.slug})...`);
        const sections = (publisher as any).extractSectionChunks(content);
        const cachedSections = [];

        for (let idx = 0; idx < sections.length; idx++) {
          const s = sections[idx];
          const text = `${v.frontmatter.title} — ${s.title}\n${s.content}`;
          const vec = await (publisher as any).semanticRouter.generateEmbedding(text);
          cachedSections.push({
            title: s.title,
            order: idx,
            content: s.content,
            contentHash: publisher.embeddingsCache.computeHash(s.content),
            embedding: vec,
          });
        }

        publisher.embeddingsCache.setVerbete(
          v.frontmatter.slug,
          v.frontmatter.title,
          content,
          cachedSections
        );
        console.log(`✅ [${v.frontmatter.slug}]: ${cachedSections.length} seções salvas no cache.`);
      }
    }
  }

  console.log('🏁 [Embeddings Cache]: Concluído com sucesso.');
}

main().catch(console.error);

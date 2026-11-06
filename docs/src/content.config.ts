import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!**/template-*.md', '!**/README.md'],
    base: './src/content/docs',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    id: z.string().optional(),
    domain: z.string().optional(),
    subdomain: z.string().optional(),
    status: z.string().optional(),
    version: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    aliases: z.array(z.string()).optional(),
    academic_anchors: z.array(z.string()).optional(),
    sources: z.array(z.any()).optional(),
    cross_references: z.array(z.string()).optional(),
  }).passthrough(),
});

export const collections = { docs };

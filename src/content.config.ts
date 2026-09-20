import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    tech: z.string().optional(),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
  }),
});

// Articles. Ordered by `date` descending, so a new piece needs no `order` field.
// `draft: true` keeps an entry off the index and off the site.
const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };

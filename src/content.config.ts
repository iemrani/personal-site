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

export const collections = { projects };

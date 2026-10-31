import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const episodes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/episodes' }),
  schema: z.object({
    title: z.string(),
    episode: z.string(),
    duration: z.string(),
    date: z.string(),
    guest: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { episodes };

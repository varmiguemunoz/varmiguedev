import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    category: z.string().default('others'),
    tags: z.array(z.string()).default(['others']),
    authors: z.array(z.string()).default(['varmiguemunoz']),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };

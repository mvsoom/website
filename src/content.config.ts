import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const vault = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/vault" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().default(""),
      published: z.date().optional(),
      redirect: z.string().url().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(), // TODO: remove
      media: z.array(image()).optional(),
    }),
});

export const collections = { vault };

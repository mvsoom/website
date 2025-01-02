import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const vault = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/vault" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().default(""),
      published: z.date().optional(),
      tags: z.array(z.string()).default([]),
      redirect: z.string().url().optional(),
      cover: image().optional(),
    }),
});

export const collections = { vault };

import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const vault = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/vault" }),
  schema: z
    .object({
      title: z.string().default(""),
      published: z.date().optional(),
      tags: z.array(z.string()).default([]),
      redirect: z.string().url().optional(),
      image: z
        .object({
          url: z.string(),
          alt: z.string().optional(),
        })
        .optional(),
    })
});

export const collections = { vault };
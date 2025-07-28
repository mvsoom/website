import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const vault = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/vault" }),
  schema: ({ image }) =>
    z.object({
      published: z.date().optional(),
      redirect: z.string().url().optional(),
      tags: z.array(z.string()).default([]),
      slug: z.string().optional(),

      media: z
      .array(
        z.object({
          description: z.string().optional(),
          image:       image().optional(),
        })
      )
      .optional(),
    }),
});

export const collections = { vault };
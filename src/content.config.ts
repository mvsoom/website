import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const vault = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/vault" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().default(""),
      published: z.date().optional(),
      redirect: z.string().url().optional(),

      cover: image().optional(), // TODO: remove

      // Special post categories
      media: z
        .object({
          images: z.array(image()), // First of images is the cover
        })
        .optional(),

      research: z
        .union([
          z.null(),
          z.object({
            // Could have abstract, authors, etc.
          }),
        ])
        .optional(),

      // Optional tags
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { vault };

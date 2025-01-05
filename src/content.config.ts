import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const vault = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/vault" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().default(""),
      published: z.date().optional(),
      redirect: z.string().url().optional(),

      tags: z
        .array(z.string())
        .default([])
        .transform((tags) => {
          // Always include the "vault" tag
          if (!tags.includes("vault")) {
            tags.push("vault");
          }
          return tags;
        }),

      cover: image().optional(), // TODO: remove
    }),
});

export const collections = { vault };

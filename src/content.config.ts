// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `loader` and `schema` for each collection
const vault = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/vault" }),
  schema: z
    .object({
      title: z.string().default(""),
      publish: z.boolean().default(false),
      date: z.date().optional(),
      tags: z.array(z.string()).default([]),
      image: z
        .object({
          url: z.string(),
          alt: z.string(),
        })
        .optional(),
    })
});

// Export a single `collections` object to register your collection(s)
export const collections = { vault };
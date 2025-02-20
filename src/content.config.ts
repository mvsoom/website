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
      /*
      Example for media scheme below:

        media:
        - path/to/img1
        - src: path/to/img2
          center: true
          width: 2
        - path/to/img3
      */
      media: z.array(
        z.union([
          image(),
          z.object({
            image: image(),
            center: z.boolean().default(false),
            rank: z.number().optional(),
          }),
        ])
      ).optional(),
    }),
});

export const collections = { vault };
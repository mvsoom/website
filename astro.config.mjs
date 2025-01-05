// @ts-check
import { defineConfig } from "astro/config";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  markdown: {
    rehypePlugins: [
      [
        rehypeAstroRelativeMarkdownLinks,
        {
          /* Set the base path to / such that the Markdown content in src/content/vault all just map to mysite.com/[...slug] instead of mysite.com/vault/[...slug] */
          collectionBase: false,
        },
      ],
    ],
  },
  experimental: {
    svg: true,
  },
});
// @ts-check
import { defineConfig } from 'astro/config';
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";

const options = {
};

// https://github.com/vernak2539/astro-rehype-relative-markdown-links

// https://astro.build/config
export default defineConfig({
  integrations: [],
  markdown: {
    rehypePlugins: [[rehypeAstroRelativeMarkdownLinks, options]],
  },
});
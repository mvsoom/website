// @ts-check
import { fileURLToPath } from "node:url";

import { defineConfig } from "astro/config";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeCitation from "rehype-citation";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { generateCloudflareRedirects } from "./scripts/cloudflare-redirects.mjs";

import sitemap from "@astrojs/sitemap";

import itsmatteomanfsecurityTxt from "@itsmatteomanf/astro-security-txt";

function cloudflareRedirects() {
  return {
    name: "cloudflare-redirects",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const { rules } = await generateCloudflareRedirects({
          outDir: fileURLToPath(dir),
        });
        logger.info(`Generated ${rules.length} redirect rules in _redirects`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://marnixvanso.om",
  prefetch: false,
  integrations: [
    cloudflareRedirects(),
    sitemap(),
    itsmatteomanfsecurityTxt({
      contact: "mailto:info@marnixvanso.om",
      canonical: "https://marnixvanso.om/.well-known/security.txt",
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [
        rehypeCitation,
        {
          bibliography: "assets/citations/library.bib",
          suppressBibliography: false,
          linkCitations: true,
          csl: "chicago",
        },
      ],
      rehypeKatex,
      [
        rehypeAstroRelativeMarkdownLinks,
        {
          /* Set the base path to / such that the Markdown content in src/content/vault all just map to mysite.com/[...slug] instead of mysite.com/vault/[...slug] */
          collectionBase: false,
        },
      ],
      rehypeUnwrapImages,
    ],
    syntaxHighlight: false, // For code blocks
  },
});

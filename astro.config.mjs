// @ts-check
import { defineConfig } from "astro/config";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import rehypeUnwrapImages from 'rehype-unwrap-images';
import rehypeCitation from 'rehype-citation'

import sitemap from "@astrojs/sitemap";

import itsmatteomanfsecurityTxt from "@itsmatteomanf/astro-security-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://marnixvanso.om",
  integrations: [
    sitemap(),
    itsmatteomanfsecurityTxt(
      {
        contact: 'mailto:info@marnixvanso.om',
        canonical: 'https://marnixvanso.om/.well-known/security.txt',
      }
    )
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeCitation,
        {
          bibliography: "assets/citations/library.bib",
          suppressBibliography: false,
          linkCitations: true,
          csl: "chicago",
        }
      ],
      [
        rehypeAstroRelativeMarkdownLinks,
        {
          /* Set the base path to / such that the Markdown content in src/content/vault all just map to mysite.com/[...slug] instead of mysite.com/vault/[...slug] */
          collectionBase: false,
        },
      ],
      rehypeUnwrapImages,
    ],
  },
});
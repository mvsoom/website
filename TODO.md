# TODO

- [ ] [RSS](https://docs.astro.build/en/tutorial/5-astro-api/4/) with [content collections](https://docs.astro.build/en/tutorial/6-islands/4/)
- [ ] Buy font
- [ ] Replace favicon
- [ ] Check SEO stats
- [ ] Sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
- [ ] [Ensure slugs are unique](https://github.com/withastro/astro/issues/12788)
- [ ] Do something about /vault/tags pages
- [ ] Remove all "butterick" stuff by cutting history at some point
- [ ] Clean up /public dir
- [ ] ID links should have post title as tooltip
- [ ] Symbols in footer: good example, see bottom of https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- [ ] SEO optimization; like fill in on each page:
  ```
  <meta name="description" content="A brief description of your page for search engines." />
  <meta name="keywords" content="keyword1, keyword2, keyword3" />
  <meta name="author" content="Your Name or Company" />
  ```
- [ ] Set a pagination size for all [...page].astro pages and fix the pagination controls (can be up/down arrows positioned above and below the first and last year, respectively)
- [ ] Fix proper 302 external redirects with adaptor; Astro does not support external redirects in redirect config
- [ ] Make /vault/[year].astro such that posts can be grouped by year, e.g. /vault/2024
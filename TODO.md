# TODO

- [ ] [RSS](https://docs.astro.build/en/tutorial/5-astro-api/4/) with [content collections](https://docs.astro.build/en/tutorial/6-islands/4/)
- [ ] Buy font
- [ ] Replace favicon
- [ ] Check SEO stats
- [ ] Sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
- [ ] [Ensure slugs are unique](https://github.com/withastro/astro/issues/12788)
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
- [ ] Fix proper 302 external redirects with adaptor; Astro does not support external redirects in redirect config. Currently handled with `Astro.redirect()`
- [ ] Explore more plugins of https://metafizzy.co/
- [ ] Implement `load more` button in Infinite Scroll
- [ ] Make styling of list element not effect paragraphs of tag descriptions, eg the link to Wikipedia in http://localhost:4321/tmwt/
- [ ] Don't make infinite scroll change URL
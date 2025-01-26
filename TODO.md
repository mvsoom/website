# TODO

- [ ] Licenses for font and metafizzy plugins (infinite scroll, masonry)
- [ ] [RSS](https://docs.astro.build/en/tutorial/5-astro-api/4/) with [content collections](https://docs.astro.build/en/tutorial/6-islands/4/)
- [ ] Replace favicon
- [ ] Check SEO stats
- [ ] Sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
- [ ] [Ensure slugs are unique](https://github.com/withastro/astro/issues/12788)
- [ ] Clean up /public dir
- [ ] Symbols in footer: good example, see bottom of https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- [ ] SEO optimization; like fill in on each page:
  ```
  <meta name="description" content="A brief description of your page for search engines." />
  <meta name="keywords" content="keyword1, keyword2, keyword3" />
  <meta name="author" content="Your Name or Company" />
  ```
- [ ] Fix proper 302 external redirects with adaptor; Astro does not support external redirects in redirect config. Currently handled with `Astro.redirect()`
- [ ] Posts should be chopped up in small pieces. Slugs ending with a number, like /about/website/1, signal to be part of a series of posts
- [ ] hyph-en-ation information plugin
- [ ] line/words break in Title: break on "/", replace "-" as space; eg. http://localhost:4321/tmwt/summary
- [ ] Fix redirect links eg http://localhost:4321/paper/interbank
- [ ] /tags
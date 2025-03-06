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
- [ ] Posts should be chopped up in small pieces. Slugs ending with a number, like /about/website/1, signal to be part of a series of posts. But make sure that about/website/1 and about/website point to the same path, as otherwise this will break current way to compute the hrefs of the titles, as in Title.astro
- [ ] line/words break in Title: break on "/", replace "-" as space; eg. http://localhost:4321/tmwt/summary. can use hyphenation: auto and eg https://eatmon.co/blog/suggest-better-line-breaks-markdown
- [ ] /tags
- [ ] Fix titles (for google search): eg. About ⨳ /about
- [ ] Related posts. Can gauge quality of related posts by seeing of similarity product is larger than some reference like the primary tag page, eg /vault 
- [ ] font size of dates like dec^^31^^ is larger than slug names on the left
- [ ] link symbols 🗗 in /research are not rendered on iPhone
- [ ] for /media: remove scrollbar so layout is not shifted
- [ ] on iPhone the text can slant too much (CSS angle transformation for lab notebook feel + too long paragraphs) so it goes out of frame a little
- [ ] infinite scroll loading image for /media and /music based pagination pages, as it can take a long while to load 
- [ ] check out https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#using-plugins
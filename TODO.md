# TODO

- [ ] Set `site` property!
- [ ] Licenses for font and metafizzy plugins (infinite scroll, masonry)
- [ ] [RSS](https://docs.astro.build/en/tutorial/5-astro-api/4/) with [content collections](https://docs.astro.build/en/tutorial/6-islands/4/)
- [ ] Check SEO stats
- [ ] [Ensure slugs are unique](https://github.com/withastro/astro/issues/12788)
- [ ] Clean up /public dir
- [ ] Symbols in footer: good example, see bottom of https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- [ ] SEO optimization; like fill in on each page:
  ```
  <meta name="description" content="A brief description of your page for search engines." />
  <meta name="keywords" content="keyword1, keyword2, keyword3" />
  <meta name="author" content="Your Name or Company" />
  ```
- [ ] Fix proper 302 external redirects with adaptor; Astro does not support external redirects in redirect config. Currently handled with `Astro.redirect()`. NOTE: does not work with prebuilt deployment on Cloudflare I think
- [ ] Posts should be chopped up in small pieces. Slugs ending with a number, like /about/website/1, signal to be part of a series of posts. But make sure that about/website/1 and about/website point to the same path, as otherwise this will break current way to compute the hrefs of the titles, as in Title.astro
- [ ] /tags
- [ ] Related posts. Can gauge quality of related posts by seeing of similarity product is larger than some reference like the primary tag page, eg /vault
- [ ] link symbols 🗗 in /research are not rendered on iPhone
- [ ] on iPhone the text can slant too much (CSS angle transformation for lab notebook feel + too long paragraphs) so it goes out of frame a little
- [ ] infinite scroll: have "Loading..." indicator or text for /media and /music based pagination pages, as it can take a long while to load 
- [ ] check out https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#using-plugins
- [ ] Use view transitions: https://www.reddit.com/r/astrojs/comments/1jbsndb/comment/mhwmqg2/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
- [ ] Use Cloudflare Stream for videos: tutorial: https://kristianfreeman.com/cloudflare-stream. And perhaps Cloudflare Images too, but this requires batch uploading the vault
- [ ] Sidenotes: https://gwern.net/sidenote
  * Next to title: creation date, prev/next, etc
  * Footnotes: we will need a custom filter to do that properly
  * In /media: explain stuff etc
- [ ] Night mode: see latex.css for how this is done
- [ ] /media/2024 : images do not react when clicked. in fact maybe set clicked image to just 100%, no fancy stuff
- [ ] Attribute pictures to Lina
- [ ] Fix static redirect "mvsoom.pages.dev/mvsoom_academic_cv.pdf" in academic-cv file in Obsidian
- [ ] Change "publish" dates to "last updated"
- [ ] Fix www redirect to root on Cloudflare
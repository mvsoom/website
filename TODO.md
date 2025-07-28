# TODO

- [ ] [RSS](https://docs.astro.build/en/tutorial/5-astro-api/4/) with [content collections](https://docs.astro.build/en/tutorial/6-islands/4/)
- [ ] Check SEO stats
- [ ] Symbols in footer: good example, see bottom of https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- [ ] Fix proper 302 external redirects with adaptor; Astro does not support external redirects in redirect config. Currently handled with `Astro.redirect()`. NOTE: does not work with prebuilt deployment on Cloudflare I think
- [ ] /tags (currently in /test) => needed for Google to crawl everything
- [ ] Related posts. Can gauge quality of related posts by seeing of similarity product is larger than some reference like the primary tag page, eg /vault
- [ ] check out https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#using-plugins
- [ ] Use view transitions: https://www.reddit.com/r/astrojs/comments/1jbsndb/comment/mhwmqg2/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button . This is used in here: https://astro-paper.pages.dev/
- [ ] Use Cloudflare Stream for videos: tutorial: https://kristianfreeman.com/cloudflare-stream. And perhaps Cloudflare Images too, but this requires batch uploading the vault
- [ ] Sidenotes: https://gwern.net/sidenote
  * Next to title: creation date, prev/next, etc
  * Footnotes: we will need a custom filter to do that properly
  * In /media: explain stuff etc
- [ ] Night mode: see latex.css for how this is done
- [ ] Attribute pictures to Lina
- [ ] Change "publish" dates to "last updated" => Obsidian Linter plugin (installed) can do this
- [ ] `keywords` prop per article -- see `<meta name="keywords" content={keywords} />`
- [ ] Yellow line under "research" (navigation) could be "antiquewhite" instead, and "about" could be grey
- [ ] Replace obsolete infinite-scroll with modern solution
- [ ] Tags withotu files dont render titles, eg /mmu/ tag
- [ ] Need scrollbar back, at least for sure on pc. Or replace by a symbol
- [ ] Internal links ; all redirects should cease to be pages anyway. Links from our publications to /paper pdfs
- [ ] Current "research" or "about" sections (main tags) could be indicated with some funky unicode asterisk
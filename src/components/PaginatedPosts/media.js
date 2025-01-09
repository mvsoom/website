// This needs to be in a separate file as we cannot import 'infinite-scroll' in the frontmatter of the .astro file ...
// ... due to 'infinite-scroll' relying on the 'window' object which is not available in the server-side rendering environment ...
// ... but here it works perfectly well and it is processed by vite as expected
import InfiniteScroll from 'infinite-scroll';
import Masonry from 'masonry-layout';
import ImagesLoaded from 'imagesloaded';

const dataset = document.querySelector("#data").dataset;
const tag = dataset.tag;
const years = dataset.years.split(",");
const target = dataset.target;
const container = target + ' #data';

function getNextYearPath() {
  const year = years[this.loadCount];
  if (year) {
    return `/${tag}/${year}`;
  }
}

// init Masonry
let msnry = new Masonry(container, {});

// make imagesLoaded available for InfiniteScroll
InfiniteScroll.imagesLoaded = ImagesLoaded;

const infScroll = new InfiniteScroll(container, {
  path: getNextYearPath,
  append: target + " ol",
  prefill: true,
  history: false,
  checkLastPage: true,
  debug: true,
  outlayer: msnry,
});

// This needs to be in a separate file as we cannot import 'infinite-scroll' in the frontmatter of the .astro file ...
// ... due to 'infinite-scroll' relying on the 'window' object which is not available in the server-side rendering environment ...
// ... but here it works perfectly well and it is processed by vite as expected
import InfiniteScroll from 'infinite-scroll';

const dataset = document.querySelector("#data").dataset;
const tag = dataset.tag;
const years = dataset.years.split(",");
const parent = dataset.parent;

function getYearPath() {
  const slug = years[this.loadCount];
  if (slug) {
    return `/${tag}/${slug}`;
  }
}

const target = `${parent} > .${tag}`;
const infScroll = new InfiniteScroll(target, {
  path: getYearPath,
  append: target,
  prefill: true,
  history: false,
  checkLastPage: true,
  loadOnScroll: false,
  button: '.view-more-button',
  debug: true,
});

let viewMoreButton = document.querySelector('.view-more-button');
viewMoreButton.addEventListener( 'click', function() {
  // load next page
  infScroll.loadNextPage();
  // enable loading on scroll
  infScroll.options.loadOnScroll = true;
  // hide page
  viewMoreButton.style.display = 'none';
});
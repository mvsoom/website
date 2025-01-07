// This needs to be in a separate file as we cannot import 'infinite-scroll' in the frontmatter of the .astro file ...
// ... due to 'infinite-scroll' relying on the 'window' object which is not available in the server-side rendering environment ...
// ... but here it works perfectly well and it is processed by vite as expected
import InfiniteScroll from 'infinite-scroll';

const dataset = document.querySelector("#infinite-scroll").dataset;
const tag = dataset.tag;
const years = dataset.years.split(",");
const target = dataset.target;
const container = target + ' #infinite-scroll';

function getNextYearPath() {
  const year = years[this.loadCount];
  if (year) {
    return `/${tag}/${year}`;
  }
}

const infScroll = new InfiniteScroll(container, {
  path: getNextYearPath,
  append: target,
  prefill: true,
  history: false,
  checkLastPage: true,
  loadOnScroll: false,
  button: '.view-all-button',
  // debug: true,
});

let viewMoreButton = document.querySelector('.view-all-button');

viewMoreButton.addEventListener('click', function () {
  infScroll.loadNextPage();
  infScroll.options.loadOnScroll = true;
  viewMoreButton.style.display = 'none';
});

infScroll.once('scrollThreshold', function () {
  viewMoreButton.style.display = 'block'; // Must be "block" for centering the button, not "inline-block"
});
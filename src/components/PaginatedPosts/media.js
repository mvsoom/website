// This needs to be in a separate file as we cannot import 'infinite-scroll' in the frontmatter of the .astro file ...
// ... due to 'infinite-scroll' relying on the 'window' object which is not available in the server-side rendering environment ...
// ... but here it works perfectly well and it is processed by vite as expected
import InfiniteScroll from 'infinite-scroll';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

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

/* 

Images sometimes stacked on top of eachother
Refresh helps but not always
This issue:

https://github.com/metafizzy/infinite-scroll/issues/978

SOLVED by using <Image>s instead of <Picture>s !!! ???

*/

let grid = document.querySelector(container);

let msnry = new Masonry(grid, {
  itemSelector: 'none', // select none at first, then set in imagesLoaded()
  percentPosition: true,
  columnWidth: '.grid-sizer',
});

// initial items reveal
imagesLoaded(grid, function() {
  grid.classList.remove('are-images-unloaded');
  msnry.options.itemSelector = '.grid-item';
  let items = grid.querySelectorAll('.grid-item');
  msnry.appended(items);
});

InfiniteScroll.imagesLoaded = imagesLoaded;

// init Infinite Scroll
let infScroll = new InfiniteScroll(grid, {
  path: getNextYearPath,
  append: target + " .grid-item",
  prefill: true,
  history: false,
  checkLastPage: true,
  outlayer: msnry,
  debug: true,
});

grid.addEventListener('click', (event) => {
  const itemContent = event.target.closest('.grid-item-content');
  if (!itemContent) return;
  setItemContentPixelSize(itemContent);

  const itemElem = itemContent.parentNode;
  itemElem.classList.toggle('is-expanded', !itemElem.classList.contains('is-expanded'));

  const redraw = itemContent.offsetWidth; // force redraw
  itemContent.style.transition = '';

  addTransitionListener(itemContent);
  setItemContentTransitionSize(itemContent, itemElem);

  msnry.layout();
});

function setItemContentPixelSize(itemContent) {
  const { width, height } = itemContent.getBoundingClientRect();
  itemContent.style.transition = 'none';
  itemContent.style.width = `${width}px`;
  itemContent.style.height = `${height}px`;
}

function addTransitionListener(itemContent) {
  const onTransitionEnd = () => {
    itemContent.style.width = '';
    itemContent.style.height = '';
    itemContent.removeEventListener('transitionend', onTransitionEnd, false);

    msnry.layout();
  };
  itemContent.addEventListener('transitionend', onTransitionEnd, false);
}

function setItemContentTransitionSize(itemContent, itemElem) {
  const { width, height } = itemElem.getBoundingClientRect();
  itemContent.style.width = `${width}px`;
  itemContent.style.height = `${height}px`;
}
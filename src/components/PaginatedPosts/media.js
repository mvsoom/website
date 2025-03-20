// This needs to be in a separate file as we cannot import 'infinite-scroll' in the frontmatter of the .astro file ...
// ... due to 'infinite-scroll' relying on the 'window' object which is not available in the server-side rendering environment ...
// ... but here it works perfectly well and it is processed by vite as expected
import InfiniteScroll from 'infinite-scroll';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { computeWidths } from "../../scripts/media.ts";

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
  horizontalOrder: true,
  stagger: 20, // msec
  originLeft: true,
  resize: true,
});

// initial items reveal
imagesLoaded(grid, function () {
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

  const itemElem = itemContent.parentNode;
  const id = itemElem.getAttribute('data-id');
  const siblings = Array.from(itemElem.parentNode.children).filter(child => child.getAttribute('data-id') === id); // siblings are of class "grid-item"

  const n = siblings.length;
  const center = siblings.indexOf(itemElem);
  const widths = computeWidths(n, { center: center, max: 1. }); // Clicked item becomes center and gets max width

  siblings.forEach((sibling, index) => {
    const siblingContent = sibling.querySelector('.grid-item-content');

    if (siblingContent) {
      setItemContentPixelSize(siblingContent);

      // Set width and z-index of clicked item and its siblings
      const w = widths[index];
      const z = Math.ceil(1000 * widths[index]);

      sibling.style.width = `${w * 100}%`;
      sibling.style.zIndex = `${z}`;
      
      const redraw = siblingContent.offsetWidth; // force redraw
      siblingContent.style.transition = '';

      addTransitionListener(siblingContent);
      setItemContentTransitionSize(siblingContent, sibling);
    }
  });

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
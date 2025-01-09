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


let msnry = new Masonry( grid, {
  itemSelector: 'none', // select none at first
  stagger: 30,
});

console.log("data:", document.querySelector("#data"));


// initial items reveal
imagesLoaded( grid, function() {
  console.log('imagesLoaded');
  
  console.log(grid);

  grid.classList.remove('are-images-unloaded');


  console.log(grid);

  msnry.options.itemSelector = 'li';
  let items = grid.querySelectorAll('li');
  console.log("items: ", items);

  msnry.appended( items );
});

InfiniteScroll.imagesLoaded = imagesLoaded;

//-------------------------------------//
// init Infinte Scroll

let infScroll = new InfiniteScroll( grid, {
  path: getNextYearPath,
  
  append: target + " ol",
  prefill: true,
  history: false,
  checkLastPage: true,
  outlayer: msnry,
  debug: true,
});

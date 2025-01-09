// This needs to be in a separate file for the same reason as in infinite-scroll.js file
import Masonry from 'masonry-layout';

const dataset = document.querySelector("#data").dataset;

const target = dataset.target;

var msnry = new Masonry(target, {
});

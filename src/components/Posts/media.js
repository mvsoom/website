// This needs to be in a separate file for the same reason as in infinite-scroll.js file
import Masonry from 'masonry-layout';

const dataset = document.querySelector("#data").dataset;

const target = dataset.target;

const grid = document.querySelector(target);
const msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
});

grid.addEventListener('click', (event) => {
    if (!event?.target?.matches('.grid-item-content')) return;
    const itemContent = event.target;
    setItemContentPixelSize(itemContent);

    const itemElem = itemContent.parentNode;
    itemElem.classList.toggle('is-expanded', !itemElem.classList.contains('is-expanded'));

    itemContent.offsetWidth; // force redraw
    itemContent.style[transitionProp] = '';

    addTransitionListener(itemContent);
    setItemContentTransitionSize(itemContent, itemElem);

    msnry.layout();
});

const docElem = document.documentElement;
const transitionProp = typeof docElem.style.transition === 'string' ?
    'transition' : 'WebkitTransition';
const transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    transition: 'transitionend'
}[transitionProp];

function setItemContentPixelSize(itemContent) {
    const { width, height } = itemContent.getBoundingClientRect();
    itemContent.style[transitionProp] = 'none';
    itemContent.style.width = `${width}px`;
    itemContent.style.height = `${height}px`;
}

function addTransitionListener(itemContent) {
    const onTransitionEnd = () => {
        itemContent.style.width = '';
        itemContent.style.height = '';
        itemContent.removeEventListener(transitionEndEvent, onTransitionEnd, false);
    };
    itemContent.addEventListener(transitionEndEvent, onTransitionEnd, false);
}

function setItemContentTransitionSize(itemContent, itemElem) {
    const { width, height } = itemElem.getBoundingClientRect();
    itemContent.style.width = `${width}px`;
    itemContent.style.height = `${height}px`;
}

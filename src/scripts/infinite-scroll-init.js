// src/scripts/infinite-scroll-init.js
import InfiniteScroll from 'infinite-scroll';

document.addEventListener('DOMContentLoaded', () => {
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
  });
});

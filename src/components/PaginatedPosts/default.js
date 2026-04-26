const LOAD_AHEAD_PX = 1000;

let current = null;

function cleanup() {
  current?.observer?.disconnect();
  current?.abortController?.abort();
  current?.removeFallbackListeners?.();
  current = null;
}

function getYears(dataset) {
  return (dataset.years ?? "")
    .split(",")
    .map((year) => year.trim())
    .filter(Boolean);
}

function getYearPath(tag, year) {
  return `/${tag}/${year}/`;
}

function getAppendElement(documentFragment, target) {
  return documentFragment.querySelector(target);
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

async function initPaginatedPosts() {
  const container = document.querySelector(
    "#data[data-tag][data-years][data-target]",
  );

  if (current?.container === container) return;
  cleanup();
  if (!container) return;

  const { tag, target } = container.dataset;
  const years = getYears(container.dataset);
  if (!tag || !target || years.length === 0) return;

  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.blockSize = "1px";
  sentinel.style.inlineSize = "100%";
  container.append(sentinel);

  const abortController = new AbortController();

  const state = {
    abortController,
    container,
    done: false,
    loading: false,
    nextIndex: 0,
    observer: null,
    removeFallbackListeners: null,
    sentinel,
  };
  current = state;

  async function loadNextYear() {
    if (current !== state || state.done || state.loading) return false;

    const year = years[state.nextIndex];
    if (!year) {
      state.done = true;
      state.sentinel.remove();
      state.observer?.disconnect();
      state.removeFallbackListeners?.();
      return false;
    }

    state.loading = true;

    try {
      const response = await fetch(getYearPath(tag, year), {
        signal: state.abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Could not load ${response.url}: ${response.status}`);
      }

      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const appendElement = getAppendElement(doc, target);

      if (current !== state) return false;

      state.nextIndex += 1;

      if (!appendElement) {
        console.warn(
          `[pagination] No element matching "${target}" in ${response.url}`,
        );
        return false;
      }

      state.container.insertBefore(appendElement, state.sentinel);
      return true;
    } catch (error) {
      if (error.name !== "AbortError") {
        console.warn("[pagination] Stopping after failed page load", error);
        state.done = true;
      }
      return false;
    } finally {
      if (current === state) state.loading = false;
    }
  }

  async function loadUntilOutOfRange() {
    while (current === state && !state.done) {
      const { top } = state.sentinel.getBoundingClientRect();
      if (top > window.innerHeight + LOAD_AHEAD_PX) break;
      const loaded = await loadNextYear();
      if (!loaded) break;
      await nextFrame();
    }
  }

  if ("IntersectionObserver" in window) {
    state.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadUntilOutOfRange();
        }
      },
      { rootMargin: `${LOAD_AHEAD_PX}px 0px` },
    );
    state.observer.observe(sentinel);
  } else {
    const maybeLoad = () => loadUntilOutOfRange();

    window.addEventListener("scroll", maybeLoad, { passive: true });
    window.addEventListener("resize", maybeLoad);
    state.removeFallbackListeners = () => {
      window.removeEventListener("scroll", maybeLoad);
      window.removeEventListener("resize", maybeLoad);
    };
  }

  await loadUntilOutOfRange();
}

initPaginatedPosts();
document.addEventListener("astro:page-load", initPaginatedPosts);

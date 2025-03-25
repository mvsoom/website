function computeSideRanks(n: number): number[] {
  const ranks: number[] = [];
  let r = 2;
  let assigned = 0;

  while (assigned < n) {
    const take = Math.min(r, n - assigned);
    for (let i = 0; i < take; i++) {
      ranks.push(r);
    }
    assigned += take;
    r *= 2;
  }
  return ranks;
}

export function computeRanks(
  n: number,
  center: number // Index of center image
): number[] {
  // Compute number of images to the left and right of center image
  const nl = center;
  const nr = n - 1 - center;

  const left = computeSideRanks(nl).reverse();
  const right = computeSideRanks(nr);

  const ranks = [...left, 1, ...right];
  return ranks;
}

export function computeWidthsFromRanks(ranks, { min = 0., max = 1. }) {
  const widths = ranks.map((rank) => 1 / rank);
  const boundedWidths = widths.map((w) => {
    if (w < min) return min;
    if (w > max) return max;
    return w;
  });

  return boundedWidths;
}

export function computeWidths(n, { center = 0, min = 0., max = 1. }) {
  const ranks = computeRanks(n, center);
  return computeWidthsFromRanks(ranks, { min, max });
}

function findCenter(media) {
  const centered = media.map((item) => item.center || false);
  if (centered.filter(Boolean).length > 1) {
    throw new Error("Multiple elements with center: true found");
  }

  let center = centered.indexOf(true);
  center = center < 0 ? 0 : center;
  return center;
}

export function parseMedia(media) {
  const images = media.map((item) => item.image || item);

  const n = media.length;
  const center = findCenter(media);
  let ranks = computeRanks(n, center, 4);

  // Optionally override ranks per image if defined
  ranks = media.map((item, index) => item.rank || ranks[index]);

  const widths = computeWidthsFromRanks(ranks, { max: 1.0 });

  return { images, widths };
}

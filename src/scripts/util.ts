import psl from "psl";

export function getBaseDomain(url) {
  const domain = new URL(url).hostname;
  const parsed = psl.parse(domain);

  if (parsed.error) throw new Error("Invalid domain");

  return parsed.domain;
}

export function formatDate(date) {
  const dd = date
    .getDate()
    .toString()
    .padStart(2, "0"); // "01"
  const mmm = date
    .toLocaleString("en-US", { month: "short" }) // "Jan"
    .toLowerCase();
  const yyyy = date.getFullYear(); // "2020"
  return { dd, mmm, yyyy };
}

/**
 * Compute an array of widths for a given side (left or right) of the gallery.
 * @param count - The number of images on this side.
 * @param maxWidth - The maximum width value allowed (i.e. images cannot get smaller than 1/maxWidth).
 * @returns An array of numbers representing the widths (as inverse fractions).
 */
function computeSideWidths(count: number, maxWidth: number): number[] {
  const widths: number[] = [];
  let groupValue: number = 2;  // starting value for images adjacent to the cover
  let groupCapacity: number = 2;
  let assigned: number = 0;

  while (assigned < count) {
    // If we've reached or exceeded the maximum allowed width,
    // assign all remaining images with maxWidth.
    if (groupValue >= maxWidth) {
      const remaining = count - assigned;
      for (let i = 0; i < remaining; i++) {
        widths.push(1/maxWidth);
      }
      assigned = count;
    } else {
      const take = Math.min(groupCapacity, count - assigned);
      for (let i = 0; i < take; i++) {
        widths.push(1/groupValue);
      }
      assigned += take;
      const candidate = groupValue * 2;
      groupValue = candidate > maxWidth ? maxWidth : candidate;
      groupCapacity *= 2;
    }
  }
  return widths;
}

/**
 * Calculate the gallery widths for N images with the cover at index C,
 * ensuring no image gets a width value exceeding maxWidth.
 * @param N - Total number of images.
 * @param C - Index of the cover image (0-indexed). The cover always gets width 1.
 * @param maxWidth - The maximum allowed width (e.g., 4 means images never get smaller than 1/4).
 * @returns An array of numbers representing the widths for each image.
 */
const MAXWIDTH = 8;

export function galleryWidths(N: number, C: number, maxWidth: number = MAXWIDTH): number[] {
  const leftCount = C;            // images to the left of the cover
  const rightCount = N - 1 - C;     // images to the right of the cover

  // Compute widths for the left side (from the cover outward), then reverse.
  const leftSide: number[] = computeSideWidths(leftCount, maxWidth).reverse();
  // Compute widths for the right side (order is already from the cover outward).
  const rightSide: number[] = computeSideWidths(rightCount, maxWidth);

  return [...leftSide, 1, ...rightSide];
}

/*
// --- Example Tests ---

console.log("N = 3, C = 0, maxWidth = 4:", galleryWidths(3, 0, 4)); // Expected: [1, 2, 2]
console.log("N = 3, C = 1, maxWidth = 4:", galleryWidths(3, 1, 4)); // Expected: [2, 1, 2]
console.log("N = 3, C = 2, maxWidth = 4:", galleryWidths(3, 2, 4)); // Expected: [2, 2, 1]

console.log("N = 4, C = 0, maxWidth = 4:", galleryWidths(4, 0, 4)); // Expected: [1, 2, 2, 4]
console.log("N = 4, C = 3, maxWidth = 4:", galleryWidths(4, 3, 4)); // Expected: [4, 2, 2, 1]

console.log("N = 5, C = 0, maxWidth = 4:", galleryWidths(5, 0, 4)); // Expected: [1, 2, 2, 4, 4]
console.log("N = 5, C = 2, maxWidth = 4:", galleryWidths(5, 2, 4)); // Expected: [2, 2, 1, 2, 2]

// If maxWidth is set to 2, all side images get width 2:
console.log("N = 5, C = 2, maxWidth = 2:", galleryWidths(5, 2, 2)); // Expected: [2, 2, 1, 2, 2]
*/
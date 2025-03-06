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

export function formatSlug(slug: string) {
  return slug.replace(/-/g, '\u2009');
}
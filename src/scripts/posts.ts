import { getCollection } from "astro:content";
import * as path from "path";

export async function getPosts() {
  return await getCollection("vault", ({ data }) => {
    return data.published !== undefined;
  });
}

export function sortByDate(posts) {
  return posts.sort((a, b) => {
    return (
      (b.data.published?.valueOf() ?? 0) - (a.data.published?.valueOf() ?? 0)
    );
  });
}

export async function getSortedPosts() {
  const posts = await getPosts();
  return sortByDate(posts);
}

export function groupByYear(posts) {
  return posts.reduce(
    (acc, post) => {
      const year = post.data.published!.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof posts>
  );
}
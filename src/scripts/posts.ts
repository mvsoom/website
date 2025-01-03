import { getCollection } from "astro:content";

export async function getPosts() {
  return await getCollection("vault", ({ data }) => {
    return data.published !== undefined;
  });
}

export function sortByDate(posts) {
  return posts.sort((a, b) => {
    return (
      b.data.published!.valueOf() - a.data.published!.valueOf()
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
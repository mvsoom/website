import { getCollection } from "astro:content";

export async function getSortedPosts() {
  const posts = await getCollection("vault", ({ data }) => {
    return data.published !== undefined;
  });

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.data.published) - new Date(a.data.published);
  });

  return sortedPosts;
}
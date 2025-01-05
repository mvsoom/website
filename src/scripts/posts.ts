import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

type VaultPost = CollectionEntry<"vault">;

export async function getPosts() {
  const posts = await getCollection("vault", ({ data }) => {
    return data.published !== undefined;
  });

  // Add the "vault" tag to all posts (making it always defined)
  return posts.map((post) => {
    if (!post.data.tags.includes("vault")) {
      post.data.tags.push("vault");
    }
    return post;
  });
}

export async function getTagPosts() {
  // These are special posts describing a tag
  return await getPosts().then((posts) => posts.filter((post) => post.data.tags.includes("tag")));
}

export async function findTagPost(tag: string): Promise<VaultPost | undefined> {
  const tagPosts = await getTagPosts();
  return tagPosts.find((post) => post.id === tag);
}

export function getTags(posts: VaultPost[]) {
  return [...new Set(posts.map((post) => post.data.tags!).flat())];
}

export function getYears(posts: VaultPost[]) {
  return [...new Set(posts.map((post) => post.data.published!.valueOf()))];
}

export function groupByTagAndYear(posts: VaultPost[]) {
  return posts.reduce(
    (acc, post) => {
      post.data.tags!.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = {};
        }
        const year = post.data.published!.getFullYear();
        if (!acc[tag][year]) {
          acc[tag][year] = [];
        }
        acc[tag][year].push(post);
      });
      return acc;
    },
    {} as Record<string, Record<number, typeof posts>>
  );
}

export function sortYearsDescending(years: string[]) {
  return years.sort((a, b) => Number(b) - Number(a));
}

export function sortPostsDescending(posts: VaultPost[]) {
  return posts.sort((a, b) => {
    return b.data.published!.valueOf() - a.data.published!.valueOf();
  });
}

export function findTagFile(posts: VaultPost[], tag: string) {
  return posts.find((post) => post.data.tags!.includes(tag));
}



/* TODO: functions below are probably unused */
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


export function sortByDate(posts) {
  return posts.sort((a, b) => {
    return b.data.published!.valueOf() - a.data.published!.valueOf();
  });
}

export async function getSortedPosts() {
  const posts = await getPosts();
  return sortByDate(posts);
}
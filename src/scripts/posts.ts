import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { render } from "astro:content";
import slugify from 'slugify';

type VaultPost = CollectionEntry<"vault">;

export async function getPosts() {
  const posts = await getCollection('vault', ({ data }) => data.published !== undefined);

  const seenIds = new Set();

  for (const post of posts) {
    const { headings } = await render(post);

    const { slug: h1Slug, text: h1Text } = getSingleH1(headings, post.filePath);

    // The slug is derived from the H1 text (or can be set manually in frontmatter)
    const pick = (v) => (typeof v === 'string' && v.trim() !== '' ? v.trim() : null);

    const newId =
      pick(post.data.slug) ??
      pick(h1Slug) ??
      slugify(h1Text, { lower: true, strict: true });

    if (seenIds.has(newId)) {
      throw new Error(`[getPosts] duplicate id "${newId}" (source: ${post.filePath})`);
    }
    seenIds.add(newId);

    // Overwrite in place
    post.id = newId;
    post.data.title = h1Text;

    // Add the "vault" tag to all posts (making it always defined)
    if (!post.data.tags.includes('vault')) {
      post.data.tags.push('vault');
    }
  }

  return posts;
}

function getSingleH1(headings, filePath) {
  const h1s = headings.filter((h) => h.depth === 1);
  if (h1s.length !== 1) {
    throw new Error(`[getPosts] ${filePath}: expected exactly 1 H1, found ${h1s.length}`);
  }
  return h1s[0];
}

export async function getTagPosts() {
  // These are special posts describing a tag
  return await getPosts().then((posts) =>
    posts.filter((post) => post.data.tags.includes("tag"))
  );
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

export function getPrimaryTag(tags: string[]): string {
  const specialTags = ["media", "research", "about"]; // Ordered by importance
  for (const tag of specialTags) {
    if (tags.includes(tag)) {
      return tag;
    }
  }
  return "vault"; // Everything is always part of the vault
}

export function groupByPrimaryTag(posts: VaultPost[]) {
  return posts.reduce(
    (acc, post) => {
      const tag = getPrimaryTag(post.data.tags!);
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(post);

      return acc;
    },
    {} as Record<string, VaultPost[]>
  );
}

export function findNeighbors(post: VaultPost, grouped) {
  const primaryTag = getPrimaryTag(post.data.tags!);
  const posts = grouped[primaryTag];
  const index = posts.findIndex((p) => p.id === post.id);

  return {
    prev: posts[index - 1] || undefined,
    next: posts[index + 1] || undefined,
  };
}

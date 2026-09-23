import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Every tag in use, sorted by how many posts carry it. */
export async function getTags(): Promise<{ tag: string; posts: Post[] }[]> {
  const posts = await getPosts();
  const byTag = new Map<string, Post[]>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      byTag.set(tag, [...(byTag.get(tag) ?? []), post]);
    }
  }
  return [...byTag.entries()]
    .map(([tag, posts]) => ({ tag, posts }))
    .sort((a, b) => b.posts.length - a.posts.length || a.tag.localeCompare(b.tag));
}

export function hasPage(post: Post): boolean {
  return Boolean(post.body?.trim());
}

/** "1 Sep" for this year, "1 Sep 2025" otherwise. */
export function shortDate(date: Date): string {
  const month = date.toLocaleDateString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();
  const sameYear = year === new Date().getUTCFullYear();
  return `${date.getUTCDate()} ${month}${sameYear ? "" : ` ${year}`}`;
}

export function longDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

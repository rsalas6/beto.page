import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
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

import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts, hasPage } from "@/lib/posts";
import { SITE } from "@/site";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: hasPage(post) ? `/posts/${post.id}/` : "/",
    })),
  });
}

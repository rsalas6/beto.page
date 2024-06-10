import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://beto.page",
  integrations: [tailwind(), sitemap(), mdx(), pagefind(), vue()],
  markdown: {
    shikiConfig: {
      theme: "css-variables"
    }
  }
});
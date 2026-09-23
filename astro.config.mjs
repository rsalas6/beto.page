// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://beto.page",
  integrations: [
    sitemap({
      // The print pages only exist to generate the CV PDFs.
      filter: (page) => !page.includes("/resume-print") && !page.includes("/og/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
    },
  },
});

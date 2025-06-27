// @ts-check
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightBlog from "starlight-blog";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightThemeNextjs from "starlight-nextjs-theme";

// https://astro.build/config
export default defineConfig({
  site: "https://alchemy.run",
  output: "static",
  prefetch: !import.meta.env.DEV,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith(".html") && !page.endsWith(".md") && !page.endsWith(".mdx"),
    }),
    starlight({
      title: "Alchemy",
      favicon: "/flask.svg",
      logo: {
        src: "/public/alchemy-logo.svg",
        replacesTitle: true,
      },
      customCss: [
        './src/styles/custom.css',
      ],
      prerender: true,
      routeMiddleware: './src/routeData.ts',
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/sam-goodwin/alchemy",
        },
        {
          icon: "twitter",
          label: "X",
          href: "https://twitter.com/samgoodwin89",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/jwKw8dBJdN",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/sam-goodwin/alchemy/edit/main/alchemy-web",
      },
      components: {
        Hero: "./src/components/Hero.astro",
        PageTitle: "./src/components/PageTitle.astro",
      },
      sidebar: [
        {
          label: "What is Alchemy?",
          slug: "what-is-alchemy",
        },
        {
          label: "Getting Started",
          slug: "getting-started",
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Concepts",
          autogenerate: { directory: "concepts" },
        },
        {
          label: "Providers",
          autogenerate: { directory: "providers", collapsed: true },
        },
      ],
      plugins: [starlightThemeNextjs(), starlightLlmsTxt(), starlightBlog()],
    }),
  ],
  trailingSlash: "ignore",
});

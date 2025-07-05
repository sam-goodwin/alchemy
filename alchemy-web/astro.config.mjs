// @ts-check
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLlmsTxt from "starlight-llms-txt";
// import theme from "starlight-nextjs-theme";
// import theme from 'starlight-theme-flexoki';
// import theme from 'starlight-theme-rapide';
// import theme from 'starlight-theme-obsidian';
import theme from "starlight-theme-nova";
//@ts-expect-error
import postHogScript from "./src/scripts/posthog.js?raw";

// import { ion as theme } from "starlight-ion-theme";

// https://astro.build/config
export default defineConfig({
  site: "https://alchemy.run",
  // only needed if we use SSR
  // adapter: cloudflare({
  //   imageService: "passthrough",
  // }),
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith(".html") && !page.endsWith(".md"),
    }),
    // expressiveCode({
    //   themes: [{}]
    // }),
    starlight({
      title: "Alchemy",
      favicon: "/potion.png",
      head: [
        {
          tag: "script",
          content: 'console.log("test script 1");',
        },
        {
          tag: "script",
          content: postHogScript
            .replace(
              "<POSTHOG_CLIENT_API_HOST>",
              process.env.POSTHOG_CLIENT_API_HOST,
            )
            .replace("<POSTHOG_PROJECT_ID>", process.env.POSTHOG_PROJECT_ID),
        },
        {
          tag: "script",
          content: 'console.log("test script 2");',
        },
      ],
      logo: {
        light: "./public/alchemy-logo-light.svg",
        dark: "./public/alchemy-logo-dark.svg",
        replacesTitle: true,
      },
      customCss: ["./src/styles/custom.css"],
      prerender: true,
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
          collapsed: true,
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
      expressiveCode: {
        themes: [
          // "github-light-high-contrast",
          "github-light",
          "github-dark-dimmed",
        ],
      },
      plugins: [theme(), starlightLlmsTxt()],
    }),
  ],
  trailingSlash: "ignore",
});

import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import "@shikijs/vitepress-twoslash/style.css";
import "virtual:group-icons.css";
import type { Theme as ThemeConfig } from "vitepress";
import Theme from "vitepress/theme-without-fonts";
import CodeSnippetHero from "./components/CodeSnippetHero.vue";
import "./style.css";

export default {
  extends: Theme,
  enhanceApp(ctx) {
    ctx.app.use(TwoslashFloatingVue);
    ctx.app.component("CodeSnippetHero", CodeSnippetHero);
  },
} satisfies ThemeConfig;

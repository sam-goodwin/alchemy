import { nitroCloudflareDev } from "alchemy/cloudflare/runtime";
import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-26",
  devtools: { enabled: true },
  nitro: {
    preset: "cloudflare_module",
    cloudflareDev: nitroCloudflareDev(),
  },
  modules: ["nitro-cloudflare-dev"],
});

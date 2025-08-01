import { alchemyVitePlugin } from "alchemy/cloudflare/runtime";
import { redwood } from "rwsdk/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    redwood({
      configPath: ".alchemy/local/wrangler.jsonc",
    }),
    alchemyVitePlugin(),
  ],
});

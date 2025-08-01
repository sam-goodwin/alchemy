import alchemyRedwood from "alchemy/cloudflare/redwood";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [alchemyRedwood()],
});

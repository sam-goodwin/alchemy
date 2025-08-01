import orange from "@orange-js/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [orange(), tsconfigPaths(), tailwindcss()],
  build: {
    minify: true,
  },
});

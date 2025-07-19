import { livestoreDevtoolsPlugin } from "@livestore/devtools-vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type PluginOption } from "vite";

export default defineConfig({
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 60_001,
  },
  worker: { format: "es" },
  plugins: [
    react(),
    livestoreDevtoolsPlugin({
      schemaPath: "./src/livestore/schema.ts",
    }) as PluginOption,
  ],
});

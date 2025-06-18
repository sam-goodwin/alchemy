import { execa } from "execa";
import * as fs from "node:fs/promises";
import { join } from "node:path";
import type { ProjectContext } from "../types.ts";
import {
  getPackageExecutionCommand,
  mkdir,
  rm,
  throwWithContext,
  writeJsonFile,
} from "../utils.ts";
import { initWebsiteProjectWithContext } from "./index.ts";

export default async function initViteProject(
  context: ProjectContext,
): Promise<void> {
  try {
    const root = context.path;

    const command = getPackageExecutionCommand(
      context.packageManager,
      `create-vite@6.5.0 ${context.name} --template react-ts`,
    );
    await execa(command, { shell: true });

    await rm(join(root, "tsconfig.app.json"));
    await rm(join(root, "tsconfig.node.json"));

    await initWebsiteProjectWithContext(context, {
      entrypoint: "./src/main.tsx",
    });

    try {
      await fs.writeFile(
        join(root, "vite.config.ts"),
        `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'esnext',
    lib: {
      entry: './src/main.tsx',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
})
`,
      );
    } catch (error) {
      throwWithContext(error, "Failed to create vite.config.ts");
    }

    try {
      await writeJsonFile(join(root, "tsconfig.json"), {
        compilerOptions: {
          target: "ES2022",
          lib: ["ES2022", "DOM", "DOM.Iterable"],
          module: "ESNext",
          skipLibCheck: true,
          moduleResolution: "bundler",
          allowImportingTsExtensions: true,
          isolatedModules: true,
          moduleDetection: "force",
          noEmit: true,
          jsx: "react-jsx",
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
          noUncheckedSideEffectImports: true,
          types: ["@cloudflare/workers-types"],
        },
        include: ["src/**/*.ts", "src/**/*.tsx", "alchemy.run.ts"],
      });
    } catch (error) {
      throwWithContext(error, "Failed to create tsconfig.json");
    }

    try {
      await mkdir(root, "worker");
      await fs.writeFile(
        join(root, "worker", "index.ts"),
        `import { serveStatic } from 'hono/cloudflare-workers'
import { Hono } from 'hono'
import manifest from '__STATIC_CONTENT_MANIFEST'

const app = new Hono()

// Serve static files
app.get('*', serveStatic({ root: './', manifest }))

export default app
`,
      );
    } catch (error) {
      throwWithContext(error, "Failed to create worker integration");
    }
  } catch (error) {
    throwWithContext(error, "Vite template initialization failed");
  }
}

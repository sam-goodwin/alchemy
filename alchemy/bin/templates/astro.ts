import { execa } from "execa";
import * as fs from "node:fs/promises";
import { join } from "node:path";
import type { ProjectContext } from "../types.ts";
import {
  getPackageExecutionCommand,
  mkdir,
  throwWithContext,
} from "../utils.ts";
import { initWebsiteProjectWithContext } from "./index.ts";

export default async function initAstroProject(
  context: ProjectContext,
): Promise<void> {
  try {
    const command = getPackageExecutionCommand(
      context.packageManager,
      `create-astro@latest ${context.name} --no-git --no-deploy --install ${context.options.yes ? "--yes" : ""}`,
    );
    await execa(command, { shell: true });

    await initWebsiteProjectWithContext(context, {
      scripts: {
        dev: "astro dev",
        build: "astro check && astro build",
      },
      devDependencies: ["@astrojs/cloudflare"],
    });

    try {
      await fs.writeFile(
        join(context.path, "astro.config.mjs"),
        `import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
});
`,
      );
    } catch (error) {
      throwWithContext(error, "Failed to create astro.config.mjs");
    }

    try {
      await mkdir(context.path, "src", "pages", "api");
      await fs.writeFile(
        join(context.path, "src", "pages", "api", "hello.ts"),
        `import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  // Access Cloudflare runtime context
  const runtime = request.cf;

  return new Response(JSON.stringify({
    message: "Hello from Astro API on Cloudflare!",
    timestamp: new Date().toISOString(),
    colo: runtime?.colo || "unknown",
    country: runtime?.country || "unknown",
    city: runtime?.city || "unknown",
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
`,
      );
    } catch (error) {
      throwWithContext(error, "Failed to create API route");
    }
  } catch (error) {
    throwWithContext(error, "Astro template initialization failed");
  }
}

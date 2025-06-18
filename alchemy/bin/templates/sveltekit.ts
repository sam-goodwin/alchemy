import { execa } from "execa";
import * as fs from "node:fs/promises";
import { join } from "node:path";
import type { ProjectContext } from "../types.ts";
import { getPackageExecutionCommand, throwWithContext } from "../utils.ts";
import { initWebsiteProjectWithContext } from "./index.ts";

export default async function initSvelteKitProject(
  context: ProjectContext,
): Promise<void> {
  try {
    const command = getPackageExecutionCommand(
      context.packageManager,
      `create-cloudflare@2.49.3 ${context.name} --framework=svelte --no-git --no-deploy ${context.options.yes ? "--yes" : ""}`,
    );
    await execa(command, { shell: true });

    await initWebsiteProjectWithContext(context, {
      scripts: {
        build: "vite build",
      },
    });

    try {
      await fs.writeFile(
        join(context.path, "src", "routes", "+page.svelte"),
        `<script lang="ts">
  let message = "Your SvelteKit app is deployed on Cloudflare!";
</script>

<svelte:head>
  <title>SvelteKit on Cloudflare</title>
</svelte:head>

<main>
  <h1>{message}</h1>
  <p>This SvelteKit app is running on Cloudflare Workers with Alchemy.</p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
`,
      );
    } catch (error) {
      throwWithContext(error, "Failed to update SvelteKit page");
    }
  } catch (error) {
    throwWithContext(error, "SvelteKit template initialization failed");
  }
}

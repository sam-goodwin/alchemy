import { execa } from "execa";
import * as fs from "node:fs/promises";
import { join } from "node:path";
import type { ProjectContext } from "../types.ts";
import { getPackageExecutionCommand, throwWithContext } from "../utils.ts";
import { initWebsiteProjectWithContext } from "./index.ts";

export default async function initTanStackStartProject(
  context: ProjectContext,
): Promise<void> {
  try {
    const command = getPackageExecutionCommand(
      context.packageManager,
      `create-cloudflare@2.49.3 ${context.name} --framework=tanstack-start --no-git --no-deploy ${context.options.yes ? "--yes" : ""}`,
    );
    await execa(command, { shell: true });
    await initWebsiteProjectWithContext(context, {
      scripts: {
        build: "vinxi build",
      },
    });

    try {
      await fs.writeFile(
        join(context.path, "app", "routes", "index.tsx"),
        `import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome to TanStack Start on Cloudflare!</h3>
      <p>Your TanStack Start app is running on Cloudflare Workers with Alchemy.</p>
    </div>
  )
}
`,
      );
    } catch (error) {
      throwWithContext(error, "Failed to update TanStack Start page");
    }
  } catch (error) {
    throwWithContext(error, "TanStack Start template initialization failed");
  }
}

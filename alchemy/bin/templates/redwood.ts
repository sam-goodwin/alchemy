import { execa } from "execa";
import * as fs from "node:fs/promises";
import { join } from "node:path";
import type { ProjectContext } from "../types.ts";
import { getPackageExecutionCommand, throwWithContext } from "../utils.ts";
import { initWebsiteProjectWithContext } from "./index.ts";

export default async function initRedwoodProject(
  context: ProjectContext,
): Promise<void> {
  try {
    const command = getPackageExecutionCommand(
      context.packageManager,
      `create-cloudflare@2.49.3 ${context.name} --framework=redwood --no-git --no-deploy ${context.options.yes ? "--yes" : ""}`,
    );
    await execa(command, { shell: true });

    await initWebsiteProjectWithContext(context, {
      scripts: {
        build: "redwood build",
      },
    });

    try {
      await fs.writeFile(
        join(context.path, "redwood.toml"),
        `[web]
  title = "Redwood App on Cloudflare"
  port = 8910
  apiUrl = "/.redwood/functions"
  
[api]
  port = 8911
  
[browser]
  open = true
`,
      );
    } catch (error) {
      throwWithContext(error, "Failed to create redwood.toml");
    }
  } catch (error) {
    throwWithContext(error, "Redwood template initialization failed");
  }
}

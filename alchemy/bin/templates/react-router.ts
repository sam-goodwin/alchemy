import { execa } from "execa";
import * as fs from "node:fs/promises";
import { join } from "node:path";
import type { ProjectContext } from "../types.ts";
import {
  getPackageExecutionCommand,
  modifyJsoncFile,
  modifyTsConfig,
  throwWithContext,
} from "../utils.ts";
import { initWebsiteProjectWithContext } from "./index.ts";

export default async function initReactRouterProject(
  context: ProjectContext,
): Promise<void> {
  try {
    const command = getPackageExecutionCommand(
      context.packageManager,
      `create-cloudflare@2.49.3 ${context.name} --framework=react-router --no-git --no-deploy ${context.options.yes ? "--yes" : ""}`,
    );

    await execa(command, { shell: true });

    await initWebsiteProjectWithContext(context, {
      scripts: {
        build: "react-router build",
      },
    });

    await modifyTsConfig(context.path, {
      include: ["app/**/*.ts", "app/**/*.tsx"],
    });

    try {
      await modifyJsoncFile(join(context.path, "tsconfig.json"), {
        "compilerOptions.moduleResolution": "bundler",
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to modify tsconfig.json: ${errorMsg}`);
    }

    try {
      await fs.writeFile(
        join(context.path, "app", "welcome", "welcome.tsx"),
        `import { Welcome } from "./welcome";

export default function Home() {
  return <Welcome message="Your React Router app is deployed on Cloudflare!" />;
}
`,
      );
    } catch (error) {
      throwWithContext(error, "Failed to update welcome component");
    }
  } catch (error) {
    throwWithContext(error, "React Router template initialization failed");
  }
}

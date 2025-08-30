import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import { describe, expect, test } from "vitest";
import "../src/test/vitest.ts";
import { patchCatalogAndInstall, runCommand } from "./util.ts";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..", "..");
const cliPath = path.join(rootDir, "alchemy", "bin", "alchemy.js");

async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function cleanupProject(projectPath: string): Promise<void> {
  try {
    if (await fileExists(projectPath)) {
      await fs.rm(projectPath, { recursive: true, force: true });
    }
  } catch (error) {
    console.warn(`Failed to cleanup ${projectPath}:`, error);
  }
}

const initVariants = {
  "vite-init": {
    scaffoldCommand: "bun create vite@latest {projectName} --template react-ts",
  },
  "sveltekit-init": {
    scaffoldCommand:
      "bunx sv create {projectName} --template minimal --types ts --no-add-ons --no-install",
  },
  "nuxt-init": {
    scaffoldCommand:
      "bun create nuxt@latest {projectName} --no-install --packageManager bun --gitInit --no-modules",
  },
  "astro-init": {
    scaffoldCommand: "bun create astro@latest {projectName} --yes",
  },
  "rwsdk-init": {
    scaffoldCommand: "bunx create-rwsdk {projectName}",
  },
  "tanstack-start-init": {
    scaffoldCommand:
      "bunx gitpick TanStack/router/tree/main/examples/react/start-basic {projectName}",
  },
  "react-router-init": {
    scaffoldCommand: "bunx create-react-router@latest {projectName} --yes",
  },
  "nextjs-init": {
    scaffoldCommand: "bun create next-app@latest {projectName} --yes",
  },
};

describe("Init CLI End-to-End Tests", { concurrent: false }, () => {
  for (const [variantName, config] of Object.entries(initVariants)) {
    test(`${variantName} - scaffold, init, deploy, and destroy`, async () => {
      const smokeDir = path.join(rootDir, ".smoke");
      const projectPath = path.join(smokeDir, variantName);

      console.log(`--- Processing: ${variantName} ---`);

      await cleanupProject(smokeDir);

      try {
        await fs.mkdir(smokeDir, { recursive: true });

        await cleanupProject(projectPath);

        console.log(`Scaffolding ${variantName} project...`);
        const scaffoldResult = await runCommand(
          config.scaffoldCommand.replace("{projectName}", variantName),
          smokeDir,
          {
            NODE_ENV: "test",
          },
        );
        expect(scaffoldResult).toBeDefined();

        expect(await fileExists(projectPath)).toBe(true);
        expect(await fileExists(path.join(projectPath, "package.json"))).toBe(
          true,
        );

        console.log(`Running alchemy init on ${variantName} project...`);
        const initResult = await runCommand(
          `bun ${cliPath} init --yes`,
          projectPath,
          {
            NODE_ENV: "test",
          },
        );
        expect(initResult).toBeDefined();

        const alchemyRunTsExists = await fileExists(
          path.join(projectPath, "alchemy.run.ts"),
        );
        const alchemyRunJsExists = await fileExists(
          path.join(projectPath, "alchemy.run.js"),
        );
        expect(alchemyRunTsExists || alchemyRunJsExists).toBe(true);

        console.log(`Installing dependencies for ${variantName} project...`);
        await patchCatalogAndInstall(projectPath);

        console.log(`Deploying ${variantName} project...`);
        const deployResult = await runCommand("bun run deploy", projectPath);
        expect(deployResult).toBeDefined();

        console.log(`Destroying ${variantName} project...`);
        const destroyResult = await runCommand("bun run destroy", projectPath);
        expect(destroyResult).toBeDefined();

        console.log(`--- Completed: ${variantName} ---`);
      } catch (error) {
        console.error(`Failed processing ${variantName}:`, error);
        throw error;
      } finally {
        // await cleanupProject(projectPath);
      }
    }, 600000); // 10 minutes timeout per test
  }
});

import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import { describe, expect, test } from "vitest";
import "../src/test/vitest.ts";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..", "..");
const cliPath = path.join(rootDir, "alchemy", "bin", "alchemy.js");

async function runCommand(
  command: string,
  cwd: string,
  env?: Record<string, string>,
): Promise<{ stdout: string; stderr: string }> {
  console.log(`Running: ${command} in ${cwd}`);
  try {
    const result = execSync(command, {
      cwd,
      env: {
        ...process.env,
        ...env,
      },
    });
    return { stdout: result.toString(), stderr: "" };
  } catch (error: any) {
    console.error(`Command failed: ${command}`);
    console.error(error.stdout?.toString());
    console.error(error.stderr?.toString());
    throw error;
  }
}

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
    scaffoldCommand: "bun create vite@latest test --template react-ts",
  },
  "sveltekit-init": {
    scaffoldCommand:
      "bunx sv create test --template minimal --types ts --no-add-ons --no-install",
  },
  "nuxt-init": {
    scaffoldCommand:
      "bun create nuxt@latest test --no-install --packageManager bun --gitInit --no-modules",
  },
  "astro-init": {
    scaffoldCommand: "bun create astro@latest test --yes",
  },
  "rwsdk-init": {
    scaffoldCommand: "bunx create-rwsdk test",
  },
  "tanstack-start-init": {
    scaffoldCommand:
      "bunx gitpick TanStack/router/tree/main/examples/react/start-basic test",
  },
  "react-router-init": {
    scaffoldCommand: "bunx create-react-router@latest test --yes",
  },
};

describe("Init CLI End-to-End Tests", { concurrent: false }, () => {
  for (const [variantName, config] of Object.entries(initVariants)) {
    test(`${variantName} - scaffold, init, deploy, and destroy`, async () => {
      const smokeDir = path.join(rootDir, ".smoke");
      const projectPath = path.join(smokeDir, "test");

      console.log(`--- Processing: ${variantName} ---`);

      await cleanupProject(smokeDir);

      try {
        await fs.mkdir(smokeDir, { recursive: true });

        await cleanupProject(projectPath);

        console.log(`Scaffolding ${variantName} project...`);
        const scaffoldResult = await runCommand(
          config.scaffoldCommand,
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
        const installResult = await runCommand("bun install", projectPath);
        expect(installResult).toBeDefined();

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

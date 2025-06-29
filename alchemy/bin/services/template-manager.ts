import { log, spinner } from "@clack/prompts";
import { execa } from "execa";
import * as fs from "fs-extra";
import { globby } from "globby";
import * as path from "node:path";
import { join } from "node:path";

import { PKG_ROOT } from "../constants.ts";
import { throwWithContext } from "../errors.ts";
import type { ProjectContext } from "../types.ts";
import { addPackageDependencies } from "./dependencies.ts";
import {
  getPackageManagerCommands,
  installDependencies,
} from "./package-manager.ts";

export async function copyTemplate(
  templateName: string,
  context: ProjectContext,
): Promise<void> {
  const templatePath = path.join(PKG_ROOT, "templates", templateName);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template '${templateName}' not found at ${templatePath}`);
  }

  const filesToRename = [
    "_gitignore",
    "_npmrc",
    "_env",
    "_env.example",
    "_prettierignore",
  ];

  try {
    const copySpinner = spinner();
    copySpinner.start("Copying template files...");

    const files = await globby("**/*", {
      cwd: templatePath,
      dot: true,
    });

    for (const file of files) {
      const srcPath = join(templatePath, file);
      let destFile = file;

      const basename = path.basename(file);
      if (filesToRename.includes(basename)) {
        const newBasename = `.${basename.slice(1)}`;
        destFile = path.join(path.dirname(file), newBasename);
      }

      const destPath = join(context.path, destFile);

      await fs.ensureDir(path.dirname(destPath));
      await fs.copy(srcPath, destPath);
    }

    copySpinner.stop("Template files copied successfully");

    await updateTemplatePackageJson(context);

    await addPackageDependencies({
      devDependencies: ["alchemy"],
      projectDir: context.path,
    });

    if (context.options.install !== false) {
      const installSpinner = spinner();
      installSpinner.start("Installing dependencies...");
      try {
        await installDependencies(context);
        installSpinner.stop("Dependencies installed successfully");
      } catch (error) {
        installSpinner.stop("Failed to install dependencies");
        throw error;
      }
    } else {
      log.info("Skipping dependency installation");
    }

    if (templateName === "rwsdk") {
      await handleRwsdkPostInstall(context);
    }

    log.success("Project setup complete!");
  } catch (error) {
    throwWithContext(error, `Failed to copy template '${templateName}'`);
  }
}

async function updateTemplatePackageJson(
  context: ProjectContext,
): Promise<void> {
  const packageJsonPath = join(context.path, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    return;
  }

  const packageJson = await fs.readJson(packageJsonPath);

  packageJson.name = context.name;

  const deployCommand =
    context.packageManager === "bun"
      ? "bun --env-file=./.env ./alchemy.run.ts"
      : "tsx --env-file=./.env ./alchemy.run.ts";

  if (packageJson.scripts) {
    packageJson.scripts.deploy = deployCommand;
    packageJson.scripts.destroy = `${deployCommand} --destroy`;
  }

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

async function handleRwsdkPostInstall(context: ProjectContext): Promise<void> {
  try {
    const migrationsDir = join(context.path, "migrations");
    await fs.ensureDir(migrationsDir);

    const commands = getPackageManagerCommands(context.packageManager);
    const devInitCommand = `${commands.run} dev:init`;

    if (context.options.install !== false) {
      await execa(devInitCommand, {
        cwd: context.path,
        shell: true,
      });
    } else {
      log.info(
        `To complete rwsdk setup, run: cd ${context.name} && ${devInitCommand}`,
      );
    }
  } catch (_error) {
    log.warn(
      "Failed to complete rwsdk setup. You may need to run 'dev:init' manually.",
    );
  }
}

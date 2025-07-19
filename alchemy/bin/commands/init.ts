import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  note,
  outro,
  select,
} from "@clack/prompts";
import * as fs from "fs-extra";
import { resolve } from "node:path";
import pc from "picocolors";
import { Project, SyntaxKind } from "ts-morph";
import z from "zod";
import { type DependencyVersionMap, PKG_ROOT } from "../constants.ts";
import { throwWithContext } from "../errors.ts";
import { addPackageDependencies } from "../services/dependencies.ts";
import { t } from "../trpc.ts";
import {
  TemplateSchema,
  type InitContext,
  type TemplateType,
} from "../types.ts";

export const init = t.procedure
  .meta({
    description: "Initialize Alchemy in an existing project",
  })
  .input(
    z.tuple([
      z.object({
        framework: TemplateSchema.optional().describe(
          "Force a specific framework instead of auto-detection",
        ),
        yes: z.boolean().optional().describe("Skip prompts and use defaults"),
      }),
    ]),
  )
  .mutation(async ({ input: [options] }) => {
    try {
      intro(pc.cyan("🧪 Initializing Alchemy in your project"));

      const context = await createInitContext(options);

      if (!context.hasPackageJson) {
        log.warn(
          "No package.json found. Please run in a project with package.json.",
        );
        process.exit(1);
      }

      await checkExistingAlchemyFiles(context);
      await copyAlchemyRunFile(context);
      await copyFrameworkSpecificFiles(context);
      await updatePackageJson(context);

      displaySuccessMessage(context);
    } catch (_error) {}
  });

async function createInitContext(options: {
  framework?: TemplateType;
  yes?: boolean;
}): Promise<InitContext> {
  const cwd = resolve(process.cwd());
  const packageJsonPath = resolve(cwd, "package.json");
  const hasPackageJson = await fs.pathExists(packageJsonPath);

  let projectName = "my-alchemy-app";
  if (hasPackageJson) {
    try {
      const packageJson = await fs.readJson(packageJsonPath);
      projectName = packageJson.name || "my-alchemy-app";
    } catch (_error) {}
  }

  const useTypeScript = await detectTypeScript(cwd);
  const framework =
    options.framework ||
    (await detectFramework(cwd, hasPackageJson, options.yes));

  return {
    cwd,
    framework,
    useTypeScript,
    projectName,
    hasPackageJson,
  };
}

async function detectTypeScript(cwd: string): Promise<boolean> {
  const tsconfigPath = resolve(cwd, "tsconfig.json");
  if (await fs.pathExists(tsconfigPath)) {
    return true;
  }

  const packageJsonPath = resolve(cwd, "package.json");
  if (await fs.pathExists(packageJsonPath)) {
    try {
      const packageJson = await fs.readJson(packageJsonPath);
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
        ...packageJson.peerDependencies,
      };

      return "typescript" in allDeps || "@types/node" in allDeps;
    } catch (_error) {
      // If we can't read package.json, assume TypeScript
      return true;
    }
  }

  return false;
}

async function detectFramework(
  cwd: string,
  hasPackageJson: boolean,
  skipPrompts?: boolean,
): Promise<TemplateType> {
  if (!hasPackageJson) {
    return "typescript";
  }

  const detectedFramework = await detectFrameworkFromPackageJson(cwd);

  if (skipPrompts) {
    return detectedFramework;
  }

  const frameworkResult = await select({
    message: "Which framework are you using?",
    options: [
      { label: "TypeScript Worker", value: "typescript" },
      { label: "React Vite", value: "vite" },
      { label: "Astro SSR", value: "astro" },
      { label: "React Router", value: "react-router" },
      { label: "SvelteKit", value: "sveltekit" },
      { label: "TanStack Start", value: "tanstack-start" },
      { label: "Redwood SDK", value: "rwsdk" },
      { label: "Nuxt.js", value: "nuxt" },
    ],
    initialValue: detectedFramework,
  });

  if (isCancel(frameworkResult)) {
    cancel(pc.red("Operation cancelled."));
    process.exit(0);
  }

  return frameworkResult;
}

async function detectFrameworkFromPackageJson(
  cwd: string,
): Promise<TemplateType> {
  const packageJsonPath = resolve(cwd, "package.json");

  try {
    const packageJson = await fs.readJson(packageJsonPath);
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies,
    };

    if ("rwsdk" in allDeps) {
      return "rwsdk";
    }

    if ("astro" in allDeps) {
      return "astro";
    }

    if ("nuxt" in allDeps) {
      return "nuxt";
    }

    if ("react-router" in allDeps) {
      return "react-router";
    }

    if ("@sveltejs/kit" in allDeps) {
      return "sveltekit";
    }

    if ("@tanstack/react-start" in allDeps) {
      return "tanstack-start";
    }

    if ("vite" in allDeps) {
      return "vite";
    }

    return "typescript";
  } catch (_error) {
    return "typescript";
  }
}

async function checkExistingAlchemyFiles(context: InitContext) {
  const alchemyRunTs = resolve(context.cwd, "alchemy.run.ts");
  const alchemyRunJs = resolve(context.cwd, "alchemy.run.js");

  const tsExists = await fs.pathExists(alchemyRunTs);
  const jsExists = await fs.pathExists(alchemyRunJs);

  if (tsExists || jsExists) {
    const existingFile = tsExists ? "alchemy.run.ts" : "alchemy.run.js";
    const overwriteResult = await confirm({
      message: `${pc.yellow(existingFile)} already exists. Overwrite?`,
      initialValue: false,
    });

    if (isCancel(overwriteResult)) {
      cancel(pc.red("Operation cancelled."));
      process.exit(0);
    }

    if (!overwriteResult) {
      outro(pc.yellow("Initialization cancelled."));
      process.exit(0);
    }
  }
}

async function copyAlchemyRunFile(context: InitContext) {
  try {
    const templatePath = resolve(
      PKG_ROOT,
      "templates",
      context.framework,
      "alchemy.run.ts",
    );

    if (!(await fs.pathExists(templatePath))) {
      throw new Error(`Template not found for framework: ${context.framework}`);
    }

    let content = await fs.readFile(templatePath, "utf-8");

    content = content.replace(/my-alchemy-app/g, context.projectName);

    const outputFileName = context.useTypeScript
      ? "alchemy.run.ts"
      : "alchemy.run.js";
    const outputPath = resolve(context.cwd, outputFileName);

    if (!context.useTypeScript) {
      content = content.replace(
        /\/\/\/ <reference types="@types\/node" \/>\n\n/,
        "",
      );
    }

    await fs.writeFile(outputPath, content, "utf-8");
  } catch (error) {
    throwWithContext(error, "Failed to create alchemy.run file");
  }
}

async function updatePackageJson(context: InitContext) {
  try {
    const frameworkDeps = getFrameworkDependencies(context.framework);
    await addPackageDependencies({
      devDependencies: ["alchemy", ...frameworkDeps],
      projectDir: context.cwd,
    });

    const packageJsonPath = resolve(context.cwd, "package.json");
    const packageJson = await fs.readJson(packageJsonPath);

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    const scripts = {
      deploy: "alchemy deploy",
      destroy: "alchemy destroy",
      "alchemy:dev": "alchemy dev",
    };

    for (const [script, command] of Object.entries(scripts)) {
      if (!packageJson.scripts[script]) {
        packageJson.scripts[script] = command;
      }
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  } catch (error) {
    throwWithContext(error, "Failed to update package.json");
  }
}

function getFrameworkDependencies(
  framework: TemplateType,
): DependencyVersionMap[] {
  const deps: DependencyVersionMap[] = [];

  switch (framework) {
    case "astro":
      deps.push("@cloudflare/workers-types", "wrangler", "@astrojs/cloudflare");
      break;
    case "vite":
    case "react-router":
      deps.push(
        "@cloudflare/workers-types",
        "wrangler",
        "miniflare",
        "@cloudflare/vite-plugin",
      );
      break;
    case "tanstack-start":
      deps.push("@cloudflare/workers-types", "wrangler", "miniflare");
      break;
    case "sveltekit":
      deps.push(
        "@cloudflare/workers-types",
        "wrangler",
        "@sveltejs/adapter-cloudflare",
      );
      break;
    case "nuxt":
      deps.push(
        "@cloudflare/workers-types",
        "wrangler",
        "nitro-cloudflare-dev",
      );
      break;
    case "typescript":
    case "rwsdk":
      deps.push("@cloudflare/workers-types", "wrangler", "miniflare");
      break;
  }

  return deps;
}

async function copyFrameworkSpecificFiles(context: InitContext) {
  try {
    if (context.framework === "react-router") {
      const reactRouterWorkersPath = resolve(
        PKG_ROOT,
        "templates",
        "react-router",
        "workers",
      );
      const reactRouterWorkersDestPath = resolve(context.cwd, "workers");

      if (await fs.pathExists(reactRouterWorkersPath)) {
        await fs.copy(reactRouterWorkersPath, reactRouterWorkersDestPath);
      }
    }

    const viteFrameworks = [
      "vite",
      "react-router",
      "tanstack-start",
      "astro",
      "sveltekit",
      "rwsdk",
    ];

    if (viteFrameworks.includes(context.framework)) {
      const wranglerTemplatePath = resolve(
        PKG_ROOT,
        "templates",
        context.framework,
        "wrangler.jsonc",
      );

      if (await fs.pathExists(wranglerTemplatePath)) {
        let content = await fs.readFile(wranglerTemplatePath, "utf-8");
        content = content.replace(/my-alchemy-app/g, context.projectName);

        const outputPath = resolve(context.cwd, "wrangler.jsonc");
        await fs.writeFile(outputPath, content, "utf-8");
      }
    }

    await editFrameworkConfigFiles(context);

    await updateTsConfigFiles(context);
  } catch (error) {
    throwWithContext(error, "Failed to copy framework-specific files");
  }
}

async function editFrameworkConfigFiles(context: InitContext) {
  const project = new Project();

  switch (context.framework) {
    case "astro":
      await editAstroConfig(context, project);
      break;
    case "vite":
      await editViteConfig(context, project);
      break;
    case "react-router":
      await editReactRouterConfig(context, project);
      break;
    case "sveltekit":
      await editSvelteKitConfig(context, project);
      break;
    case "tanstack-start":
      await editTanStackStartConfig(context, project);
      break;
    case "nuxt":
      await editNuxtConfig(context, project);
      break;
  }
}

async function editAstroConfig(context: InitContext, project: Project) {
  const configPath = resolve(context.cwd, "astro.config.mjs");
  if (await fs.pathExists(configPath)) {
    const sourceFile = project.addSourceFileAtPath(configPath);

    const imports = sourceFile.getImportDeclarations();
    const hasCloudflareImport = imports.some(
      (imp) => imp.getModuleSpecifierValue() === "@astrojs/cloudflare",
    );

    if (!hasCloudflareImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: "@astrojs/cloudflare",
        defaultImport: "cloudflare",
      });
    }

    const exportDefault = sourceFile.getExportAssignments()[0];
    if (exportDefault) {
      const callExpression = exportDefault.getExpression();
      if (callExpression.getKind() === SyntaxKind.CallExpression) {
        const args = callExpression
          .asKindOrThrow(SyntaxKind.CallExpression)
          .getArguments();
        if (args.length > 0) {
          const configObj = args[0];
          if (configObj.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const objLiteral = configObj.asKindOrThrow(
              SyntaxKind.ObjectLiteralExpression,
            );

            const outputProp = objLiteral.getProperty("output");
            if (!outputProp) {
              objLiteral.addPropertyAssignment({
                name: "output",
                initializer: "'server'",
              });
            }

            const adapterProp = objLiteral.getProperty("adapter");
            if (!adapterProp) {
              objLiteral.addPropertyAssignment({
                name: "adapter",
                initializer: "cloudflare()",
              });
            }
          }
        }
      }
    }

    await sourceFile.save();
  }
}

async function editViteConfig(context: InitContext, project: Project) {
  const configPath = resolve(context.cwd, "vite.config.ts");
  if (await fs.pathExists(configPath)) {
    const sourceFile = project.addSourceFileAtPath(configPath);

    const imports = sourceFile.getImportDeclarations();
    const hasCloudflareImport = imports.some(
      (imp) => imp.getModuleSpecifierValue() === "@cloudflare/vite-plugin",
    );

    if (!hasCloudflareImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: "@cloudflare/vite-plugin",
        namedImports: ["cloudflare"],
      });
    }

    const exportDefault = sourceFile.getExportAssignments()[0];
    if (exportDefault) {
      const callExpression = exportDefault.getExpression();
      if (callExpression.getKind() === SyntaxKind.CallExpression) {
        const args = callExpression
          .asKindOrThrow(SyntaxKind.CallExpression)
          .getArguments();
        if (args.length > 0) {
          const configObj = args[0];
          if (configObj.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const objLiteral = configObj.asKindOrThrow(
              SyntaxKind.ObjectLiteralExpression,
            );
            const pluginsProp = objLiteral.getProperty("plugins");

            if (
              pluginsProp &&
              pluginsProp.getKind() === SyntaxKind.PropertyAssignment
            ) {
              const pluginsAssignment = pluginsProp.asKindOrThrow(
                SyntaxKind.PropertyAssignment,
              );
              const pluginsValue = pluginsAssignment.getInitializer();

              if (
                pluginsValue &&
                pluginsValue.getKind() === SyntaxKind.ArrayLiteralExpression
              ) {
                const pluginsArray = pluginsValue.asKindOrThrow(
                  SyntaxKind.ArrayLiteralExpression,
                );
                const hasCloudflarePlugin = pluginsArray
                  .getElements()
                  .some((element) =>
                    element.getText().includes("cloudflare()"),
                  );

                if (!hasCloudflarePlugin) {
                  pluginsArray.addElement("cloudflare()");
                }
              }
            } else if (!pluginsProp) {
              objLiteral.addPropertyAssignment({
                name: "plugins",
                initializer: "[cloudflare()]",
              });
            }
          }
        }
      }
    }

    await sourceFile.save();
  }
}

async function editReactRouterConfig(context: InitContext, project: Project) {
  await editViteConfig(context, project);

  const reactRouterWorkersPath = resolve(
    PKG_ROOT,
    "templates",
    "react-router",
    "workers",
  );
  const reactRouterWorkersDestPath = resolve(context.cwd, "workers");

  if (await fs.pathExists(reactRouterWorkersPath)) {
    await fs.copy(reactRouterWorkersPath, reactRouterWorkersDestPath);
  }
}

async function editSvelteKitConfig(context: InitContext, project: Project) {
  const configPath = resolve(context.cwd, "svelte.config.js");
  if (await fs.pathExists(configPath)) {
    const sourceFile = project.addSourceFileAtPath(configPath);

    const imports = sourceFile.getImportDeclarations();
    const hasAdapterImport = imports.some(
      (imp) => imp.getModuleSpecifierValue() === "@sveltejs/adapter-cloudflare",
    );

    if (!hasAdapterImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: "@sveltejs/adapter-cloudflare",
        defaultImport: "adapter",
      });
    }

    const exportDefault = sourceFile.getExportAssignments()[0];
    if (exportDefault) {
      const configObj = exportDefault.getExpression();
      if (configObj.getKind() === SyntaxKind.ObjectLiteralExpression) {
        const objLiteral = configObj.asKindOrThrow(
          SyntaxKind.ObjectLiteralExpression,
        );
        const kitProp = objLiteral.getProperty("kit");

        if (kitProp && kitProp.getKind() === SyntaxKind.PropertyAssignment) {
          const kitAssignment = kitProp.asKindOrThrow(
            SyntaxKind.PropertyAssignment,
          );
          const kitValue = kitAssignment.getInitializer();

          if (
            kitValue &&
            kitValue.getKind() === SyntaxKind.ObjectLiteralExpression
          ) {
            const kitObj = kitValue.asKindOrThrow(
              SyntaxKind.ObjectLiteralExpression,
            );
            const adapterProp = kitObj.getProperty("adapter");

            if (!adapterProp) {
              kitObj.addPropertyAssignment({
                name: "adapter",
                initializer: "adapter()",
              });
            }
          }
        } else if (!kitProp) {
          objLiteral.addPropertyAssignment({
            name: "kit",
            initializer: "{ adapter: adapter() }",
          });
        }
      }
    }

    await sourceFile.save();
  }
}

async function editTanStackStartConfig(context: InitContext, project: Project) {
  const configPath = resolve(context.cwd, "vite.config.ts");
  if (await fs.pathExists(configPath)) {
    const sourceFile = project.addSourceFileAtPath(configPath);

    const imports = sourceFile.getImportDeclarations();
    const hasAlchemyImport = imports.some(
      (imp) => imp.getModuleSpecifierValue() === "alchemy/cloudflare",
    );

    if (!hasAlchemyImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: "alchemy/cloudflare",
        namedImports: ["cloudflareWorkersDevEnvironmentShim"],
      });
    }

    const exportDefault = sourceFile.getExportAssignments()[0];
    if (exportDefault) {
      const callExpression = exportDefault.getExpression();
      if (callExpression.getKind() === SyntaxKind.CallExpression) {
        const args = callExpression
          .asKindOrThrow(SyntaxKind.CallExpression)
          .getArguments();
        if (args.length > 0) {
          const configObj = args[0];
          if (configObj.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const objLiteral = configObj.asKindOrThrow(
              SyntaxKind.ObjectLiteralExpression,
            );
            const pluginsProp = objLiteral.getProperty("plugins");

            if (
              pluginsProp &&
              pluginsProp.getKind() === SyntaxKind.PropertyAssignment
            ) {
              const pluginsAssignment = pluginsProp.asKindOrThrow(
                SyntaxKind.PropertyAssignment,
              );
              const pluginsValue = pluginsAssignment.getInitializer();

              if (
                pluginsValue &&
                pluginsValue.getKind() === SyntaxKind.ArrayLiteralExpression
              ) {
                const pluginsArray = pluginsValue.asKindOrThrow(
                  SyntaxKind.ArrayLiteralExpression,
                );

                let hasTanStackStart = false;
                let hasCloudflareShim = false;
                const elements = pluginsArray.getElements();

                for (const element of elements) {
                  const elementText = element.getText();

                  if (elementText.includes("tanstackStart")) {
                    hasTanStackStart = true;

                    if (!elementText.includes("cloudflare-module")) {
                      if (element.getKind() === SyntaxKind.CallExpression) {
                        const callExpr = element.asKindOrThrow(
                          SyntaxKind.CallExpression,
                        );
                        const callArgs = callExpr.getArguments();

                        if (
                          callArgs.length > 0 &&
                          callArgs[0].getKind() ===
                            SyntaxKind.ObjectLiteralExpression
                        ) {
                          const configObj = callArgs[0].asKindOrThrow(
                            SyntaxKind.ObjectLiteralExpression,
                          );
                          const targetProp = configObj.getProperty("target");

                          if (!targetProp) {
                            configObj.addPropertyAssignment({
                              name: "target",
                              initializer: '"cloudflare-module"',
                            });
                          } else if (
                            targetProp.getKind() ===
                            SyntaxKind.PropertyAssignment
                          ) {
                            const targetAssignment = targetProp.asKindOrThrow(
                              SyntaxKind.PropertyAssignment,
                            );
                            targetAssignment.setInitializer(
                              '"cloudflare-module"',
                            );
                          }
                        } else if (callArgs.length === 0) {
                          callExpr.addArgument(
                            '{ target: "cloudflare-module" }',
                          );
                        }
                      }
                    }
                  }

                  if (
                    elementText.includes("cloudflareWorkersDevEnvironmentShim")
                  ) {
                    hasCloudflareShim = true;
                  }
                }

                if (!hasCloudflareShim) {
                  pluginsArray.addElement(
                    "cloudflareWorkersDevEnvironmentShim()",
                  );
                }

                if (!hasTanStackStart) {
                  const hasTanStackImport = imports.some(
                    (imp) =>
                      imp.getModuleSpecifierValue() ===
                      "@tanstack/react-start/plugin/vite",
                  );

                  if (!hasTanStackImport) {
                    sourceFile.addImportDeclaration({
                      moduleSpecifier: "@tanstack/react-start/plugin/vite",
                      namedImports: ["tanstackStart"],
                    });
                  }

                  pluginsArray.addElement(
                    'tanstackStart({ target: "cloudflare-module" })',
                  );
                }
              }
            } else if (!pluginsProp) {
              objLiteral.addPropertyAssignment({
                name: "plugins",
                initializer:
                  '[cloudflareWorkersDevEnvironmentShim(), tanstackStart({ target: "cloudflare-module" })]',
              });

              const hasTanStackImport = imports.some(
                (imp) =>
                  imp.getModuleSpecifierValue() ===
                  "@tanstack/react-start/plugin/vite",
              );

              if (!hasTanStackImport) {
                sourceFile.addImportDeclaration({
                  moduleSpecifier: "@tanstack/react-start/plugin/vite",
                  namedImports: ["tanstackStart"],
                });
              }
            }
          }
        }
      }
    }

    await sourceFile.save();
  }
}

async function editNuxtConfig(context: InitContext, project: Project) {
  const configPath = resolve(context.cwd, "nuxt.config.ts");
  if (await fs.pathExists(configPath)) {
    const sourceFile = project.addSourceFileAtPath(configPath);

    const exportDefault = sourceFile.getExportAssignments()[0];
    if (exportDefault) {
      const callExpression = exportDefault.getExpression();
      if (callExpression.getKind() === SyntaxKind.CallExpression) {
        const args = callExpression
          .asKindOrThrow(SyntaxKind.CallExpression)
          .getArguments();
        if (args.length > 0) {
          const configObj = args[0];
          if (configObj.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const objLiteral = configObj.asKindOrThrow(
              SyntaxKind.ObjectLiteralExpression,
            );
            const nitroProp = objLiteral.getProperty("nitro");

            if (!nitroProp) {
              objLiteral.addPropertyAssignment({
                name: "nitro",
                initializer: `{
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  }`,
              });
            }

            const modulesProp = objLiteral.getProperty("modules");
            if (
              modulesProp &&
              modulesProp.getKind() === SyntaxKind.PropertyAssignment
            ) {
              const modulesAssignment = modulesProp.asKindOrThrow(
                SyntaxKind.PropertyAssignment,
              );
              const modulesValue = modulesAssignment.getInitializer();

              if (
                modulesValue &&
                modulesValue.getKind() === SyntaxKind.ArrayLiteralExpression
              ) {
                const modulesArray = modulesValue.asKindOrThrow(
                  SyntaxKind.ArrayLiteralExpression,
                );
                const hasNitroCloudflare = modulesArray
                  .getElements()
                  .some((element) =>
                    element.getText().includes("nitro-cloudflare-dev"),
                  );

                if (!hasNitroCloudflare) {
                  modulesArray.addElement('"nitro-cloudflare-dev"');
                }
              }
            } else if (!modulesProp) {
              objLiteral.addPropertyAssignment({
                name: "modules",
                initializer: '["nitro-cloudflare-dev"]',
              });
            }
          }
        }
      }
    }

    await sourceFile.save();
  }
}

async function updateTsConfigFiles(context: InitContext) {
  const tsConfigPaths = [resolve(context.cwd, "tsconfig.json")];

  for (const tsConfigPath of tsConfigPaths) {
    if (await fs.pathExists(tsConfigPath)) {
      try {
        const content = await fs.readFile(tsConfigPath, "utf-8");
        const config = JSON.parse(content);

        if (!config.compilerOptions) {
          config.compilerOptions = {};
        }

        if (!config.compilerOptions.types) {
          config.compilerOptions.types = [];
        }

        const requiredTypes = ["@cloudflare/workers-types", "./types/env.d.ts"];
        for (const type of requiredTypes) {
          if (!config.compilerOptions.types.includes(type)) {
            config.compilerOptions.types.push(type);
          }
        }

        if (!config.include) {
          config.include = [];
        }
        if (!config.include.includes("alchemy.run.ts")) {
          config.include.unshift("alchemy.run.ts");
        }

        await fs.writeJson(tsConfigPath, config, { spaces: 2 });
      } catch (error) {
        console.warn(`Failed to update ${tsConfigPath}:`, error);
      }
    }
  }
}

function displaySuccessMessage(context: InitContext): void {
  const fileExtension = context.useTypeScript ? "ts" : "js";
  const runFile = `alchemy.run.${fileExtension}`;

  const filesCreated = [`   ${runFile} - Your infrastructure configuration`];

  const frameworkFiles: Record<TemplateType, string[]> = {
    astro: ["wrangler.jsonc"],
    vite: ["wrangler.jsonc"],
    "react-router": ["wrangler.jsonc", "workers/ directory"],
    sveltekit: ["wrangler.jsonc"],
    "tanstack-start": ["wrangler.jsonc"],
    nuxt: [],
    typescript: ["wrangler.jsonc"],
    rwsdk: ["wrangler.jsonc"],
  };

  const additionalFiles = frameworkFiles[context.framework] || [];
  for (const file of additionalFiles) {
    const description =
      file === "wrangler.jsonc"
        ? "Cloudflare Worker configuration"
        : file.includes("workers")
          ? "Worker files"
          : "Configuration file";
    filesCreated.push(`   ${file} - ${description}`);
  }

  if (context.framework !== "typescript" && context.framework !== "rwsdk") {
    filesCreated.push(
      "   Updated framework config with Cloudflare integration",
    );
  }
  filesCreated.push("   Updated tsconfig.json files with Alchemy types");

  note(`${pc.cyan("📁 Files created:")}
${filesCreated.join("\n")}

${pc.cyan("🚀 Next steps:")}
   Edit ${runFile} to configure your infrastructure
   Run ${pc.yellow("npm run deploy")} to deploy
   Run ${pc.yellow("npm run destroy")} to clean up

${pc.cyan("📚 Learn more:")}
   https://alchemy.run`);

  outro(pc.green("Alchemy initialized successfully!"));
}

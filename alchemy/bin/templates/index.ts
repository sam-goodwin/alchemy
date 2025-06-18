import type { ProjectContext, Template, WebsiteOptions } from "../types.ts";
import {
  appendEnv,
  appendGitignore,
  cleanupWrangler,
  createEnvTs,
  initWranglerRunTs,
  install,
  modifyPackageJson,
  modifyTsConfig,
} from "../utils.ts";
import initAstroProject from "./astro.ts";
import initNuxtProject from "./nuxt.ts";
import initReactRouterProject from "./react-router.ts";
import initRedwoodProject from "./redwood.ts";
import initSvelteKitProject from "./sveltekit.ts";
import initTanstackStartProject from "./tanstack-start.ts";
import initTypescriptProject from "./typescript.ts";
import initViteProject from "./vite.ts";

export const templates: Template[] = [
  {
    name: "typescript",
    description: "Basic TypeScript Worker project",
    init: initTypescriptProject,
  },
  {
    name: "vite",
    description: "React Vite.js application",
    init: initViteProject,
  },
  {
    name: "astro",
    description: "Astro application with SSR",
    init: initAstroProject,
  },
  {
    name: "react-router",
    description: "React Router application",
    init: initReactRouterProject,
  },
  {
    name: "sveltekit",
    description: "SvelteKit application",
    init: initSvelteKitProject,
  },
  {
    name: "tanstack-start",
    description: "TanStack Start application",
    init: initTanstackStartProject,
  },
  {
    name: "rwsdk",
    description: "Redwood SDK application",
    init: initRedwoodProject,
  },
  {
    name: "nuxt",
    description: "Nuxt.js application",
    init: initNuxtProject,
  },
];

export async function initWebsiteProjectWithContext(
  context: ProjectContext,
  options: WebsiteOptions = {},
): Promise<void> {
  await createEnvTs(context.path);
  await cleanupWrangler(context.path);
  await modifyTsConfig(context.path, options);
  await modifyPackageJson(context, options?.scripts);

  await initWranglerRunTs(context, options);

  await appendGitignore(context.path);
  await appendEnv(context.path);

  install(context, {
    dependencies: options.dependencies,
    devDependencies: [
      "@cloudflare/workers-types",
      context.alchemyVersion,
      ...(context.packageManager === "bun" ? [] : ["tsx"]),
      "typescript",
      ...(options.devDependencies ?? []),
    ],
  });
}

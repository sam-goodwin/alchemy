import { execa } from "execa";
import * as fs from "node:fs/promises";
import { join } from "node:path";
import type { ProjectContext } from "../types.ts";
import {
  appendGitignore,
  createEnvTs,
  getPackageManagerCommands,
  initWranglerRunTs,
  install,
  mkdir,
  throwWithContext,
  writeJsonFile,
} from "../utils.ts";

export default async function initTypescriptProject(
  context: ProjectContext,
): Promise<void> {
  try {
    await mkdir(context.path);

    const commands = getPackageManagerCommands(context.packageManager);

    await execa(commands.init, {
      cwd: context.path,
      shell: true,
      stdio: "inherit",
    });

    await createEnvTs(context.path);
    await initWranglerRunTs(context, {
      entrypoint: "./src/worker.ts",
    });
    await appendGitignore(context.path);

    await mkdir(context.path, "src");

    try {
      await fs.writeFile(
        join(context.path, "src", "worker.ts"),
        `export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return new Response(JSON.stringify({
      message: "Hello from Alchemy TypeScript Worker!",
      timestamp: new Date().toISOString(),
      url: request.url,
      method: request.method,
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
} satisfies ExportedHandler<Env>;
`,
      );
    } catch (error) {
      throwWithContext(error, "Failed to create worker.ts");
    }

    try {
      await writeJsonFile(join(context.path, "tsconfig.json"), {
        compilerOptions: {
          target: "es2022",
          lib: ["es2022"],
          module: "esnext",
          moduleResolution: "bundler",
          types: ["@cloudflare/workers-types"],
          resolveJsonModule: true,
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
          skipLibCheck: true,
          strict: true,
        },
        include: ["src/**/*.ts", "alchemy.run.ts"],
      });
    } catch (error) {
      throwWithContext(error, "Failed to create tsconfig.json");
    }

    const isUsingBun = context.packageManager === "bun";
    const deployCommand = isUsingBun
      ? "bun --env-file=./.env ./alchemy.run.ts"
      : "tsx --env-file=./.env ./alchemy.run.ts";
    const destroyCommand = isUsingBun
      ? "bun --env-file=./.env ./alchemy.run.ts --destroy"
      : "tsx --env-file=./.env ./alchemy.run.ts --destroy";

    try {
      await writeJsonFile(join(context.path, "package.json"), {
        name: context.name,
        type: "module",
        scripts: {
          dev: "wrangler dev src/worker.ts",
          deploy: deployCommand,
          destroy: destroyCommand,
        },
        devDependencies: {
          "@cloudflare/workers-types": "^4.20241106.0",
          typescript: "^5.6.3",
          wrangler: "^3.84.1",
          ...(isUsingBun ? {} : { tsx: "^4.19.2" }),
        },
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to create package.json: ${errorMsg}`);
    }

    try {
      install(context, {
        devDependencies: [
          "@cloudflare/workers-types",
          context.alchemyVersion,
          ...(isUsingBun ? [] : ["tsx"]),
          "typescript",
        ],
      });
    } catch (error) {
      throwWithContext(error, "Failed to install dependencies");
    }
  } catch (error) {
    throwWithContext(error, "TypeScript template initialization failed");
  }
}

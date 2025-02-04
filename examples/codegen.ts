import { alchemize } from "alchemy";
import {
  PackageJson,
  Requirements,
  TypeScriptConfig,
  TypeScriptFile,
} from "alchemy/agent";

import "dotenv/config";

const requirements = new Requirements("requirements", {
  path: ".out/requirements.md",
  title: "A simple TODO application",
  requirements: [
    "The application must be able to create, read, update, and delete TODO items",
    "The application must be able to list all TODO items",
    "The application must be able to mark a TODO item as complete",
    "Build the app with Bun's HTTP server. https://bun.sh/guides/ecosystem/express",
    "Store state in memory, we don't care about persistence",
    "The web server should be a simple express server",
  ],
});

const packageJson = new PackageJson("package.json", {
  path: ".out/package.json",
  requirements: [requirements.content],
  name: "alchemy-todo-app",
});

const tsconfig = new TypeScriptConfig("tsconfig.json", {
  path: ".out/tsconfig.json",
  requirements: [requirements.content],
});

const server = new TypeScriptFile("server.ts", {
  path: ".out/server.ts",
  requirements: requirements.content,
});

await alchemize({
  stage: "codegen",
  mode: process.argv.includes("destroy") ? "destroy" : "up",
});

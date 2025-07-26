import { createCli } from "trpc-cli";
import { create } from "./commands/create.ts";
import { deploy } from "./commands/deploy.ts";
import { destroy } from "./commands/destroy.ts";
import { dev } from "./commands/dev.ts";
import { login } from "./commands/login.ts";
import { run } from "./commands/run.ts";
import { init } from "./commands/init.ts";
import { getPackageVersion } from "./services/get-package-version.ts";
import { t } from "./trpc.ts";

const router = t.router({
  create,
  init,
  login,
  deploy,
  destroy,
  dev,
  run,
});

export type AppRouter = typeof router;

const cli = createCli({
  router,
  name: "alchemy",
  version: getPackageVersion(),
  description:
    "🧪 Welcome to Alchemy! Creating infrastructure as code with JavaScript and TypeScript.",
});

cli.run();

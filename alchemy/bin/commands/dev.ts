import { zod as z } from "trpc-cli";
import {
  entrypoint,
  execAlchemy,
  execArgs,
} from "../services/execute-alchemy.ts";
import { t } from "../trpc.ts";

export const dev = t.procedure
  .meta({
    description:
      "Run an Alchemy program in dev-mode (local simulation & hot reloading)",
  })
  .input(z.tuple([entrypoint, z.object(execArgs).optional().default({})]))
  .mutation(async ({ input: [main, options] }) =>
    execAlchemy(main, {
      ...options,
      dev: true,
      watch: true,
    }),
  );

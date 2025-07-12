import { zod as z } from "trpc-cli";
import {
  entrypoint,
  execAlchemy,
  execArgs,
} from "../services/execute-alchemy.ts";
import { t } from "../trpc.ts";

export const destroy = t.procedure
  .meta({
    description: "Deploy an Alchemy project",
  })
  .input(z.tuple([entrypoint, z.object(execArgs).optional().default({})]))
  .mutation(async ({ input: [main, options] }) =>
    execAlchemy(main, {
      ...options,
      destroy: true,
    }),
  );

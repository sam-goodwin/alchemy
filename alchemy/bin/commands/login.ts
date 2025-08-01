import { cancel, intro, log, outro } from "@clack/prompts";
import pc from "picocolors";
import { zod as z } from "trpc-cli";
import { DEFAULT_SCOPES, wranglerLogin } from "../../src/cloudflare/oauth.ts";
import { throwWithContext } from "../errors.ts";
import { loggedProcedure, ExitSignal } from "../trpc.ts";

export const login = loggedProcedure
  .meta({
    description: "Login to Cloudflare",
  })
  .input(
    z.tuple([
      z.object({
        scopes: z
          .array(z.string())
          .optional()
          .default([])
          .describe("Cloudflare OAuth scopes to authorize"),
        defaultScopes: z
          .boolean()
          .optional()
          .default(true)
          .describe(
            "Whether to include the default Wrangler scopes when authenticating",
          ),
      }),
    ]),
  )
  .mutation(async ({ input: [options] }) => {
    try {
      intro(pc.cyan("🔐 Cloudflare Login"));

      const scopes = options.defaultScopes
        ? Array.from(new Set([...DEFAULT_SCOPES, ...options.scopes]))
        : options.scopes;
      if (scopes.length === 0) {
        cancel(
          "No scopes provided. Please provide at least one scope or remove the --exclude-default-scopes flag.",
        );
        return;
      }
      const result = await wranglerLogin(scopes, (message) => {
        log.step(message);
      });

      if (result.isErr()) {
        throwWithContext(result.error, "Login failed");
      }

      outro(pc.green("✅ Login successful!"));
    } catch (error) {
      if (error instanceof Error) {
        log.error(`${pc.red("Error:")} ${error.message}`);
        if (error.stack && process.env.DEBUG) {
          log.error(`${pc.gray("Stack trace:")}\n${error.stack}`);
        }
      } else {
        log.error(pc.red(String(error)));
      }
      throw new ExitSignal(1);
    }
  });

import { cancel, intro, log, outro } from "@clack/prompts";
import pc from "picocolors";
import {
  DEFAULT_SCOPES,
  wranglerLogin,
} from "../../src/cloudflare/auth-wrangler.ts";
import { throwWithContext } from "../errors.ts";

export async function runLogin(input: {
  scopes: string[];
  defaultScopes: boolean;
}) {
  try {
    intro(pc.cyan("🔐 Cloudflare Login"));

    const scopes = input.defaultScopes
      ? Array.from(new Set([...DEFAULT_SCOPES, ...input.scopes]))
      : input.scopes;
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
    process.exit(1);
  }
}

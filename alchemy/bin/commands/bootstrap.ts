import {
  intro,
  log,
  outro,
  spinner,
} from "@clack/prompts";
import { randomBytes } from "node:crypto";
import pc from "picocolors";

import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { upsertStateStoreWorker } from "../../src/cloudflare/do-state-store/internal.ts";
import { throwWithContext } from "../errors.ts";
import type { BootstrapInput } from "../types.ts";

const isTest = process.env.NODE_ENV === "test";

function generateSecureToken(): string {
  // Generate a 32-byte random token and encode as base64url
  return randomBytes(32).toString("base64url");
}

function displayTokenInstructions(token: string): void {
  log.info(`
${pc.cyan("📋 Setup Instructions:")}

Add the following line to your ${pc.yellow(".env")} file:

${pc.green(`ALCHEMY_STATE_TOKEN=${token}`)}

${pc.gray("If you don't have a .env file, create one in your project root.")}`);
}

export async function bootstrapAlchemy(
  cliOptions: BootstrapInput,
): Promise<void> {
  try {
    intro(pc.cyan("🧪 Alchemy Bootstrap"));
    log.info("Setting up Cloudflare DOStateStore...");

    const options = { yes: isTest, ...cliOptions };


    // Generate secure token
    const s = spinner();
    s.start("Generating secure token...");
    const token = generateSecureToken();
    s.stop("Token generated");

    // Create Cloudflare API client
    s.start("Connecting to Cloudflare API...");
    const api = await createCloudflareApi();
    s.stop(`Connected to Cloudflare account: ${pc.green(api.accountId)}`);

    // Deploy DOStateStore worker
    const workerName = `alchemy-state-store-${api.accountId}`;
    s.start(`Deploying DOStateStore worker (${workerName})...`);
    
    await upsertStateStoreWorker(
      api,
      workerName,
      token,
      options.force ?? false,
    );
    
    s.stop(`DOStateStore worker deployed: ${pc.green(workerName)}`);

    // Display token instructions
    displayTokenInstructions(token);

    log.info(`Worker URL: ${pc.cyan(`https://${workerName}.${api.accountId}.workers.dev`)}`);

    outro(pc.green("✅ Bootstrap completed successfully!"));
    
    log.info(`
${pc.cyan("Next steps:")}
1. Add the token to your ${pc.yellow(".env")} file (see instructions above)
2. Create your ${pc.yellow("alchemy.run.ts")} file
3. Use ${pc.yellow("DOStateStore")} as your state store
4. Run ${pc.yellow("bun ./alchemy.run.ts")} to deploy your app

${pc.cyan("Example alchemy.run.ts:")}
${pc.gray(`import { alchemy } from "alchemy";
import { DOStateStore } from "alchemy/cloudflare";

const app = alchemy({
  name: "my-app",
  stateStore: (scope) => new DOStateStore(scope),
});

// Your resources here...

export default app;`)}
`);

  } catch (error) {
    log.error("Bootstrap failed:");
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
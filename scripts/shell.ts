import { exec } from "../alchemy/src/os/exec.js";
import { website } from "../stacks/src/website.run.ts";

const command = process.argv.slice(2).join(" ");

if (!command) {
  console.error("No command provided");
  process.exit(1);
}

await exec(command, {
  env: {
    WEBSITE_URL: website.url,
  },
});

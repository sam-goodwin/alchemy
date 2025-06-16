#!/usr/bin/env node
import { parseArgs } from "node:util";
import { createAlchemy } from "./create-alchemy.ts";

// Parse command-line arguments. We allow unknown flags because different
// sub-commands may accept different sets.
const { values, positionals } = parseArgs({
  allowPositionals: true,
  // We keep the option list flat – sub-commands will decide which ones they care about.
  options: {
    template: { type: "string" },
    yes: { type: "boolean", short: "y" },
    overwrite: { type: "boolean" },
    help: { type: "boolean", short: "h" },
    version: { type: "boolean", short: "v" },
  },
});

// First positional is the sub-command (e.g. `create`)
const command = positionals.shift();

const usage = `Usage: alchemy <command> [options]

Available commands:
  create    Scaffold a new project
`;

if (!command) {
  console.error(usage);
  process.exit(1);
}

switch (command) {
  case "create": {
    // The first remaining positional is treated as the project name.
    const name = positionals.shift();

    // If the user explicitly requested help or version, forward the flags even
    // when no project name is provided so the underlying handler can display
    // the appropriate information.
    if (values.help || values.version) {
      await createAlchemy({
        name,
        template: values.template as string | undefined,
        yes: values.yes as boolean | undefined,
        overwrite: values.overwrite as boolean | undefined,
        help: values.help as boolean | undefined,
        version: values.version as boolean | undefined,
      });
      break;
    }

    await createAlchemy({
      name,
      template: values.template as string | undefined,
      yes: values.yes as boolean | undefined,
      overwrite: values.overwrite as boolean | undefined,
      help: values.help as boolean | undefined,
      version: values.version as boolean | undefined,
    });
    break;
  }

  default:
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}

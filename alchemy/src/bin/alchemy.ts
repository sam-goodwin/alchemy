#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";

// Get the module path from command line args or use default
const modulePath = process.argv[2] || "./rules.config.ts";

// Resolve the path relative to current working directory
const resolvedPath = path.resolve(process.cwd(), modulePath);

// Dynamically import the module
const module = await import(resolvedPath);

interface Rule {
  match: string[];
  rule: string;
}

const rules = module.default;

if (typeof rules !== "object") {
  console.error(`${modulePath} must export an object, got ${typeof rules}`);
  process.exit(1);
}

await fs.mkdir(".cursor/rules", { recursive: true });

for (const [name, rule] of Object.entries(
  rules as Record<
    string,
    {
      globs: string[];
      rule: Rule;
    }
  >
)) {
  const rulePath = path.resolve(".cursor/rules", `${name}.mdc`);

  console.log(`Installed: ${rulePath}`);

  await fs.writeFile(
    rulePath,
    `---
description: Global Rule. This rule should ALWAYS be loaded.
globs: ${rule.globs.join(",")}
alwaysApply: false
---
${rule.rule}
`
  );
}

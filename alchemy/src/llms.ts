import fs from "node:fs";
import path from "node:path";

export interface AlchemyRule {
  name: string;
  rule: string;
  description?: string;
  alwaysApply?: boolean;
  globs?: string | string[];
}

const alchemy: AlchemyRule = {
  name: "cloudflare",
  description: "Core Alchemy development guidelines and patterns",
  alwaysApply: true,
  globs: ["*.ts"],
  // removed for cjs compatibility: top-level await fs.readFile()
  rule: fs.readFileSync(
    path.join(import.meta.dirname, "llms.cloudflare.txt"),
    "utf-8",
  ),
};

const alchemyRules: AlchemyRule[] = [alchemy];

export default alchemyRules;

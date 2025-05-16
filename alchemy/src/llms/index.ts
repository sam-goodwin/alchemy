import type { PackageRuleItem } from "vibe-rules";
import { alchemyAwsRules } from "./rules/alchemy-aws.js";
import { alchemyCloudflareRules } from "./rules/alchemy-cloudflare.js";
import { whatIsAlchemy } from "./rules/alchemy-introduction.js";

const rules: PackageRuleItem[] = [
  {
    name: "alchemy-what-is-alchemy",
    description: "What is Alchemy?",
    rule: whatIsAlchemy,
    alwaysApply: true,

  },
  {
    name: "alchemy-cloudflare",
    description: "Apply if you're building resources on Cloudflare with Alchemy",
    rule: alchemyCloudflareRules,
    alwaysApply: false,
  },
  {
    name: "alchemy-aws",
    description: "Apply if you're building resources on AWS with Alchemy",
    rule: alchemyAwsRules,
    alwaysApply: false,
  },
];

export default rules;
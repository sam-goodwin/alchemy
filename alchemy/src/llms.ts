export interface AlchemyRule {
  name: string;
  rule: string;
  description?: string;
  alwaysApply?: boolean;
  globs?: string | string[];
}

const alchemy: AlchemyRule = {
  name: "alchemy",
  description: "Core Alchemy development guidelines and patterns",
  alwaysApply: true,
  globs: ["*.ts", "*.tsx", "*.js", "*.jsx"],
  rule: "alchemy rule",
};

const alchemyRules: AlchemyRule[] = [alchemy];

export default alchemyRules;

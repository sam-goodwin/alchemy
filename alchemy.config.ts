import path from "path";

import alchemy from "./alchemy/src";

// ensure providers are registered (for deletion purposes)
import "./alchemy/src/aws";
import "./alchemy/src/aws/oidc";
import "./alchemy/src/cloudflare";
import "./alchemy/src/docs";
import "./alchemy/src/fs";
import "./alchemy/src/vite";

import { Role, getAccountId } from "./alchemy/src/aws";
import { GitHubOIDCProvider } from "./alchemy/src/aws/oidc";
import { StaticSite, Zone } from "./alchemy/src/cloudflare";
import { Document } from "./alchemy/src/docs";
import { Folder } from "./alchemy/src/fs";
import { GitHubSecret } from "./alchemy/src/github";
import { ViteProject } from "./alchemy/src/vite";

await using _ = alchemy("github:alchemy", {
  stage: "prod",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  // pass the password in (you can get it from anywhere, e.g. stdin)
  password: process.env.SECRET_PASSPHRASE,
  quiet: process.argv.includes("--verbose") ? false : true,
});

const zone = await Zone("alchemy.run", {
  name: "alchemy.run",
  type: "full",
});

console.log("nameservers:", zone.nameservers);

await ViteProject("alchemy.run package", {
  name: "alchemy.run",
  template: "react-ts",
  extends: "../tsconfig.base.json",
  references: ["../alchemy/tsconfig.json"],
  tailwind: true,
  tanstack: true,
  shadcn: {
    baseColor: "neutral",
    force: true,
    components: ["button", "card", "input", "label", "sheet", "table", "tabs"],
  },
  overwrite: true,
});

const docs = await Folder(path.join("alchemy.run", "docs"));

await Document("alchemy.run home.md", {
  path: path.join(docs.path, "home.md"),
  prompt: [
    "Generate a markdown document capturing the Home page (landing page) content for the alchemy.run product",
    "In this document, we focus purely on Hero, Sub-Hero, Call-to-Action, and Feature sections",
    "The content is light and lean. We don't over explain. Emphasis is on clarity and conciseness",
    "I want the following sections to be present in the document:",
    "1. Hero section (1 short sentence, e.g. Materialize and deploy cloud software)",
    "2. Sub-Hero section (1 short sentence, e.g. Alchemy is a TypeScript-native, embeddable IaC library ...",
    "3. Call-to-Action section",
    "4. Feature section - focus on how to use Resources, Scopes, how to create your own Resources, IaC (Create/Update/Delete automatically)",
    "",
    "Refer to the README.md file to get an overview of the alchemy.run product.",
    "Take a look at the example `alchemy.config.ts` files to see real usage",
    "Feature section should not parrot the README.md, those are not features.",
    "It should focus on code feature + snippet.",
  ],
  context: await alchemy.files(
    "./.cursorrules",
    "./README.md",
    "./alchemy.config.ts",
    "./examples/cloudflare-vite/alchemy.config.ts",
    "./examples/cloudflare-vite/src/env.d.ts",
  ),
});

// cloudflare vite plugin requires a wrangler.json file
// await WranglerJson("alchemy.run wrangler.json", {
//   name: "alchemy",
//   compatibility_date: "2024-01-01",
//   path: "alchemy.run/wrangler.jsonc",
// });

const site = await StaticSite("alchemy.run site", {
  name: "alchemy",
  dir: "alchemy.run/dist",
  domain: "alchemy.run",
  build: {
    command: "bun run --filter alchemy.run build",
  },
});

console.log({
  url: site.url,
});

const accountId = await getAccountId();

const githubRole = await Role("github-oidc-role", {
  roleName: "alchemy-github-oidc-role",
  assumeRolePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "GitHubOIDC",
        Effect: "Allow",
        Principal: {
          Federated: `arn:aws:iam::${accountId}:oidc-provider/token.actions.githubusercontent.com`,
        },
        Action: "sts:AssumeRoleWithWebIdentity",
        Condition: {
          StringEquals: {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          },
          StringLike: {
            "token.actions.githubusercontent.com:sub":
              "repo:sam-goodwin/alchemy:*",
          },
        },
      },
    ],
  },
  // TODO: probably scope this down
  managedPolicyArns: ["arn:aws:iam::aws:policy/AdministratorAccess"],
});

const githubSecrets = {
  AWS_ROLE_ARN: githubRole.arn,
  CLOUDFLARE_API_KEY: process.env.CLOUDFLARE_API_KEY,
  CLOUDFLARE_EMAIL: process.env.CLOUDFLARE_EMAIL,
  STRIPE_API_KEY: process.env.STRIPE_API_KEY,
};

await Promise.all([
  GitHubOIDCProvider("github-oidc", {
    owner: "sam-goodwin",
    repository: "alchemy",
    roleArn: githubRole.arn,
  }),
  ...Object.entries(githubSecrets).map(([name, value]) =>
    GitHubSecret(`github-secret-${name}`, {
      owner: "sam-goodwin",
      repository: "alchemy",
      name,
      value: alchemy.secret(value),
    }),
  ),
]);

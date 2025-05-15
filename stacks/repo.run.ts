// ensure providers are registered (for deletion purposes)
import "../alchemy/src/aws/index.js";
import "../alchemy/src/aws/oidc/index.js";
import "../alchemy/src/cloudflare/index.js";
import "../alchemy/src/os/index.js";

import { AccountId, Role } from "../alchemy/src/aws/index.js";
import { GitHubOIDCProvider } from "../alchemy/src/aws/oidc/index.js";
import { AccountApiToken, R2Bucket } from "../alchemy/src/cloudflare/index.js";
import {
  GitHubSecret,
  RepositoryEnvironment,
} from "../alchemy/src/github/index.js";
import alchemy from "../alchemy/src/index.js";
import env, {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_API_KEY,
  CLOUDFLARE_EMAIL,
  NEON_API_KEY,
  OPENAI_API_KEY,
  STRIPE_API_KEY,
  UPSTASH_API_KEY,
} from "./env.js";

const app = await alchemy("alchemy:repo", env);

const awsAccountId = await AccountId();

const githubRole = await Role("github-oidc-role", {
  roleName: "alchemy-github-oidc-role",
  assumeRolePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "GitHubOIDC",
        Effect: "Allow",
        Principal: {
          Federated: `arn:aws:iam::${awsAccountId}:oidc-provider/token.actions.githubusercontent.com`,
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

const stateStore = await R2Bucket("state-store", {
  name: "alchemy-state-store",
});

const testEnvironment = await RepositoryEnvironment("test environment", {
  owner: "sam-goodwin",
  repository: "alchemy",
  name: "test",
  reviewers: {
    users: ["sam-goodwin"],
  },
});

const accountAccessToken = await AccountApiToken("account-access-token", {
  name: "alchemy-account-access-token",
  policies: [
    {
      effect: "allow",
      permissionGroups: ["Workers R2 Storage Write"],
      resources: {
        "com.cloudflare.api.account": "*",
      },
    },
  ],
});

await Promise.all([
  GitHubOIDCProvider("github-oidc", {
    owner: "sam-goodwin",
    repository: "alchemy",
    roleArn: githubRole.arn,
  }),
  ...Object.entries({
    AWS_ROLE_ARN: githubRole.arn,
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_API_KEY,
    CLOUDFLARE_EMAIL,
    STRIPE_API_KEY,
    OPENAI_API_KEY,
    NEON_API_KEY,
    CLOUDFLARE_BUCKET_NAME: stateStore.name,
    R2_ACCESS_KEY_ID: accountAccessToken.accessKeyId,
    R2_SECRET_ACCESS_KEY: accountAccessToken.secretAccessKey,
    SECRET_PASSPHRASE: alchemy.secret(process.env.SECRET_PASSPHRASE!),
    UPSTASH_API_KEY,
    UPSTASH_EMAIL: "sam@alchemy.run",
  }).flatMap(async ([name, value]) => {
    const props = {
      owner: "sam-goodwin",
      repository: "alchemy",
      name,
      value: typeof value === "string" ? alchemy.secret(value) : value!,
    };
    return [
      GitHubSecret(`github-secret-${name}`, {
        ...props,
        environment: testEnvironment.name,
      }),
      GitHubSecret(`github-repo-secret-${name}`, props),
    ];
  }),
]);

await app.finalize();

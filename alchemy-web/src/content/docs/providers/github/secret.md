---
title: GitHubSecret
description: Learn how to create, update, and manage secrets for GitHub Actions and Dependabot using Alchemy.
---


The GitHubSecret resource lets you manage [GitHub Actions secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) in repositories and environments.

## Minimal Example

Create a repository-level secret:

```ts
import { GitHubSecret } from "alchemy/github";

const secret = await GitHubSecret("api-key", {
  owner: "my-org",
  repository: "my-repo", 
  name: "API_KEY",
  value: alchemy.secret("my-secret-value")
});
```

## Environment Secret

Create a secret scoped to a specific environment:

```ts
import { GitHubSecret } from "alchemy/github";

const secret = await GitHubSecret("prod-secret", {
  owner: "my-org",
  repository: "my-repo",
  name: "DEPLOY_KEY",
  value: alchemy.secret("secret-value"),
  environment: "production"
});
```

## Multiple Secrets

Create multiple secrets in a repository:

```ts
import { GitHubSecret } from "alchemy/github";

const secrets = await Promise.all([
  GitHubSecret("aws-secret", {
    owner: "my-org",
    repository: "my-repo",
    name: "AWS_KEY",
    value: alchemy.secret(process.env.AWS_KEY)
  }),
  GitHubSecret("db-secret", {
    owner: "my-org", 
    repository: "my-repo",
    name: "DB_PASSWORD",
    value: alchemy.secret(process.env.DB_PASSWORD)
  })
]);
```

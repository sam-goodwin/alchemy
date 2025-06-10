---
title: RepositoryEnvironment
description: Learn how to create and manage deployment environments in your GitHub repositories using Alchemy.
---


The RepositoryEnvironment resource lets you manage [GitHub repository environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment) for deployment protection rules and secrets.

## Minimal Example

Create a basic environment with no protection rules:

```ts
import { RepositoryEnvironment } from "alchemy/github";

const devEnv = await RepositoryEnvironment("dev-environment", {
  owner: "my-org",
  repository: "my-repo", 
  name: "development"
});
```

## Production Environment with Approvals

Create a production environment with approval requirements and protected branches:

```ts
import { RepositoryEnvironment } from "alchemy/github";

const prodEnv = await RepositoryEnvironment("prod-environment", {
  owner: "my-org",
  repository: "my-repo",
  name: "production",
  waitTimer: 10, // 10 minute delay
  preventSelfReview: true,
  reviewers: {
    teams: ["platform-team"], // team name
    users: ["security-admin"] // username
  },
  deploymentBranchPolicy: {
    protectedBranches: true,
    customBranchPolicies: false
  }
});
```

## Custom Branch Patterns

Create an environment with custom branch deployment patterns:

```ts
import { RepositoryEnvironment } from "alchemy/github";

const stagingEnv = await RepositoryEnvironment("staging-environment", {
  owner: "my-org",
  repository: "my-repo",
  name: "staging",
  reviewers: {
    teams: [1234567], // team ID
    users: [7654321]  // user ID
  },
  deploymentBranchPolicy: {
    protectedBranches: false,
    customBranchPolicies: true
  },
  branchPatterns: ["main", "release/*"]
});
```

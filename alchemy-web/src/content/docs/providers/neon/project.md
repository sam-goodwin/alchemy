---
title: NeonProject
description: Learn how to create, configure, and manage Neon serverless Postgres projects and databases using Alchemy.
---


The NeonProject resource lets you create and manage [Neon serverless PostgreSQL](https://neon.tech) projects.

## Minimal Example

Create a basic Neon project with default settings:

```ts
import { NeonProject } from "alchemy/neon";

const project = await NeonProject("my-project", {
  name: "My Project"
});
```

## Custom Region and Version

Create a project in a specific region with a specific PostgreSQL version:

```ts
import { NeonProject } from "alchemy/neon";

const project = await NeonProject("eu-project", {
  name: "EU Project",
  region_id: "aws-eu-west-1", 
  pg_version: 16,
  apiKey: alchemy.secret(process.env.NEON_API_KEY)
});
```

## Custom Branch Name

Create a project with a custom default branch name:

```ts
import { NeonProject } from "alchemy/neon";

const project = await NeonProject("dev-project", {
  name: "Development Project",
  default_branch_name: "development"
});
```

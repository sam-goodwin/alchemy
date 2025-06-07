---
title: Managing Railway Environments with Alchemy
description: Learn how to create and manage Railway environments using Alchemy for deployment pipeline management.
---

# Railway Environment

A Railway environment represents a deployment environment within a project (e.g., production, staging, development).

## Basic Environment

Create a simple environment within an existing project:

```typescript
import { Environment, Project } from "alchemy/railway";

const project = await Project("my-project", {
  name: "My Application",
});

const staging = await Environment("staging-env", {
  name: "staging",
  project: project,
});
```

## Multiple Environments

Set up different environments for your deployment pipeline:

```typescript
import { Environment, Project } from "alchemy/railway";

const project = await Project("web-app", {
  name: "Web Application",
  description: "Full-stack web application",
});

// Development environment
const development = await Environment("dev-env", {
  name: "development",
  project: project,
});

// Staging environment
const staging = await Environment("staging-env", {
  name: "staging", 
  project: project,
});

// Production environment
const production = await Environment("prod-env", {
  name: "production",
  project: project,
});
```

## Using String References

You can also reference projects by their ID string:

```typescript
import { Environment } from "alchemy/railway";

const environment = await Environment("my-env", {
  name: "production",
  project: "project_abc123",
});
```

## Custom Authentication

Override the default Railway token for specific environments:

```typescript
import { Environment, secret } from "alchemy/railway";

const environment = await Environment("secure-env", {
  name: "production",
  project: "project_abc123",
  apiKey: secret("custom-railway-token"),
});
```

## Properties

### Required

- **name** (string): The name of the environment
- **project** (string | Project): The project this environment belongs to

### Optional

- **apiKey** (Secret): Railway API token for authentication. Defaults to `RAILWAY_TOKEN` environment variable

## Outputs

- **id** (string): The unique identifier of the environment
- **projectId** (string): The ID of the parent project
- **createdAt** (string): When the environment was created
- **updatedAt** (string): When the environment was last updated

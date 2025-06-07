---
title: Managing Railway Functions with Alchemy
description: Learn how to create and deploy Railway serverless functions using Alchemy for scalable compute workloads.
---

# Railway Function

A Railway function represents a serverless function deployed within a project environment.

## Node.js Function

Create a TypeScript function with automatic bundling:

```typescript
import { Environment, Function, Project } from "alchemy/railway";

const project = await Project("my-project", {
  name: "My Application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const helloWorld = await Function("hello-function", {
  name: "hello-world",
  project: project,
  environment: environment,
  runtime: "nodejs",
  main: "./src/handlers/hello.ts",
  entrypoint: "index.handler",
});
```

## Python Function

Deploy a Python function from a repository:

```typescript
import { Environment, Function, Project } from "alchemy/railway";

const project = await Project("data-platform", {
  name: "Data Processing Platform",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const dataProcessor = await Function("data-processor", {
  name: "process-data",
  project: project,
  environment: environment,
  runtime: "python",
  main: "./functions/processor.py",
  sourceRepo: "https://github.com/myorg/data-functions",
  sourceRepoBranch: "main",
  entrypoint: "main.handler",
});
```

## Repository-based Function

Deploy functions from version control:

```typescript
import { Environment, Function, Project } from "alchemy/railway";

const project = await Project("serverless-api", {
  name: "Serverless API Gateway",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const apiGateway = await Function("api-gateway", {
  name: "gateway",
  project: project,
  environment: environment,
  runtime: "go",
  sourceRepo: "https://github.com/myorg/go-functions",
  sourceRepoBranch: "main",
  entrypoint: "main",
});

const authFunction = await Function("auth-function", {
  name: "auth-handler",
  project: project,
  environment: environment,
  runtime: "rust",
  sourceRepo: "https://github.com/myorg/rust-functions",
  sourceRepoBranch: "develop",
  entrypoint: "main",
});
```

## Webhook Handler

Create a function for handling webhooks:

```typescript
import { Environment, Function, Project } from "alchemy/railway";

const project = await Project("webhook-service", {
  name: "Webhook Processing Service",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const webhookHandler = await Function("webhook-handler", {
  name: "stripe-webhook",
  project: project,
  environment: environment,
  runtime: "nodejs",
  main: "./src/webhooks/stripe.ts",
  entrypoint: "index.handler",
});

console.log(`Webhook URL: ${webhookHandler.url}`);
```

## Using String References

Reference projects and environments by their ID strings:

```typescript
import { Function } from "alchemy/railway";

const func = await Function("my-function", {
  name: "webhook-handler",
  project: "project_abc123",
  environment: "env_xyz789",
  runtime: "nodejs",
  main: "./src/webhook.ts",
  entrypoint: "index.handler",
});
```

## Properties

### Required

- **name** (string): The name of the function
- **project** (string | Project): The project this function belongs to
- **environment** (string | Environment): The environment this function belongs to
- **runtime** ("nodejs" | "python" | "go" | "rust"): The runtime environment for the function

### Optional

- **main** (string): Path to the main function file. For Node.js functions, this will be bundled using esbuild
- **sourceRepo** (string): URL of the source repository. Use this for more complex functions
- **sourceRepoBranch** (string): Branch to deploy from when using a repository
- **entrypoint** (string): Entry point for the function (e.g., "index.handler", "main.py")
- **apiKey** (Secret): Railway API token for authentication. Defaults to `RAILWAY_TOKEN` environment variable

## Outputs

- **id** (string): The unique identifier of the function
- **projectId** (string): The ID of the parent project
- **environmentId** (string): The ID of the parent environment
- **url** (string): The public URL where the function can be invoked
- **createdAt** (string): When the function was created
- **updatedAt** (string): When the function was last updated

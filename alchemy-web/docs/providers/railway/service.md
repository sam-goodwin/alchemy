---
title: Managing Railway Services with Alchemy
description: Learn how to create and deploy Railway services using Alchemy for application and microservice management.
---

# Railway Service

A Railway service represents an application or microservice deployed within a project environment.

## Basic Service

Create a simple service within a project:

```typescript
import { Project, Service } from "alchemy/railway";

const project = await Project("my-project", {
  name: "My Application",
});

const api = await Service("api-service", {
  name: "api",
  project: project,
});
```

## GitHub Repository Service

Deploy a service directly from a GitHub repository:

```typescript
import { Project, Service } from "alchemy/railway";

const project = await Project("web-project", {
  name: "Web Application",
});

const webApp = await Service("web-app", {
  name: "frontend",
  project: project,
  sourceRepo: "https://github.com/myorg/web-app",
  sourceRepoBranch: "main",
  rootDirectory: "/",
});
```

## Microservice with Custom Configuration

Set up a background worker with specific build configuration:

```typescript
import { Project, Service } from "alchemy/railway";

const project = await Project("microservices", {
  name: "Microservices Platform",
});

const worker = await Service("background-worker", {
  name: "worker",
  project: project,
  sourceRepo: "https://github.com/myorg/worker",
  sourceRepoBranch: "develop",
  rootDirectory: "/worker",
  configPath: "./railway.toml",
});
```

## Monorepo Service

Deploy a specific service from a monorepo:

```typescript
import { Project, Service } from "alchemy/railway";

const project = await Project("monorepo-project", {
  name: "Monorepo Application",
});

const authService = await Service("auth-service", {
  name: "auth",
  project: project,
  sourceRepo: "https://github.com/myorg/monorepo",
  sourceRepoBranch: "main",
  rootDirectory: "/services/auth",
  configPath: "./services/auth/railway.toml",
});
```

## Using String References

Reference projects by their ID string:

```typescript
import { Service } from "alchemy/railway";

const service = await Service("my-service", {
  name: "api",
  project: "project_abc123",
});
```

## Properties

### Required

- **name** (string): The name of the service
- **project** (string | Project): The project this service belongs to

### Optional

- **sourceRepo** (string): URL of the source repository
- **sourceRepoBranch** (string): Branch to deploy from
- **rootDirectory** (string): Root directory of the service in the repository
- **configPath** (string): Path to the Railway configuration file
- **apiKey** (Secret): Railway API token for authentication. Defaults to `RAILWAY_TOKEN` environment variable

## Outputs

- **id** (string): The unique identifier of the service
- **projectId** (string): The ID of the parent project
- **createdAt** (string): When the service was created
- **updatedAt** (string): When the service was last updated

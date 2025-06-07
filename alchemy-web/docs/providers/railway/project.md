---
title: Managing Railway Projects with Alchemy
description: Learn how to create and manage Railway projects using Alchemy as containers for your applications and resources.
---

# Railway Project

A Railway project is a container for your applications, databases, and other resources.

## Basic Project

Create a simple project for your application:

```typescript
import { Project } from "alchemy/railway";

const myProject = await Project("my-project", {
  name: "My Application",
  description: "A web application project",
});
```

## Team Project

Create a project within a team organization:

```typescript
import { Project } from "alchemy/railway";

const teamProject = await Project("team-project", {
  name: "Team Application",
  description: "A project for our development team",
  teamId: "team_abc123",
});
```

## Public Project

Set up a public open source project:

```typescript
import { Project } from "alchemy/railway";

const publicProject = await Project("public-project", {
  name: "Open Source Library",
  description: "A public open source project with documentation",
  isPublic: true,
});
```

## Enterprise Project

Create a comprehensive project for enterprise applications:

```typescript
import { Project } from "alchemy/railway";

const enterpriseProject = await Project("enterprise-app", {
  name: "Enterprise Platform",
  description: "Multi-service enterprise application with microservices architecture",
  teamId: "enterprise_team_456",
});

console.log(`Project ID: ${enterpriseProject.id}`);
console.log(`Default Environment: ${enterpriseProject.defaultEnvironment}`);
```

## Custom Authentication

Override the default Railway token for specific projects:

```typescript
import { Project, secret } from "alchemy/railway";

const project = await Project("secure-project", {
  name: "Secure Application",
  description: "High-security application with custom authentication",
  apiKey: secret("custom-railway-token"),
});
```

## Properties

### Required

- **name** (string): The name of the project

### Optional

- **description** (string): A description of the project
- **isPublic** (boolean): Whether the project is public. Defaults to `false`
- **teamId** (string): The ID of the team that owns the project
- **apiKey** (Secret): Railway API token for authentication. Defaults to `RAILWAY_TOKEN` environment variable

## Outputs

- **id** (string): The unique identifier of the project
- **defaultEnvironment** (string): The ID of the default environment
- **createdAt** (string): When the project was created
- **updatedAt** (string): When the project was last updated

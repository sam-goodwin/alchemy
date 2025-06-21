---
title: Prisma Projects
description: Learn how to create and manage Prisma projects using Alchemy for database development and deployment.
---

# Project

A [Prisma Project](https://docs.prisma.io) is a workspace for managing databases, schemas, and environments in the Prisma platform.

## Minimal Example

Create a basic project for your application:

```ts
import { Project } from "alchemy/prisma";

const project = await Project("my-project", {
  name: "My App",
});
```

## With Region and Description

Create a project with specific configuration:

```ts
import { Project } from "alchemy/prisma";

const project = await Project("my-project", {
  name: "My App",
  description: "Production application database",
  region: "us-east-1",
});
```

## With Environment Variables

Create a project with custom environment variables:

```ts
import { Project } from "alchemy/prisma";

const project = await Project("my-project", {
  name: "My App",
  environmentVariables: {
    NODE_ENV: "production",
    LOG_LEVEL: "info",
  },
});
```

## Using with Database

Connect a project to create databases:

```ts
import { Project, Database } from "alchemy/prisma";

const project = await Project("my-project", {
  name: "My App",
});

const database = await Database("main-db", {
  project: project,
  name: "production",
});
```
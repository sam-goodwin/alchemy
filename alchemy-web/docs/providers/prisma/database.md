---
title: Prisma Databases
description: Learn how to create and manage databases within Prisma projects using Alchemy for data storage.
---

# Database

A [Prisma Database](https://docs.prisma.io) provides data storage and management within a Prisma project.

## Minimal Example

Create a basic database in a project:

```ts
import { Project, Database } from "alchemy/prisma";

const project = await Project("my-project", {
  name: "My App",
});

const database = await Database("my-database", {
  project: project,
  name: "production",
});
```

## With Specific Region

Create a database in a specific region:

```ts
import { Database } from "alchemy/prisma";

const database = await Database("eu-database", {
  project: project,
  name: "eu-production", 
  region: "eu-west-3",
});
```

## Default Database

Create a database as the default for the project:

```ts
import { Database } from "alchemy/prisma";

const database = await Database("default-db", {
  project: project,
  name: "main",
  region: "us-east-1",
  isDefault: true,
});
```

## Using Database ID

Reference a database using a project ID string:

```ts
import { Database } from "alchemy/prisma";

const database = await Database("my-database", {
  project: "project-123",
  name: "analytics",
});
```

## With Connection

Create a database and connection string:

```ts
import { Project, Database, Connection } from "alchemy/prisma";

const project = await Project("my-project", {
  name: "My App",
});

const database = await Database("my-database", {
  project: project,
  name: "production",
});

const connection = await Connection("app-connection", {
  project: project,
  database: database,
  name: "web-app",
});
```
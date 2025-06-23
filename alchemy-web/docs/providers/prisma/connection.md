---
title: Prisma Connections
description: Learn how to create and manage database connection strings for secure access to Prisma databases using Alchemy.
---

# Connection

A [Prisma Connection](https://docs.prisma.io) creates secure connection strings for accessing Prisma databases.

## Minimal Example

Create a connection string for database access:

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

## Using Resource IDs

Create a connection with explicit project and database IDs:

```ts
import { Connection } from "alchemy/prisma";

const connection = await Connection("backup-connection", {
  project: "project-123",
  database: "database-456",
  name: "backup-reader",
});
```

## Access Connection String

Use the connection string in your application:

```ts
const connection = await Connection("my-connection", {
  project: project,
  database: database,
  name: "web-app",
});

// The connection string is wrapped in a Secret for security
const connectionString = await connection.connectionString.unencrypted;
console.log("Connection string:", connectionString);
```

## Multiple Connections

Create different connections for various purposes:

```ts
// Main application connection
const appConnection = await Connection("app-connection", {
  project: project,
  database: database,
  name: "main-app",
});

// Analytics connection
const analyticsConnection = await Connection("analytics-connection", {
  project: project,
  database: database,
  name: "analytics-readonly",
});

// Backup connection
const backupConnection = await Connection("backup-connection", {
  project: project,
  database: database,
  name: "backup-tasks",
});
```

## With Prisma Schema

Use the connection in your Prisma configuration:

```ts
const connection = await Connection("schema-connection", {
  project: project,
  database: database,
  name: "schema-access",
});

// Use in your .env file:
// DATABASE_URL=<connection.connectionString.unencrypted>
const databaseUrl = await connection.connectionString.unencrypted;
```
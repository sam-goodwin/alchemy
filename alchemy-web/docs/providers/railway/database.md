---
title: Managing Railway Databases with Alchemy
description: Learn how to create and manage Railway databases using Alchemy for persistent data storage in your applications.
---

# Railway Database

A Railway database represents a managed database instance within a project environment.

## Basic Database

Create a PostgreSQL database for your application:

```typescript
import { Database, Environment, Project } from "alchemy/railway";

const project = await Project("my-project", {
  name: "My Application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const postgres = await Database("postgres-db", {
  name: "main-database",
  project: project,
  environment: environment,
  type: "postgresql",
});
```

## Multiple Database Types

Set up different databases for various use cases:

```typescript
import { Database, Environment, Project } from "alchemy/railway";

const project = await Project("web-app", {
  name: "Web Application",
  description: "Full-stack web application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

// PostgreSQL for main application data
const postgres = await Database("postgres-db", {
  name: "main-database",
  project: project,
  environment: environment,
  type: "postgresql",
});

// Redis for caching and sessions
const redis = await Database("redis-cache", {
  name: "session-cache",
  project: project,
  environment: environment,
  type: "redis",
});

// MySQL for legacy data
const mysql = await Database("mysql-db", {
  name: "legacy-database",
  project: project,
  environment: environment,
  type: "mysql",
});
```

## Production Setup

Create a production database with proper naming:

```typescript
import { Database, Environment, Project } from "alchemy/railway";

const project = await Project("ecommerce-platform", {
  name: "E-commerce Platform",
  description: "Online store with inventory management",
});

const production = await Environment("production", {
  name: "production",
  project: project,
});

const database = await Database("prod-database", {
  name: "ecommerce-prod-db",
  project: project,
  environment: production,
  type: "postgresql",
});

// Access connection details
console.log(database.connectionString.unencrypted);
console.log(`Host: ${database.host}:${database.port}`);
```

## Using String References

Reference projects and environments by their ID strings:

```typescript
import { Database } from "alchemy/railway";

const database = await Database("my-db", {
  name: "production-db",
  project: "project_abc123",
  environment: "env_xyz789",
  type: "postgresql",
});
```

## Properties

### Required

- **name** (string): The name of the database
- **project** (string | Project): The project this database belongs to
- **environment** (string | Environment): The environment this database belongs to
- **type** ("postgresql" | "mysql" | "redis" | "mongodb"): The type of database to create

### Optional

- **apiKey** (Secret): Railway API token for authentication. Defaults to `RAILWAY_TOKEN` environment variable

## Outputs

- **id** (string): The unique identifier of the database
- **projectId** (string): The ID of the parent project
- **environmentId** (string): The ID of the parent environment
- **connectionString** (Secret): The connection string for the database
- **host** (string): The hostname of the database
- **port** (number): The port number of the database
- **username** (string): The username for database access
- **password** (Secret): The password for database access
- **databaseName** (string): The name of the database
- **createdAt** (string): When the database was created
- **updatedAt** (string): When the database was last updated

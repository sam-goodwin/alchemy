---
title: PlanetScale
description: Learn how to use Alchemy's PlanetScale provider to manage serverless MySQL databases with branching workflows and zero-downtime schema changes.
---

PlanetScale is a serverless database platform based on MySQL that provides horizontal scaling, branching workflows, and zero-downtime schema changes. Alchemy provides resources to manage PlanetScale databases and branches programmatically.

[Official PlanetScale Documentation](https://planetscale.com/docs) | [PlanetScale API Reference](https://api-docs.planetscale.com/)

## Resources

- [Database](./database) - Create and manage PlanetScale databases with configuration options
- [Branch](./branch) - Create and manage database branches for development workflows

## Example Usage

```ts
import { Database, Branch } from "alchemy/planetscale";

// Create a database
const database = await Database("my-app-db", {
  name: "my-app-db",
  organizationId: "my-org",
  clusterSize: "PS_10",
  allowDataBranching: true,
  automaticMigrations: true,
});

// Create a development branch
const devBranch = await Branch("feature-123", {
  name: "feature-123",
  organizationId: "my-org",
  databaseName: database.name,
  parentBranch: "main",
  isProduction: false,
});

// Create a production branch from a backup
const prodBranch = await Branch("production", {
  name: "production",
  organizationId: "my-org",
  databaseName: database.name,
  parentBranch: "main",
  isProduction: true,
  clusterSize: "PS_20",
  backupId: "backup-123",
});
```

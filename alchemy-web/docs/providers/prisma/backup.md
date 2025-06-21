---
title: Prisma Backups
description: Learn how to access Prisma database backups and restore functionality using Alchemy for data recovery.
---

# Backup

A [Prisma Backup](https://docs.prisma.io) provides read-only access to database backups and restore functionality.

## Minimal Example

List available backups for a database:

```ts
import { Project, Database, Backup } from "alchemy/prisma";

const project = await Project("my-project", {
  name: "My App",
});

const database = await Database("my-database", {
  project: project,
  name: "production",
});

const backups = await Backup("db-backups", {
  project: project,
  database: database,
});

console.log(`Found ${backups.backups.length} backups`);
```

## Using Resource IDs

Access backups with explicit project and database IDs:

```ts
import { Backup } from "alchemy/prisma";

const backups = await Backup("backups", {
  project: "project-123",
  database: "database-456",
});
```

## Backup Information

Access backup details and metadata:

```ts
const backups = await Backup("backup-info", {
  project: project,
  database: database,
});

console.log(`Retention: ${backups.meta.backupRetentionDays} days`);

backups.backups.forEach(backup => {
  console.log(`Backup ${backup.id}: ${backup.backupType} (${backup.status})`);
  console.log(`  Created: ${backup.createdAt}`);
  console.log(`  Size: ${backup.size} bytes`);
});
```

## Restore Backup

Restore a backup to a new database:

```ts
import { Backup } from "alchemy/prisma";

const backups = await Backup("restore-backup", {
  project: project,
  database: database,
  restore: {
    backupId: "backup-123",
    targetDatabaseName: "restored-production",
  },
});

if (backups.restoredDatabase) {
  console.log(`Restored to: ${backups.restoredDatabase.name}`);
  console.log(`Status: ${backups.restoredDatabase.status}`);
}
```

## Find Latest Backup

Filter and find the most recent completed backup:

```ts
const backups = await Backup("latest-backup", {
  project: project,
  database: database,
});

const latestBackup = backups.backups
  .filter(b => b.status === "completed")
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

if (latestBackup) {
  console.log("Latest backup:", latestBackup.id);
  console.log("Type:", latestBackup.backupType);
}
```

## Filter by Type

Get backups by type and time range:

```ts
const backups = await Backup("filtered-backups", {
  project: project,
  database: database,
});

// Get completed full backups
const fullBackups = backups.backups.filter(b => 
  b.backupType === "full" && b.status === "completed"
);

// Get recent backups (last 7 days)
const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
const recentBackups = backups.backups.filter(b => 
  new Date(b.createdAt) > weekAgo
);

console.log(`Full backups: ${fullBackups.length}`);
console.log(`Recent backups: ${recentBackups.length}`);
```
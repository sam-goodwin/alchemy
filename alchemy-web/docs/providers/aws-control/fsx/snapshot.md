---
title: Managing AWS FSx Snapshots with Alchemy
description: Learn how to create, update, and manage AWS FSx Snapshots using Alchemy Cloud Control.
---

# Snapshot

The Snapshot resource allows you to manage [AWS FSx Snapshots](https://docs.aws.amazon.com/fsx/latest/userguide/) for your file systems, enabling you to create backups and restore data as needed.

## Minimal Example

Create a basic FSx Snapshot with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicSnapshot = await AWS.FSx.Snapshot("BasicSnapshot", {
  VolumeId: "fs-12345678", // Replace with your actual volume ID
  Name: "DailyBackup", 
  Tags: [{ Key: "Environment", Value: "production" }]
});
```

## Advanced Configuration

Configure an FSx Snapshot with additional options, including multiple tags and an adoption flag.

```ts
const advancedSnapshot = await AWS.FSx.Snapshot("AdvancedSnapshot", {
  VolumeId: "fs-87654321", // Replace with your actual volume ID
  Name: "WeeklyBackup",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataOps" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Snapshot Restoration

Demonstrate how to create a snapshot that can be used for restoring data later.

```ts
const restoreSnapshot = await AWS.FSx.Snapshot("RestoreSnapshot", {
  VolumeId: "fs-12345678", // Replace with your actual volume ID
  Name: "RestorePoint",
  Tags: [{ Key: "Purpose", Value: "DataRecovery" }]
});
```

## Scheduled Snapshots

Create a configuration for taking scheduled snapshots for regular backups.

```ts
const scheduledSnapshot = await AWS.FSx.Snapshot("ScheduledSnapshot", {
  VolumeId: "fs-12345678", // Replace with your actual volume ID
  Name: "ScheduledBackup",
  Tags: [{ Key: "Cron", Value: "0 2 * * *" }] // Example cron for daily at 2 AM
});
```
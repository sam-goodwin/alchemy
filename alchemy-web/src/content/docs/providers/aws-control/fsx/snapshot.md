---
title: Snapshot
description: Learn how to create, update, and manage AWS FSx Snapshots using Alchemy Cloud Control.
---


The Snapshot resource allows you to manage [AWS FSx Snapshots](https://docs.aws.amazon.com/fsx/latest/userguide/) for your Amazon FSx file systems, enabling you to create backups and restore your data efficiently.

## Minimal Example

Create a basic FSx snapshot with required properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const fsxSnapshot = await AWS.FSx.Snapshot("myFsxSnapshot", {
  volumeId: "vol-12345678",
  name: "MyFirstSnapshot",
  tags: [
    { key: "Environment", value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a snapshot with additional properties, including adopting an existing resource.

```ts
const advancedFsxSnapshot = await AWS.FSx.Snapshot("advancedFsxSnapshot", {
  volumeId: "vol-87654321",
  name: "AdvancedSnapshot",
  adopt: true,
  tags: [
    { key: "Project", value: "Alpha" },
    { key: "Owner", value: "Team-X" }
  ]
});
```

## Using Snapshot for Data Recovery

Create a snapshot and then use it to restore the volume if needed.

```ts
import AWS from "alchemy/aws/control";

const recoverySnapshot = await AWS.FSx.Snapshot("recoverySnapshot", {
  volumeId: "vol-12345678",
  name: "RecoverySnapshot"
});

// Logic to restore the volume from the snapshot would go here
```

## Tagging for Organization

Create a snapshot with multiple tags for better organization in your AWS account.

```ts
const organizedSnapshot = await AWS.FSx.Snapshot("organizedSnapshot", {
  volumeId: "vol-12345678",
  name: "OrganizedSnapshot",
  tags: [
    { key: "Department", value: "Finance" },
    { key: "BackupType", value: "Weekly" },
    { key: "RetentionPolicy", value: "30Days" }
  ]
});
```

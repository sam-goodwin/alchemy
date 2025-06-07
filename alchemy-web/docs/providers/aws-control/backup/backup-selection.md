---
title: Managing AWS Backup BackupSelections with Alchemy
description: Learn how to create, update, and manage AWS Backup BackupSelections using Alchemy Cloud Control.
---

# BackupSelection

The BackupSelection resource lets you create and manage [AWS Backup BackupSelections](https://docs.aws.amazon.com/backup/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backup-backupselection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const backupselection = await AWS.Backup.BackupSelection("backupselection-example", {
  BackupSelection: "example-backupselection",
  BackupPlanId: "example-backupplanid",
});
```


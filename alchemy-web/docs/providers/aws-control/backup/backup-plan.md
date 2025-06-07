---
title: Managing AWS Backup BackupPlans with Alchemy
description: Learn how to create, update, and manage AWS Backup BackupPlans using Alchemy Cloud Control.
---

# BackupPlan

The BackupPlan resource lets you create and manage [AWS Backup BackupPlans](https://docs.aws.amazon.com/backup/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backup-backupplan.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const backupplan = await AWS.Backup.BackupPlan("backupplan-example", {
  BackupPlan: "example-backupplan",
});
```


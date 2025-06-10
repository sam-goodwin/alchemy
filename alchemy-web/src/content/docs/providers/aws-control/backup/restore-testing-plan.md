---
title: RestoreTestingPlan
description: Learn how to create, update, and manage AWS Backup RestoreTestingPlans using Alchemy Cloud Control.
---


The RestoreTestingPlan resource allows you to manage AWS Backup Restore Testing Plans, which help automate the testing of recovery points to ensure that your backup data can be properly restored. For more information, refer to the [AWS Backup RestoreTestingPlans documentation](https://docs.aws.amazon.com/backup/latest/userguide/).

## Minimal Example

Create a basic Restore Testing Plan with required properties and an optional start window:

```ts
import AWS from "alchemy/aws/control";

const restoreTestingPlan = await AWS.Backup.RestoreTestingPlan("myRestoreTestingPlan", {
  RestoreTestingPlanName: "DailyBackupTest",
  ScheduleExpression: "cron(0 12 * * ? *)", // Daily at 12 PM UTC
  StartWindowHours: 2,
  RecoveryPointSelection: {
    RecoveryPoints: ["arn:aws:backup:us-east-1:123456789012:recovery-point:abcd1234-efgh-5678-ijkl-90mnopqrst"],
    BackupVaultName: "MyBackupVault"
  },
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Configure a Restore Testing Plan with additional options such as timezone and tags:

```ts
const advancedRestoreTestingPlan = await AWS.Backup.RestoreTestingPlan("advancedRestoreTestingPlan", {
  RestoreTestingPlanName: "WeeklyBackupTest",
  ScheduleExpression: "cron(0 0 ? * MON *)", // Weekly on Monday at midnight UTC
  ScheduleExpressionTimezone: "UTC",
  RecoveryPointSelection: {
    RecoveryPoints: ["arn:aws:backup:us-east-1:123456789012:recovery-point:abcd1234-efgh-5678-ijkl-90mnopqrst"],
    BackupVaultName: "CriticalDataVault"
  },
  Tags: [{
    Key: "Project",
    Value: "DataRecovery"
  }, {
    Key: "Owner",
    Value: "TeamA"
  }]
});
```

## Using an Existing Recovery Point

Create a Restore Testing Plan that adopts an existing recovery point instead of creating a new one:

```ts
const existingRecoveryPointPlan = await AWS.Backup.RestoreTestingPlan("existingRecoveryPointPlan", {
  RestoreTestingPlanName: "ExistingPointTest",
  ScheduleExpression: "cron(0 6 * * ? *)", // Daily at 6 AM UTC
  RecoveryPointSelection: {
    RecoveryPoints: ["arn:aws:backup:us-east-1:123456789012:recovery-point:abcd1234-efgh-5678-ijkl-90mnopqrst"],
    BackupVaultName: "LegacyBackupVault"
  },
  adopt: true // Use this to adopt the existing resource
});
``` 

This documentation serves as a foundational guide for managing AWS Backup Restore Testing Plans using the Alchemy framework, allowing for efficient and automated backup testing.

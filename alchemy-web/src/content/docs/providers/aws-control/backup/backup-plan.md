---
title: BackupPlan
description: Learn how to create, update, and manage AWS Backup BackupPlans using Alchemy Cloud Control.
---


The BackupPlan resource allows you to create and manage [AWS Backup BackupPlans](https://docs.aws.amazon.com/backup/latest/userguide/) that define how AWS resources are backed up. Backup plans can include rules for backup frequency, retention, and lifecycle management.

## Minimal Example

Create a simple backup plan with the required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const simpleBackupPlan = await AWS.Backup.BackupPlan("simpleBackupPlan", {
  BackupPlan: {
    BackupPlanName: "DailyBackupPlan",
    Rules: [{
      RuleName: "DailyBackupRule",
      TargetBackupVault: "Default",
      ScheduleExpression: "cron(0 12 * * ? *)", // Daily at 12 PM UTC
      Lifecycle: {
        DeleteAfterDays: 30 // Delete backups after 30 days
      }
    }]
  },
  BackupPlanTags: {
    Environment: "Production"
  }
});
```

## Advanced Configuration

Configure a backup plan with multiple rules and a more complex tagging strategy.

```ts
const advancedBackupPlan = await AWS.Backup.BackupPlan("advancedBackupPlan", {
  BackupPlan: {
    BackupPlanName: "WeeklyAndDailyBackupPlan",
    Rules: [
      {
        RuleName: "WeeklyBackupRule",
        TargetBackupVault: "Default",
        ScheduleExpression: "cron(0 12 ? * SUN *)", // Weekly on Sundays at 12 PM UTC
        Lifecycle: {
          DeleteAfterDays: 90 // Delete backups after 90 days
        }
      },
      {
        RuleName: "DailyBackupRule",
        TargetBackupVault: "Default",
        ScheduleExpression: "cron(0 12 * * ? *)", // Daily at 12 PM UTC
        Lifecycle: {
          DeleteAfterDays: 30 // Delete backups after 30 days
        }
      }
    ]
  },
  BackupPlanTags: {
    Environment: "Staging",
    Team: "DevOps"
  }
});
```

## Using Existing Resources

Adopt an existing backup plan instead of creating a new one, which can be useful for managing existing resources.

```ts
const adoptedBackupPlan = await AWS.Backup.BackupPlan("adoptedBackupPlan", {
  BackupPlan: {
    BackupPlanName: "ExistingBackupPlan",
    Rules: [{
      RuleName: "ExistingBackupRule",
      TargetBackupVault: "Default",
      ScheduleExpression: "cron(0 12 * * ? *)", // Daily at 12 PM UTC
      Lifecycle: {
        DeleteAfterDays: 60 // Delete backups after 60 days
      }
    }]
  },
  adopt: true // Adopt existing resource
});
```

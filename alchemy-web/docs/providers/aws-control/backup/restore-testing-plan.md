---
title: Managing AWS Backup RestoreTestingPlans with Alchemy
description: Learn how to create, update, and manage AWS Backup RestoreTestingPlans using Alchemy Cloud Control.
---

# RestoreTestingPlan

The RestoreTestingPlan resource lets you create and manage [AWS Backup RestoreTestingPlans](https://docs.aws.amazon.com/backup/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backup-restoretestingplan.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const restoretestingplan = await AWS.Backup.RestoreTestingPlan("restoretestingplan-example", {
  ScheduleExpression: "example-scheduleexpression",
  RecoveryPointSelection: "example-recoverypointselection",
  RestoreTestingPlanName: "restoretestingplan-restoretestingplan",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a restoretestingplan with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRestoreTestingPlan = await AWS.Backup.RestoreTestingPlan(
  "advanced-restoretestingplan",
  {
    ScheduleExpression: "example-scheduleexpression",
    RecoveryPointSelection: "example-recoverypointselection",
    RestoreTestingPlanName: "restoretestingplan-restoretestingplan",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```


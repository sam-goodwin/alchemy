---
title: ScheduledAction
description: Learn how to create, update, and manage AWS Redshift ScheduledActions using Alchemy Cloud Control.
---


The ScheduledAction resource allows you to manage [AWS Redshift Scheduled Actions](https://docs.aws.amazon.com/redshift/latest/userguide/) which automate the management of your clusters. You can schedule actions like resizing clusters or pausing them during non-usage periods.

## Minimal Example

Create a basic scheduled action that pauses a Redshift cluster during the night.

```ts
import AWS from "alchemy/aws/control";

const scheduledAction = await AWS.Redshift.ScheduledAction("nightlyPauseAction", {
  ScheduledActionName: "PauseClusterAtNight",
  ScheduledActionDescription: "This action pauses the Redshift cluster every night at 11 PM.",
  Schedule: "cron(0 23 * * ? *)",
  TargetAction: {
    PauseCluster: {
      ClusterIdentifier: "my-redshift-cluster"
    }
  },
  Enable: true
});
```

## Advanced Configuration

Configure a scheduled action to resize a Redshift cluster during the weekend.

```ts
const resizeAction = await AWS.Redshift.ScheduledAction("weekendResizeAction", {
  ScheduledActionName: "ResizeClusterOnWeekends",
  ScheduledActionDescription: "This action resizes the Redshift cluster every Saturday at 2 AM.",
  Schedule: "cron(0 2 ? * 7 *)",
  TargetAction: {
    ResizeCluster: {
      ClusterIdentifier: "my-redshift-cluster",
      NodeCount: 4
    }
  },
  Enable: true
});
```

## Action with Specific Time Windows

Create a scheduled action that enables a cluster during business hours and disables it afterward.

```ts
const businessHoursAction = await AWS.Redshift.ScheduledAction("businessHoursAction", {
  ScheduledActionName: "EnableClusterDuringBusinessHours",
  ScheduledActionDescription: "This action enables the cluster from 8 AM to 6 PM on weekdays.",
  Schedule: "cron(0 8 ? * MON-FRI *)",
  TargetAction: {
    ResumeCluster: {
      ClusterIdentifier: "my-redshift-cluster"
    }
  },
  Enable: true
});

const disableClusterAction = await AWS.Redshift.ScheduledAction("disableClusterAction", {
  ScheduledActionName: "DisableClusterAfterBusinessHours",
  ScheduledActionDescription: "This action disables the cluster after business hours.",
  Schedule: "cron(0 18 ? * MON-FRI *)",
  TargetAction: {
    PauseCluster: {
      ClusterIdentifier: "my-redshift-cluster"
    }
  },
  Enable: true
});
```

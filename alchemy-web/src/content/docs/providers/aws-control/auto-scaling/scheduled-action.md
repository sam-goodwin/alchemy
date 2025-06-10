---
title: ScheduledAction
description: Learn how to create, update, and manage AWS AutoScaling ScheduledActions using Alchemy Cloud Control.
---


The ScheduledAction resource lets you manage [AWS AutoScaling ScheduledActions](https://docs.aws.amazon.com/autoscaling/latest/userguide/) to automate scaling actions for your Auto Scaling groups.

## Minimal Example

Create a basic scheduled action to scale your Auto Scaling group with a desired capacity at a specific time.

```ts
import AWS from "alchemy/aws/control";

const scheduledAction = await AWS.AutoScaling.ScheduledAction("scale-up-action", {
  AutoScalingGroupName: "my-auto-scaling-group",
  DesiredCapacity: 3,
  StartTime: "2023-10-01T12:00:00Z",
  EndTime: "2023-10-01T15:00:00Z"
});
```

## Advanced Configuration

Configure a scheduled action with a recurrence pattern and timezone for repeating scaling activities.

```ts
const recurringAction = await AWS.AutoScaling.ScheduledAction("recurring-scale-action", {
  AutoScalingGroupName: "my-auto-scaling-group",
  DesiredCapacity: 5,
  MinSize: 1,
  MaxSize: 10,
  Recurrence: "0 10 * * *", // Every day at 10:00 AM UTC
  TimeZone: "UTC"
});
```

## Scaling Down During Off-Peak Hours

Set a scheduled action to scale down the Auto Scaling group during off-peak hours.

```ts
const scaleDownAction = await AWS.AutoScaling.ScheduledAction("scale-down-action", {
  AutoScalingGroupName: "my-auto-scaling-group",
  DesiredCapacity: 1,
  StartTime: "2023-10-01T20:00:00Z",
  EndTime: "2023-10-01T23:00:00Z"
});
```

## Complete Lifecycle Management

Manage both scaling up and down actions for a complete lifecycle management of your Auto Scaling group.

```ts
const scaleUpAction = await AWS.AutoScaling.ScheduledAction("scale-up-action", {
  AutoScalingGroupName: "my-auto-scaling-group",
  DesiredCapacity: 5,
  StartTime: "2023-10-01T08:00:00Z"
});

const scaleDownAction = await AWS.AutoScaling.ScheduledAction("scale-down-action", {
  AutoScalingGroupName: "my-auto-scaling-group",
  DesiredCapacity: 2,
  StartTime: "2023-10-01T18:00:00Z"
});
```

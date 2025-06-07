---
title: Managing AWS AutoScaling ScheduledActions with Alchemy
description: Learn how to create, update, and manage AWS AutoScaling ScheduledActions using Alchemy Cloud Control.
---

# ScheduledAction

The ScheduledAction resource allows you to manage [AWS AutoScaling ScheduledActions](https://docs.aws.amazon.com/autoscaling/latest/userguide/) for scaling your Auto Scaling group at specified times.

## Minimal Example

This example demonstrates how to create a basic ScheduledAction with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const DailyScheduledAction = await AWS.AutoScaling.ScheduledAction("DailyScalingAction", {
  AutoScalingGroupName: "MyAutoScalingGroup",
  DesiredCapacity: 5,
  StartTime: "2023-10-01T08:00:00Z",
  EndTime: "2023-10-31T18:00:00Z"
});
```

## Advanced Configuration

In this example, we enhance the ScheduledAction with additional optional properties, including recurrence and timezone.

```ts
const WeeklyScheduledAction = await AWS.AutoScaling.ScheduledAction("WeeklyScalingAction", {
  AutoScalingGroupName: "MyAutoScalingGroup",
  MinSize: 3,
  MaxSize: 10,
  DesiredCapacity: 5,
  Recurrence: "0 10 * * 1", // Every Monday at 10:00 AM UTC
  TimeZone: "UTC"
});
```

## Conditional Scaling

This example shows how to set a ScheduledAction that adjusts the desired capacity based on a specific day and time.

```ts
const WeekendScalingAction = await AWS.AutoScaling.ScheduledAction("WeekendScalingAction", {
  AutoScalingGroupName: "MyAutoScalingGroup",
  DesiredCapacity: 8,
  StartTime: "2023-10-01T00:00:00Z",
  EndTime: "2023-10-02T23:59:59Z",
  Recurrence: "0 0 * * 0" // Every Sunday at midnight
});
```

## Adoption of Existing ScheduledAction

This example illustrates how to adopt an existing ScheduledAction instead of failing if it already exists.

```ts
const ExistingScheduledAction = await AWS.AutoScaling.ScheduledAction("ExistingAction", {
  AutoScalingGroupName: "MyAutoScalingGroup",
  DesiredCapacity: 6,
  StartTime: "2023-10-01T08:00:00Z",
  EndTime: "2023-10-31T18:00:00Z",
  adopt: true // Adopt existing resource if it exists
});
```
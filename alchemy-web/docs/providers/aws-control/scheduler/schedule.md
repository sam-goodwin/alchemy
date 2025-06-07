---
title: Managing AWS Scheduler Schedules with Alchemy
description: Learn how to create, update, and manage AWS Scheduler Schedules using Alchemy Cloud Control.
---

# Schedule

The Schedule resource lets you create and manage [AWS Scheduler Schedules](https://docs.aws.amazon.com/scheduler/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-scheduler-schedule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const schedule = await AWS.Scheduler.Schedule("schedule-example", {
  ScheduleExpression: "example-scheduleexpression",
  Target: "example-target",
  FlexibleTimeWindow: "example-flexibletimewindow",
  Description: "A schedule resource managed by Alchemy",
});
```

## Advanced Configuration

Create a schedule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSchedule = await AWS.Scheduler.Schedule("advanced-schedule", {
  ScheduleExpression: "example-scheduleexpression",
  Target: "example-target",
  FlexibleTimeWindow: "example-flexibletimewindow",
  Description: "A schedule resource managed by Alchemy",
});
```


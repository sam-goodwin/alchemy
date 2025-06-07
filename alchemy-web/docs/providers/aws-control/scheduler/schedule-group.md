---
title: Managing AWS Scheduler ScheduleGroups with Alchemy
description: Learn how to create, update, and manage AWS Scheduler ScheduleGroups using Alchemy Cloud Control.
---

# ScheduleGroup

The ScheduleGroup resource allows you to manage [AWS Scheduler ScheduleGroups](https://docs.aws.amazon.com/scheduler/latest/userguide/) to organize and manage your scheduled tasks.

## Minimal Example

Create a basic schedule group with a name and tags:

```ts
import AWS from "alchemy/aws/control";

const BasicScheduleGroup = await AWS.Scheduler.ScheduleGroup("BasicScheduleGroup", {
  Name: "DailyTasks",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a schedule group to adopt an existing resource if it already exists:

```ts
const AdvancedScheduleGroup = await AWS.Scheduler.ScheduleGroup("AdvancedScheduleGroup", {
  Name: "WeeklyTasks",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ],
  adopt: true
});
```

## Custom Naming and Tagging

Create a schedule group with a unique name and multiple tags:

```ts
const CustomNamedScheduleGroup = await AWS.Scheduler.ScheduleGroup("CustomNamedScheduleGroup", {
  Name: "MonthlyCleanup",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Operations" },
    { Key: "Project", Value: "CleanupTool" }
  ]
});
```

## Using the ARN after Creation

Example of accessing the ARN of a schedule group after it has been created:

```ts
const ScheduleGroupWithARN = await AWS.Scheduler.ScheduleGroup("ScheduleGroupWithARN", {
  Name: "YearlyReview",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});

// Accessing the ARN of the created schedule group
console.log(`Schedule Group ARN: ${ScheduleGroupWithARN.Arn}`);
```
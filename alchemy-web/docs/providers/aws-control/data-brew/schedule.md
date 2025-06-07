---
title: Managing AWS DataBrew Schedules with Alchemy
description: Learn how to create, update, and manage AWS DataBrew Schedules using Alchemy Cloud Control.
---

# Schedule

The Schedule resource lets you manage [AWS DataBrew Schedules](https://docs.aws.amazon.com/databrew/latest/userguide/) for orchestrating jobs in data preparation workflows.

## Minimal Example

Create a basic DataBrew Schedule with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicSchedule = await AWS.DataBrew.Schedule("basic-schedule", {
  Name: "DailyDataPrep",
  CronExpression: "cron(0 12 * * ? *)", // Runs daily at 12 PM UTC
  JobNames: ["DataCleaningJob", "DataTransformationJob"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataOps" }
  ]
});
```

## Advanced Configuration

Configure a more advanced DataBrew Schedule with additional options such as adopting existing resources.

```ts
const AdvancedSchedule = await AWS.DataBrew.Schedule("advanced-schedule", {
  Name: "WeeklyDataPrep",
  CronExpression: "cron(0 0 ? * MON *)", // Runs every Monday at 12 AM UTC
  JobNames: ["WeeklyReportJob"],
  adopt: true, // Adopt existing resource if it already exists
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```

## Detailed Configuration with Tags

Create a schedule with more detailed tag configurations for better resource management.

```ts
const DetailedSchedule = await AWS.DataBrew.Schedule("detailed-schedule", {
  Name: "MonthlyDataAudit",
  CronExpression: "cron(0 0 1 * ? *)", // Runs on the 1st of every month at 12 AM UTC
  JobNames: ["MonthlyAuditJob"],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "DataTeam" },
    { Key: "Project", Value: "DataQuality" }
  ]
});
```
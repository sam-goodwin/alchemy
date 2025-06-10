---
title: Schedule
description: Learn how to create, update, and manage AWS DataBrew Schedules using Alchemy Cloud Control.
---


The Schedule resource allows you to manage [AWS DataBrew Schedules](https://docs.aws.amazon.com/databrew/latest/userguide/) for automating jobs on a specified cadence. 

## Minimal Example

Create a basic DataBrew Schedule with required properties and one optional tag:

```ts
import AWS from "alchemy/aws/control";

const dataBrewSchedule = await AWS.DataBrew.Schedule("daily-data-processing", {
  Name: "DailyDataProcessing",
  CronExpression: "cron(0 12 * * ? *)",
  JobNames: ["DataCleaningJob"],
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a DataBrew Schedule with additional options, such as multiple jobs and additional tags:

```ts
const advancedSchedule = await AWS.DataBrew.Schedule("weekly-data-reports", {
  Name: "WeeklyDataReports",
  CronExpression: "cron(0 10 ? * MON *)",
  JobNames: ["WeeklySalesReportJob", "WeeklyInventoryJob"],
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Status", Value: "Active" }
  ]
});
```

## Using the Adopt Option

Create a DataBrew Schedule while adopting an existing resource if it already exists:

```ts
const adoptSchedule = await AWS.DataBrew.Schedule("adopted-schedule", {
  Name: "AdoptedExistingSchedule",
  CronExpression: "cron(0 15 * * ? *)",
  JobNames: ["AdoptedJob"],
  adopt: true // This will attempt to adopt the existing schedule if present
});
```

## Managing Tags

Update the tags of an existing DataBrew Schedule to reflect changes in project classification:

```ts
const updatedTagsSchedule = await AWS.DataBrew.Schedule("updated-tags-schedule", {
  Name: "UpdatedTagsSchedule",
  CronExpression: "cron(0 9 * * ? *)",
  JobNames: ["DataQualityCheckJob"],
  Tags: [
    { Key: "Project", Value: "DataQuality" },
    { Key: "LastUpdated", Value: "2023-10-01" }
  ]
});
```

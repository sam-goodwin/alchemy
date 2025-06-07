---
title: Managing AWS SSM MaintenanceWindows with Alchemy
description: Learn how to create, update, and manage AWS SSM MaintenanceWindows using Alchemy Cloud Control.
---

# MaintenanceWindow

The MaintenanceWindow resource lets you manage [AWS SSM Maintenance Windows](https://docs.aws.amazon.com/ssm/latest/userguide/) for scheduling tasks on your infrastructure. You can define when to perform tasks and manage those tasks effectively.

## Minimal Example

Create a basic SSM Maintenance Window with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicMaintenanceWindow = await AWS.SSM.MaintenanceWindow("BasicMaintenanceWindow", {
  Name: "DailyMaintenance",
  AllowUnassociatedTargets: true,
  Cutoff: 1,
  Duration: 2,
  Schedule: "cron(0 2 * * ? *)", // Every day at 2 AM UTC
  StartDate: new Date().toISOString(),
  EndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // One week from now
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a Maintenance Window with additional scheduling options and a specific time zone.

```ts
const advancedMaintenanceWindow = await AWS.SSM.MaintenanceWindow("AdvancedMaintenanceWindow", {
  Name: "WeeklyMaintenance",
  AllowUnassociatedTargets: true,
  Cutoff: 2,
  Duration: 3,
  Schedule: "cron(0 3 ? * SUN *)", // Every Sunday at 3 AM UTC
  ScheduleTimezone: "UTC",
  StartDate: new Date().toISOString(),
  EndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // One month from now
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Infrastructure" }
  ]
});
```

## Scheduled Maintenance for Specific Tasks

Schedule a Maintenance Window specifically for patching operations.

```ts
const patchMaintenanceWindow = await AWS.SSM.MaintenanceWindow("PatchMaintenanceWindow", {
  Name: "PatchWindows",
  AllowUnassociatedTargets: false,
  Cutoff: 0,
  Duration: 4,
  Schedule: "cron(0 4 * * ? *)", // Every day at 4 AM UTC
  StartDate: new Date().toISOString(),
  Tags: [
    { Key: "Purpose", Value: "Patching" },
    { Key: "Owner", Value: "IT" }
  ]
});
```

## Maintenance Window without End Date

Create a Maintenance Window intended to run indefinitely.

```ts
const indefiniteMaintenanceWindow = await AWS.SSM.MaintenanceWindow("IndefiniteMaintenanceWindow", {
  Name: "IndefiniteMaintenance",
  AllowUnassociatedTargets: true,
  Cutoff: 1,
  Duration: 2,
  Schedule: "cron(0 1 * * ? *)", // Every day at 1 AM UTC
  StartDate: new Date().toISOString(),
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Operations" }
  ]
});
```
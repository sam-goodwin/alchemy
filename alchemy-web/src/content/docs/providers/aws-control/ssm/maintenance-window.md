---
title: MaintenanceWindow
description: Learn how to create, update, and manage AWS SSM MaintenanceWindows using Alchemy Cloud Control.
---


The MaintenanceWindow resource lets you manage AWS Systems Manager Maintenance Windows, which define a set of time periods during which maintenance tasks can be performed on your instances. For more details, refer to the [AWS SSM MaintenanceWindows documentation](https://docs.aws.amazon.com/ssm/latest/userguide/).

## Minimal Example

Create a basic Maintenance Window with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const maintenanceWindow = await AWS.SSM.MaintenanceWindow("weeklyMaintenance", {
  name: "Weekly Maintenance Window",
  schedule: "cron(0 2 ? * SUN *)", // Every Sunday at 02:00 UTC
  duration: 3, // 3 hours
  cutoff: 1, // 1 hour before the end of the maintenance window
  allowUnassociatedTargets: false // Only allow associated targets
});
```

## Advanced Configuration

Configure a Maintenance Window with additional properties such as tags and a specific timezone.

```ts
const advancedMaintenanceWindow = await AWS.SSM.MaintenanceWindow("advancedMaintenance", {
  name: "Advanced Maintenance Window",
  schedule: "cron(15 3 ? * MON *)", // Every Monday at 03:15 UTC
  duration: 4, // 4 hours
  cutoff: 1, // 1 hour before the end of the maintenance window
  allowUnassociatedTargets: true, // Allow unassociated targets
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ],
  scheduleTimezone: "UTC" // Set the timezone
});
```

## Targeting Specific Instances

Create a Maintenance Window that targets specific instances based on tags.

```ts
const instanceMaintenanceWindow = await AWS.SSM.MaintenanceWindow("instanceMaintenance", {
  name: "Instance Targeted Maintenance",
  schedule: "cron(0 1 ? * SAT *)", // Every Saturday at 01:00 UTC
  duration: 2, // 2 hours
  cutoff: 0, // No cutoff
  allowUnassociatedTargets: false, // Do not allow unassociated targets
  tags: [
    { Key: "Environment", Value: "Staging" }
  ],
  scheduleTimezone: "America/New_York" // Set the timezone to New York
});
```

## Using Maintenance Window for Patch Management

Set up a Maintenance Window specifically for patch management tasks.

```ts
const patchManagementWindow = await AWS.SSM.MaintenanceWindow("patchManagement", {
  name: "Patch Management Window",
  schedule: "cron(30 1 ? * TUE *)", // Every Tuesday at 01:30 UTC
  duration: 3, // 3 hours
  cutoff: 0, // No cutoff
  allowUnassociatedTargets: false,
  tags: [
    { Key: "Purpose", Value: "Patch Management" }
  ]
});
```

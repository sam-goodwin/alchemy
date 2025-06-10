---
title: ScheduleGroup
description: Learn how to create, update, and manage AWS Scheduler ScheduleGroups using Alchemy Cloud Control.
---


The ScheduleGroup resource lets you manage [AWS Scheduler ScheduleGroups](https://docs.aws.amazon.com/scheduler/latest/userguide/) for organizing and controlling scheduled tasks.

## Minimal Example

Create a basic ScheduleGroup with a name and tags.

```ts
import AWS from "alchemy/aws/control";

const basicScheduleGroup = await AWS.Scheduler.ScheduleGroup("basicScheduleGroup", {
  name: "MyFirstScheduleGroup",
  tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "SchedulerDemo" }
  ]
});
```

## Advanced Configuration

Configure a ScheduleGroup with additional properties like adopting existing resources.

```ts
const advancedScheduleGroup = await AWS.Scheduler.ScheduleGroup("advancedScheduleGroup", {
  name: "MyAdvancedScheduleGroup",
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "SchedulerDemo" }
  ],
  adopt: true // This will adopt an existing resource if it already exists
});
```

## Using ScheduleGroup with Multiple Tags

Create a ScheduleGroup that utilizes multiple tags for better organization.

```ts
const taggedScheduleGroup = await AWS.Scheduler.ScheduleGroup("taggedScheduleGroup", {
  name: "MyTaggedScheduleGroup",
  tags: [
    { Key: "Department", Value: "Engineering" },
    { Key: "Owner", Value: "Alice" },
    { Key: "Status", Value: "Active" }
  ]
});
```

## Create a ScheduleGroup with Specific Names

Demonstrate creating multiple ScheduleGroups with distinct names for different environments.

```ts
const devScheduleGroup = await AWS.Scheduler.ScheduleGroup("devScheduleGroup", {
  name: "DevelopmentSchedulerGroup"
});

const prodScheduleGroup = await AWS.Scheduler.ScheduleGroup("prodScheduleGroup", {
  name: "ProductionSchedulerGroup"
});
```

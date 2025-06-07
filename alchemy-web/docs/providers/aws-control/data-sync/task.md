---
title: Managing AWS DataSync Tasks with Alchemy
description: Learn how to create, update, and manage AWS DataSync Tasks using Alchemy Cloud Control.
---

# Task

The Task resource lets you create and manage [AWS DataSync Tasks](https://docs.aws.amazon.com/datasync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datasync-task.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const task = await AWS.DataSync.Task("task-example", {
  DestinationLocationArn: "example-destinationlocationarn",
  SourceLocationArn: "example-sourcelocationarn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a task with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTask = await AWS.DataSync.Task("advanced-task", {
  DestinationLocationArn: "example-destinationlocationarn",
  SourceLocationArn: "example-sourcelocationarn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


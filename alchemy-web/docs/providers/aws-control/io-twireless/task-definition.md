---
title: Managing AWS IoTWireless TaskDefinitions with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless TaskDefinitions using Alchemy Cloud Control.
---

# TaskDefinition

The TaskDefinition resource lets you create and manage [AWS IoTWireless TaskDefinitions](https://docs.aws.amazon.com/iotwireless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-taskdefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const taskdefinition = await AWS.IoTWireless.TaskDefinition("taskdefinition-example", {
  AutoCreateTasks: true,
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a taskdefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTaskDefinition = await AWS.IoTWireless.TaskDefinition("advanced-taskdefinition", {
  AutoCreateTasks: true,
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


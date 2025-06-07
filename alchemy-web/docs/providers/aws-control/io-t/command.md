---
title: Managing AWS IoT Commands with Alchemy
description: Learn how to create, update, and manage AWS IoT Commands using Alchemy Cloud Control.
---

# Command

The Command resource lets you create and manage [AWS IoT Commands](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-command.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const command = await AWS.IoT.Command("command-example", {
  CommandId: "example-commandid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A command resource managed by Alchemy",
});
```

## Advanced Configuration

Create a command with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCommand = await AWS.IoT.Command("advanced-command", {
  CommandId: "example-commandid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A command resource managed by Alchemy",
});
```


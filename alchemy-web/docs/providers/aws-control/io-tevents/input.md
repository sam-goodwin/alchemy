---
title: Managing AWS IoTEvents Inputs with Alchemy
description: Learn how to create, update, and manage AWS IoTEvents Inputs using Alchemy Cloud Control.
---

# Input

The Input resource lets you create and manage [AWS IoTEvents Inputs](https://docs.aws.amazon.com/iotevents/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const input = await AWS.IoTEvents.Input("input-example", {
  InputDefinition: "example-inputdefinition",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a input with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInput = await AWS.IoTEvents.Input("advanced-input", {
  InputDefinition: "example-inputdefinition",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


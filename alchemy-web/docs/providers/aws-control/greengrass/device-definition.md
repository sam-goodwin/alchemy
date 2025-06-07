---
title: Managing AWS Greengrass DeviceDefinitions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass DeviceDefinitions using Alchemy Cloud Control.
---

# DeviceDefinition

The DeviceDefinition resource lets you create and manage [AWS Greengrass DeviceDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-devicedefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const devicedefinition = await AWS.Greengrass.DeviceDefinition("devicedefinition-example", {
  Name: "devicedefinition-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a devicedefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDeviceDefinition = await AWS.Greengrass.DeviceDefinition(
  "advanced-devicedefinition",
  {
    Name: "devicedefinition-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```


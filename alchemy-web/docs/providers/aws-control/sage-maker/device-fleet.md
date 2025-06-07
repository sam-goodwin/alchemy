---
title: Managing AWS SageMaker DeviceFleets with Alchemy
description: Learn how to create, update, and manage AWS SageMaker DeviceFleets using Alchemy Cloud Control.
---

# DeviceFleet

The DeviceFleet resource lets you create and manage [AWS SageMaker DeviceFleets](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const devicefleet = await AWS.SageMaker.DeviceFleet("devicefleet-example", {
  DeviceFleetName: "devicefleet-devicefleet",
  OutputConfig: "example-outputconfig",
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A devicefleet resource managed by Alchemy",
});
```

## Advanced Configuration

Create a devicefleet with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDeviceFleet = await AWS.SageMaker.DeviceFleet("advanced-devicefleet", {
  DeviceFleetName: "devicefleet-devicefleet",
  OutputConfig: "example-outputconfig",
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A devicefleet resource managed by Alchemy",
});
```


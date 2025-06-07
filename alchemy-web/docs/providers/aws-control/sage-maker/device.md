---
title: Managing AWS SageMaker Devices with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Devices using Alchemy Cloud Control.
---

# Device

The Device resource lets you create and manage [AWS SageMaker Devices](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-device.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const device = await AWS.SageMaker.Device("device-example", {
  DeviceFleetName: "device-devicefleet",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a device with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDevice = await AWS.SageMaker.Device("advanced-device", {
  DeviceFleetName: "device-devicefleet",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


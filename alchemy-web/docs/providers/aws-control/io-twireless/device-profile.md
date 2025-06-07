---
title: Managing AWS IoTWireless DeviceProfiles with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless DeviceProfiles using Alchemy Cloud Control.
---

# DeviceProfile

The DeviceProfile resource lets you create and manage [AWS IoTWireless DeviceProfiles](https://docs.aws.amazon.com/iotwireless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-deviceprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const deviceprofile = await AWS.IoTWireless.DeviceProfile("deviceprofile-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a deviceprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDeviceProfile = await AWS.IoTWireless.DeviceProfile("advanced-deviceprofile", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


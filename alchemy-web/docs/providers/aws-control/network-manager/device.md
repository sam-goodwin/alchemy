---
title: Managing AWS NetworkManager Devices with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager Devices using Alchemy Cloud Control.
---

# Device

The Device resource lets you create and manage [AWS NetworkManager Devices](https://docs.aws.amazon.com/networkmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const device = await AWS.NetworkManager.Device("device-example", {
  GlobalNetworkId: "example-globalnetworkid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A device resource managed by Alchemy",
});
```

## Advanced Configuration

Create a device with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDevice = await AWS.NetworkManager.Device("advanced-device", {
  GlobalNetworkId: "example-globalnetworkid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A device resource managed by Alchemy",
});
```


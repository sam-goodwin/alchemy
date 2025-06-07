---
title: Managing AWS IoTWireless WirelessDevices with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless WirelessDevices using Alchemy Cloud Control.
---

# WirelessDevice

The WirelessDevice resource lets you create and manage [AWS IoTWireless WirelessDevices](https://docs.aws.amazon.com/iotwireless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-wirelessdevice.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const wirelessdevice = await AWS.IoTWireless.WirelessDevice("wirelessdevice-example", {
  Type: "example-type",
  DestinationName: "wirelessdevice-destination",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A wirelessdevice resource managed by Alchemy",
});
```

## Advanced Configuration

Create a wirelessdevice with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWirelessDevice = await AWS.IoTWireless.WirelessDevice("advanced-wirelessdevice", {
  Type: "example-type",
  DestinationName: "wirelessdevice-destination",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A wirelessdevice resource managed by Alchemy",
});
```


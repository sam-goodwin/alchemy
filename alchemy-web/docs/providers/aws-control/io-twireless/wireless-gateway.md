---
title: Managing AWS IoTWireless WirelessGateways with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless WirelessGateways using Alchemy Cloud Control.
---

# WirelessGateway

The WirelessGateway resource lets you create and manage [AWS IoTWireless WirelessGateways](https://docs.aws.amazon.com/iotwireless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-wirelessgateway.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const wirelessgateway = await AWS.IoTWireless.WirelessGateway("wirelessgateway-example", {
  LoRaWAN: "example-lorawan",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A wirelessgateway resource managed by Alchemy",
});
```

## Advanced Configuration

Create a wirelessgateway with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWirelessGateway = await AWS.IoTWireless.WirelessGateway("advanced-wirelessgateway", {
  LoRaWAN: "example-lorawan",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A wirelessgateway resource managed by Alchemy",
});
```


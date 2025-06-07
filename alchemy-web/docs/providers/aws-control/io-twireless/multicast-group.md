---
title: Managing AWS IoTWireless MulticastGroups with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless MulticastGroups using Alchemy Cloud Control.
---

# MulticastGroup

The MulticastGroup resource lets you create and manage [AWS IoTWireless MulticastGroups](https://docs.aws.amazon.com/iotwireless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-multicastgroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const multicastgroup = await AWS.IoTWireless.MulticastGroup("multicastgroup-example", {
  LoRaWAN: "example-lorawan",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A multicastgroup resource managed by Alchemy",
});
```

## Advanced Configuration

Create a multicastgroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMulticastGroup = await AWS.IoTWireless.MulticastGroup("advanced-multicastgroup", {
  LoRaWAN: "example-lorawan",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A multicastgroup resource managed by Alchemy",
});
```


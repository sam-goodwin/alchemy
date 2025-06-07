---
title: Managing AWS IoTWireless FuotaTasks with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless FuotaTasks using Alchemy Cloud Control.
---

# FuotaTask

The FuotaTask resource lets you create and manage [AWS IoTWireless FuotaTasks](https://docs.aws.amazon.com/iotwireless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-fuotatask.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const fuotatask = await AWS.IoTWireless.FuotaTask("fuotatask-example", {
  FirmwareUpdateImage: "example-firmwareupdateimage",
  LoRaWAN: "example-lorawan",
  FirmwareUpdateRole: "example-firmwareupdaterole",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A fuotatask resource managed by Alchemy",
});
```

## Advanced Configuration

Create a fuotatask with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFuotaTask = await AWS.IoTWireless.FuotaTask("advanced-fuotatask", {
  FirmwareUpdateImage: "example-firmwareupdateimage",
  LoRaWAN: "example-lorawan",
  FirmwareUpdateRole: "example-firmwareupdaterole",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A fuotatask resource managed by Alchemy",
});
```


---
title: Managing AWS IoTWireless WirelessDeviceImportTasks with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless WirelessDeviceImportTasks using Alchemy Cloud Control.
---

# WirelessDeviceImportTask

The WirelessDeviceImportTask resource lets you create and manage [AWS IoTWireless WirelessDeviceImportTasks](https://docs.aws.amazon.com/iotwireless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-wirelessdeviceimporttask.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const wirelessdeviceimporttask = await AWS.IoTWireless.WirelessDeviceImportTask(
  "wirelessdeviceimporttask-example",
  {
    DestinationName: "wirelessdeviceimporttask-destination",
    Sidewalk: "example-sidewalk",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a wirelessdeviceimporttask with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWirelessDeviceImportTask = await AWS.IoTWireless.WirelessDeviceImportTask(
  "advanced-wirelessdeviceimporttask",
  {
    DestinationName: "wirelessdeviceimporttask-destination",
    Sidewalk: "example-sidewalk",
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


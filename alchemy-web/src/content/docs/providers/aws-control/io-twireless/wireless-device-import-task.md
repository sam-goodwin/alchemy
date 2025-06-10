---
title: WirelessDeviceImportTask
description: Learn how to create, update, and manage AWS IoTWireless WirelessDeviceImportTasks using Alchemy Cloud Control.
---


The WirelessDeviceImportTask resource lets you manage the import tasks for wireless devices in AWS IoT Wireless. This resource allows you to specify the destination for the imported devices and configure options for Sidewalk and tagging. For more information, refer to the [AWS IoTWireless WirelessDeviceImportTasks](https://docs.aws.amazon.com/iotwireless/latest/userguide/).

## Minimal Example

Create a basic WirelessDeviceImportTask with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const importTask = await AWS.IoTWireless.WirelessDeviceImportTask("basicImportTask", {
  DestinationName: "MyDeviceImportDestination",
  Sidewalk: {
    AppServerPrivateKey: "myPrivateKey",
    Enabled: true
  },
  Tags: [{
    Key: "Environment",
    Value: "Test"
  }]
});
```

## Advanced Configuration

Set up an import task with additional settings for Sidewalk and multiple tags.

```ts
const advancedImportTask = await AWS.IoTWireless.WirelessDeviceImportTask("advancedImportTask", {
  DestinationName: "AdvancedDeviceImportDestination",
  Sidewalk: {
    AppServerPrivateKey: "myAdvancedPrivateKey",
    Enabled: true,
    DeviceProfileId: "myDeviceProfileId"
  },
  Tags: [
    {
      Key: "Project",
      Value: "IoTDeployment"
    },
    {
      Key: "Owner",
      Value: "JohnDoe"
    }
  ],
  adopt: true // Adopt existing resource instead of failing
});
```

## Sidewalk Device Profile Configuration

Create an import task specifically for Sidewalk devices with a designated device profile.

```ts
const sidewalkImportTask = await AWS.IoTWireless.WirelessDeviceImportTask("sidewalkImportTask", {
  DestinationName: "SidewalkDeviceImport",
  Sidewalk: {
    AppServerPrivateKey: "anotherPrivateKeyForSidewalk",
    Enabled: true,
    DeviceProfileId: "specificDeviceProfileId"
  },
  Tags: [{
    Key: "Usage",
    Value: "Sidewalk"
  }]
});
```

---
title: FuotaTask
description: Learn how to create, update, and manage AWS IoTWireless FuotaTasks using Alchemy Cloud Control.
---


The FuotaTask resource lets you manage [AWS IoTWireless FuotaTasks](https://docs.aws.amazon.com/iotwireless/latest/userguide/) for firmware updates over the air (FUOTA) to your devices.

## Minimal Example

Create a basic FuotaTask with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const fuotaTask = await AWS.IoTWireless.FuotaTask("myFuotaTask", {
  firmwareUpdateImage: "s3://my-bucket/my-firmware-image.bin",
  firmwareUpdateRole: "arn:aws:iam::123456789012:role/myFirmwareUpdateRole",
  loRaWAN: {
    fPort: 1,
    targetDevices: {
      deviceIds: ["deviceId1", "deviceId2"]
    }
  },
  name: "MyFuotaTask",
  description: "This is a sample FuotaTask for firmware updates"
});
```

## Advanced Configuration

Configure a FuotaTask with additional options including associating a multicast group.

```ts
const advancedFuotaTask = await AWS.IoTWireless.FuotaTask("advancedFuotaTask", {
  firmwareUpdateImage: "s3://my-bucket/my-firmware-image-v2.bin",
  firmwareUpdateRole: "arn:aws:iam::123456789012:role/myFirmwareUpdateRole",
  loRaWAN: {
    fPort: 1,
    targetDevices: {
      deviceIds: ["deviceId1", "deviceId2", "deviceId3"]
    }
  },
  associateMulticastGroup: "my-multicast-group-id",
  description: "Advanced FuotaTask with multicast group association"
});
```

## Disassociating Wireless Devices

Create a FuotaTask that disassociates a specific wireless device.

```ts
const disassociateDeviceFuotaTask = await AWS.IoTWireless.FuotaTask("disassociateDeviceFuotaTask", {
  firmwareUpdateImage: "s3://my-bucket/my-firmware-image-v3.bin",
  firmwareUpdateRole: "arn:aws:iam::123456789012:role/myFirmwareUpdateRole",
  loRaWAN: {
    fPort: 1,
    targetDevices: {
      deviceIds: ["deviceId4"]
    }
  },
  disassociateWirelessDevice: "deviceId4",
  name: "FuotaTaskForDisassociation",
  description: "This FuotaTask disassociates a specific device"
});
```

## Tagging Resources

Create a FuotaTask with tags for better resource management.

```ts
const taggedFuotaTask = await AWS.IoTWireless.FuotaTask("taggedFuotaTask", {
  firmwareUpdateImage: "s3://my-bucket/my-firmware-image-v4.bin",
  firmwareUpdateRole: "arn:aws:iam::123456789012:role/myFirmwareUpdateRole",
  loRaWAN: {
    fPort: 1,
    targetDevices: {
      deviceIds: ["deviceId5"]
    }
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "IoTFirmwareUpdates" }
  ],
  name: "TaggedFuotaTask",
  description: "FuotaTask with tags for resource management"
});
```

---
title: DeviceDefinitionVersion
description: Learn how to create, update, and manage AWS Greengrass DeviceDefinitionVersions using Alchemy Cloud Control.
---


The DeviceDefinitionVersion resource allows you to create and manage versions of device definitions in AWS Greengrass, which is essential for deploying applications on IoT devices. For more information, refer to the [AWS Greengrass DeviceDefinitionVersions documentation](https://docs.aws.amazon.com/greengrass/latest/userguide/).

## Minimal Example

Create a basic DeviceDefinitionVersion with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const deviceDefinitionVersion = await AWS.Greengrass.DeviceDefinitionVersion("myDeviceDefinitionVersion", {
  DeviceDefinitionId: "myDeviceDefinitionId",
  Devices: [
    {
      Id: "myDevice1",
      Type: "thing",
      ThingArn: "arn:aws:iot:us-west-2:123456789012:thing/MyDevice1"
    }
  ],
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a DeviceDefinitionVersion with multiple devices and additional settings.

```ts
const advancedDeviceDefinitionVersion = await AWS.Greengrass.DeviceDefinitionVersion("myAdvancedDeviceDefinitionVersion", {
  DeviceDefinitionId: "myAdvancedDeviceDefinitionId",
  Devices: [
    {
      Id: "myDevice2",
      Type: "thing",
      ThingArn: "arn:aws:iot:us-west-2:123456789012:thing/MyDevice2"
    },
    {
      Id: "myDevice3",
      Type: "thing",
      ThingArn: "arn:aws:iot:us-west-2:123456789012:thing/MyDevice3"
    }
  ]
});
```

## Versioning and Updates

Update an existing DeviceDefinitionVersion to include new devices.

```ts
const updatedDeviceDefinitionVersion = await AWS.Greengrass.DeviceDefinitionVersion("myUpdatedDeviceDefinitionVersion", {
  DeviceDefinitionId: "myDeviceDefinitionId",
  Devices: [
    {
      Id: "myDevice4",
      Type: "thing",
      ThingArn: "arn:aws:iot:us-west-2:123456789012:thing/MyDevice4"
    },
    {
      Id: "myDevice5",
      Type: "thing",
      ThingArn: "arn:aws:iot:us-west-2:123456789012:thing/MyDevice5"
    }
  ],
  adopt: false // Optional: Do not adopt existing resource
});
```

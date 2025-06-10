---
title: DeviceDefinition
description: Learn how to create, update, and manage AWS Greengrass DeviceDefinitions using Alchemy Cloud Control.
---


The DeviceDefinition resource allows you to manage [AWS Greengrass DeviceDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) that define a group of devices in your Greengrass environment.

## Minimal Example

Create a basic DeviceDefinition with required properties and an initial version.

```ts
import AWS from "alchemy/aws/control";

const basicDeviceDefinition = await AWS.Greengrass.DeviceDefinition("basicDeviceDef", {
  name: "BasicDeviceDefinition",
  initialVersion: {
    devices: [
      {
        id: "MyDevice",
        thingArn: "arn:aws:iot:us-west-2:123456789012:thing/MyDevice"
      }
    ]
  },
  tags: {
    Environment: "Development"
  }
});
```

## Advanced Configuration

Create a DeviceDefinition with multiple devices and additional tags for better organization.

```ts
const advancedDeviceDefinition = await AWS.Greengrass.DeviceDefinition("advancedDeviceDef", {
  name: "AdvancedDeviceDefinition",
  initialVersion: {
    devices: [
      {
        id: "TemperatureSensor",
        thingArn: "arn:aws:iot:us-west-2:123456789012:thing/TemperatureSensor"
      },
      {
        id: "HumiditySensor",
        thingArn: "arn:aws:iot:us-west-2:123456789012:thing/HumiditySensor"
      }
    ]
  },
  tags: {
    Environment: "Production",
    Project: "SmartHome"
  }
});
```

## Device Adoption

Create a DeviceDefinition that adopts existing resources instead of failing when the resource already exists.

```ts
const adoptDeviceDefinition = await AWS.Greengrass.DeviceDefinition("adoptDeviceDef", {
  name: "AdoptedDeviceDefinition",
  initialVersion: {
    devices: [
      {
        id: "ExistingDevice",
        thingArn: "arn:aws:iot:us-west-2:123456789012:thing/ExistingDevice"
      }
    ]
  },
  adopt: true,
  tags: {
    Environment: "Testing"
  }
});
``` 

## Updating Device Definitions

Demonstrate how to update an existing DeviceDefinition with additional devices.

```ts
const updatedDeviceDefinition = await AWS.Greengrass.DeviceDefinition("updateDeviceDef", {
  name: "UpdatedDeviceDefinition",
  initialVersion: {
    devices: [
      {
        id: "NewSensor",
        thingArn: "arn:aws:iot:us-west-2:123456789012:thing/NewSensor"
      }
    ]
  },
  tags: {
    Environment: "Staging",
    UpdatedBy: "DevTeam"
  }
});
```

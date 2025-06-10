---
title: Device
description: Learn how to create, update, and manage AWS SageMaker Devices using Alchemy Cloud Control.
---


The Device resource allows you to manage [AWS SageMaker Devices](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for deploying machine learning models on edge devices.

## Minimal Example

Create a basic SageMaker Device associated with a device fleet:

```ts
import AWS from "alchemy/aws/control";

const basicDevice = await AWS.SageMaker.Device("basicDevice", {
  DeviceFleetName: "myDeviceFleet",
  Device: {
    DeviceName: "myEdgeDevice",
    DeviceType: "RaspberryPi"
  },
  Tags: [
    { Key: "Project", Value: "MLEdge" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a SageMaker Device with additional properties like tags and adopt existing resource option:

```ts
const advancedDevice = await AWS.SageMaker.Device("advancedDevice", {
  DeviceFleetName: "myDeviceFleet",
  Device: {
    DeviceName: "advancedEdgeDevice",
    DeviceType: "JetsonNano"
  },
  Tags: [
    { Key: "Project", Value: "MLEdge" },
    { Key: "Environment", Value: "Staging" }
  ],
  adopt: true // adopt existing resource if it exists
});
```

## Using Existing Devices

If you want to adopt an existing device without creating a new one, you can set the `adopt` property to true:

```ts
const existingDevice = await AWS.SageMaker.Device("existingDevice", {
  DeviceFleetName: "myDeviceFleet",
  Device: {
    DeviceName: "existingDevice",
    DeviceType: "RaspberryPi"
  },
  adopt: true
});
```

## Setting Tags

You can specify tags to categorize your devices effectively, which can be useful for organization and billing:

```ts
const taggedDevice = await AWS.SageMaker.Device("taggedDevice", {
  DeviceFleetName: "myDeviceFleet",
  Device: {
    DeviceName: "taggedEdgeDevice",
    DeviceType: "JetsonTX2"
  },
  Tags: [
    { Key: "Owner", Value: "DataScienceTeam" },
    { Key: "Purpose", Value: "ModelInference" }
  ]
});
```

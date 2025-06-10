---
title: Input
description: Learn how to create, update, and manage AWS IoTEvents Inputs using Alchemy Cloud Control.
---


The Input resource allows you to manage [AWS IoTEvents Inputs](https://docs.aws.amazon.com/iotevents/latest/userguide/) used for detecting changes in your IoT data. Inputs define the structure of the data that your IoTEvents detectors will use.

## Minimal Example

Create a basic IoTEvents Input with required properties along with a description and tags.

```ts
import AWS from "alchemy/aws/control";

const basicInput = await AWS.IoTEvents.Input("basicInput", {
  InputDefinition: {
    Inputs: [
      {
        Name: "temperature",
        Type: "double"
      },
      {
        Name: "humidity",
        Type: "double"
      }
    ]
  },
  InputName: "TemperatureAndHumidityInput",
  InputDescription: "Input for monitoring temperature and humidity levels.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Application", Value: "IoTMonitoring" }
  ]
});
```

## Advanced Configuration

Configure an Input with a more complex definition and additional properties.

```ts
const advancedInput = await AWS.IoTEvents.Input("advancedInput", {
  InputDefinition: {
    Inputs: [
      {
        Name: "deviceStatus",
        Type: "string"
      },
      {
        Name: "batteryLevel",
        Type: "integer"
      },
      {
        Name: "location",
        Type: "string"
      }
    ]
  },
  InputName: "DeviceStatusInput",
  InputDescription: "Input for tracking device status and battery levels.",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Application", Value: "DeviceManagement" }
  ]
});
```

## Input with Dynamic Attributes

Create an Input that includes dynamic attributes for flexible data ingestion.

```ts
const dynamicInput = await AWS.IoTEvents.Input("dynamicInput", {
  InputDefinition: {
    Inputs: [
      {
        Name: "eventType",
        Type: "string"
      },
      {
        Name: "eventData",
        Type: "json"
      }
    ]
  },
  InputName: "DynamicEventInput",
  InputDescription: "Input designed to handle various event types and data.",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Application", Value: "EventProcessing" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

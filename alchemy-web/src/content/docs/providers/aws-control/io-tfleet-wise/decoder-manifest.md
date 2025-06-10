---
title: DecoderManifest
description: Learn how to create, update, and manage AWS IoTFleetWise DecoderManifests using Alchemy Cloud Control.
---


The DecoderManifest resource allows you to manage [AWS IoTFleetWise DecoderManifests](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) which define the structure and behavior of the vehicle data collected from various signals.

## Minimal Example

Create a basic DecoderManifest with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicDecoderManifest = await AWS.IoTFleetWise.DecoderManifest("basicDecoderManifest", {
  modelManifestArn: "arn:aws:iotfleetwise:us-west-2:123456789012:modelManifest:example-model-manifest",
  name: "BasicDecoderManifest",
  signalDecoders: [
    {
      signalName: "EngineSpeed",
      dataType: "uint16",
      offset: 0,
      scaling: 1,
      unit: "RPM"
    }
  ],
  status: "ACTIVE"
});
```

## Advanced Configuration

Configure a DecoderManifest with additional properties, including network interfaces and tags.

```ts
const advancedDecoderManifest = await AWS.IoTFleetWise.DecoderManifest("advancedDecoderManifest", {
  modelManifestArn: "arn:aws:iotfleetwise:us-west-2:123456789012:modelManifest:advanced-model-manifest",
  name: "AdvancedDecoderManifest",
  signalDecoders: [
    {
      signalName: "VehicleSpeed",
      dataType: "uint16",
      offset: 0,
      scaling: 1,
      unit: "KPH"
    },
    {
      signalName: "FuelLevel",
      dataType: "float",
      offset: 0,
      scaling: 0.01,
      unit: "%"
    }
  ],
  networkInterfaces: [
    {
      interfaceId: "eth0",
      cidr: "192.168.1.0/24",
      ports: [10000, 10001]
    }
  ],
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "IoT" }
  ]
});
```

## Using Default Settings for Unmapped Signals

Create a DecoderManifest that specifies default handling for unmapped signals.

```ts
const unmappedSignalsDecoderManifest = await AWS.IoTFleetWise.DecoderManifest("unmappedSignalsDecoderManifest", {
  modelManifestArn: "arn:aws:iotfleetwise:us-west-2:123456789012:modelManifest:default-handling-model-manifest",
  name: "UnmappedSignalsDecoderManifest",
  signalDecoders: [
    {
      signalName: "BatteryVoltage",
      dataType: "float",
      offset: 0,
      scaling: 0.1,
      unit: "V"
    }
  ],
  defaultForUnmappedSignals: "USE_DEFAULT"
});
```

---
title: Vehicle
description: Learn how to create, update, and manage AWS IoTFleetWise Vehicles using Alchemy Cloud Control.
---


The Vehicle resource enables you to manage [AWS IoTFleetWise Vehicles](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) for capturing and monitoring vehicle data.

## Minimal Example

Create a basic vehicle resource with required properties and some optional attributes.

```ts
import AWS from "alchemy/aws/control";

const vehicle = await AWS.IoTFleetWise.Vehicle("myVehicle", {
  name: "MyVehicle",
  decoderManifestArn: "arn:aws:iotfleetwise:us-west-2:123456789012:decoder-manifest/my-decoder-manifest",
  modelManifestArn: "arn:aws:iotfleetwise:us-west-2:123456789012:model-manifest/my-model-manifest",
  attributes: {
    color: "red",
    year: 2021
  },
  associationBehavior: "ASSOCIATE"
});
```

## Advanced Configuration

Configure a vehicle with state templates and tags for enhanced management capabilities.

```ts
const advancedVehicle = await AWS.IoTFleetWise.Vehicle("advancedVehicle", {
  name: "AdvancedVehicle",
  decoderManifestArn: "arn:aws:iotfleetwise:us-west-2:123456789012:decoder-manifest/my-decoder-manifest",
  modelManifestArn: "arn:aws:iotfleetwise:us-west-2:123456789012:model-manifest/my-model-manifest",
  attributes: {
    fuelType: "diesel",
    transmission: "automatic"
  },
  stateTemplates: [
    {
      name: "EngineState",
      associationBehavior: "ASSOCIATE"
    },
    {
      name: "BatteryState",
      associationBehavior: "DISSOCIATE"
    }
  ],
  tags: [
    {
      key: "Department",
      value: "Engineering"
    },
    {
      key: "Usage",
      value: "Testing"
    }
  ]
});
```

## Adoption of Existing Resource

Create a vehicle resource that adopts an existing vehicle if found, rather than failing.

```ts
const adoptedVehicle = await AWS.IoTFleetWise.Vehicle("existingVehicle", {
  name: "ExistingVehicle",
  decoderManifestArn: "arn:aws:iotfleetwise:us-west-2:123456789012:decoder-manifest/my-decoder-manifest",
  modelManifestArn: "arn:aws:iotfleetwise:us-west-2:123456789012:model-manifest/my-model-manifest",
  adopt: true
});
```

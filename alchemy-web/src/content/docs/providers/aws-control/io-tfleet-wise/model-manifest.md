---
title: ModelManifest
description: Learn how to create, update, and manage AWS IoTFleetWise ModelManifests using Alchemy Cloud Control.
---


The ModelManifest resource allows you to define and manage [AWS IoTFleetWise ModelManifests](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) that specify vehicle signal configurations and data collection strategies.

## Minimal Example

Create a basic ModelManifest with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicModelManifest = await AWS.IoTFleetWise.ModelManifest("basicModelManifest", {
  name: "BasicVehicleManifest",
  signalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog/MySignalCatalog",
  status: "ACTIVE",
  description: "A basic model manifest for vehicle data collection."
});
```

## Advanced Configuration

Configure a ModelManifest with additional nodes and tags for better organization and clarity.

```ts
const advancedModelManifest = await AWS.IoTFleetWise.ModelManifest("advancedModelManifest", {
  name: "AdvancedVehicleManifest",
  signalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog/MySignalCatalog",
  status: "ACTIVE",
  description: "An advanced model manifest with specific nodes and tags.",
  nodes: ["Node1", "Node2"],
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "FleetManagement" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing ModelManifest instead of failing when it already exists, you can use the `adopt` property.

```ts
const adoptExistingModelManifest = await AWS.IoTFleetWise.ModelManifest("adoptExistingModelManifest", {
  name: "ExistingVehicleManifest",
  signalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog/MySignalCatalog",
  status: "ACTIVE",
  description: "Adopting an existing model manifest without failure.",
  adopt: true
});
```

## Creation with Nodes

Create a ModelManifest that includes specific nodes to collect data from.

```ts
const modelManifestWithNodes = await AWS.IoTFleetWise.ModelManifest("modelManifestWithNodes", {
  name: "VehicleDataManifest",
  signalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog/MySignalCatalog",
  description: "A manifest that includes specific nodes for data collection.",
  nodes: [
    "EngineSpeed",
    "VehicleSpeed",
    "FuelLevel"
  ]
});
```

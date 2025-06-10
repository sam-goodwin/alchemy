---
title: SignalCatalog
description: Learn how to create, update, and manage AWS IoTFleetWise SignalCatalogs using Alchemy Cloud Control.
---


The SignalCatalog resource allows you to manage [AWS IoTFleetWise SignalCatalogs](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) which define the signals that can be transmitted from vehicles. It provides a way to organize and structure the data collected from different vehicle nodes.

## Minimal Example

Create a basic SignalCatalog with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicSignalCatalog = await AWS.IoTFleetWise.SignalCatalog("basicSignalCatalog", {
  Name: "BasicSignalCatalog",
  Description: "A basic signal catalog for vehicle data collection."
});
```

## Advanced Configuration

Configure a SignalCatalog with node counts and multiple nodes for detailed signal management.

```ts
const advancedSignalCatalog = await AWS.IoTFleetWise.SignalCatalog("advancedSignalCatalog", {
  Name: "AdvancedSignalCatalog",
  Description: "An advanced signal catalog with detailed node configurations.",
  NodeCounts: {
    Total: 10,
    Active: 8
  },
  Nodes: [
    {
      NodeName: "EngineSpeed",
      DataType: "Double",
      Units: "RPM"
    },
    {
      NodeName: "FuelLevel",
      DataType: "Double",
      Units: "Liters"
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "VehicleMonitoring"
    }
  ]
});
```

## Using Tags for Organization

Create a SignalCatalog with tags to help organize and manage your resources effectively.

```ts
const taggedSignalCatalog = await AWS.IoTFleetWise.SignalCatalog("taggedSignalCatalog", {
  Name: "TaggedSignalCatalog",
  Description: "A signal catalog with tags for better resource management.",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Owner",
      Value: "FleetManagementTeam"
    }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing SignalCatalog instead of failing when it already exists, set the adopt property to true.

```ts
const adoptedSignalCatalog = await AWS.IoTFleetWise.SignalCatalog("adoptedSignalCatalog", {
  Name: "ExistingSignalCatalog",
  Description: "This catalog adopts an existing signal catalog.",
  adopt: true
});
```

---
title: Managing AWS IoTFleetWise Fleets with Alchemy
description: Learn how to create, update, and manage AWS IoTFleetWise Fleets using Alchemy Cloud Control.
---

# Fleet

The Fleet resource lets you manage [AWS IoTFleetWise Fleets](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) for organizing and managing vehicle data collection.

## Minimal Example

Create a basic fleet with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const BasicFleet = await AWS.IoTFleetWise.Fleet("BasicFleet", {
  Id: "Fleet123",
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog/SignalCatalog123",
  Description: "This is a basic fleet for vehicle data collection"
});
```

## Advanced Configuration

Configure a fleet with tags for better resource management and identification.

```ts
const TaggedFleet = await AWS.IoTFleetWise.Fleet("TaggedFleet", {
  Id: "Fleet456",
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog/SignalCatalog456",
  Description: "This fleet has specific tags for management",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Adoption of Existing Resources

Create a fleet that adopts an existing resource instead of failing if the resource already exists.

```ts
const AdoptedFleet = await AWS.IoTFleetWise.Fleet("AdoptedFleet", {
  Id: "Fleet789",
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog/SignalCatalog789",
  Description: "This fleet adopts an existing resource",
  adopt: true
});
```
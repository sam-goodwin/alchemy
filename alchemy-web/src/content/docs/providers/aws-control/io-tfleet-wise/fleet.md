---
title: Fleet
description: Learn how to create, update, and manage AWS IoTFleetWise Fleets using Alchemy Cloud Control.
---


The Fleet resource allows you to manage [AWS IoTFleetWise Fleets](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) for collecting and processing vehicle data efficiently.

## Minimal Example

Create a basic fleet with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicFleet = await AWS.IoTFleetWise.Fleet("my-basic-fleet", {
  Id: "fleet-12345",
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog:catalog-1",
  Description: "A simple fleet for demonstration purposes."
});
```

## Advanced Configuration

Create a fleet with custom tags for better resource management.

```ts
const advancedFleet = await AWS.IoTFleetWise.Fleet("my-advanced-fleet", {
  Id: "fleet-67890",
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog:catalog-2",
  Description: "An advanced fleet with tags.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "FleetManagement" }
  ]
});
```

## Adoption of Existing Resource

Create a fleet while adopting an existing resource instead of failing if it already exists.

```ts
const adoptedFleet = await AWS.IoTFleetWise.Fleet("my-adopted-fleet", {
  Id: "fleet-11223",
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog:catalog-3",
  Description: "An adopted fleet configuration.",
  adopt: true
});
```

## Update Fleet Configuration

Update an existing fleet's description.

```ts
const updatedFleet = await AWS.IoTFleetWise.Fleet("my-updated-fleet", {
  Id: "fleet-12345",
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog:catalog-1",
  Description: "Updated description for the fleet."
});
```

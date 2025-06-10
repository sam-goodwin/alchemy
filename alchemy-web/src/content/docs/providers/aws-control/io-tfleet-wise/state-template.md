---
title: StateTemplate
description: Learn how to create, update, and manage AWS IoTFleetWise StateTemplates using Alchemy Cloud Control.
---


The StateTemplate resource lets you create and manage [AWS IoTFleetWise StateTemplates](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) for vehicle state data collection and analysis.

## Minimal Example

Create a basic StateTemplate with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicStateTemplate = await AWS.IoTFleetWise.StateTemplate("basicStateTemplate", {
  Name: "BasicStateTemplate",
  StateTemplateProperties: ["property1", "property2"],
  Description: "A basic state template for vehicle data collection",
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog:example-signal-catalog"
});
```

## Advanced Configuration

Configure a StateTemplate with additional optional properties such as extra dimensions and tags:

```ts
const advancedStateTemplate = await AWS.IoTFleetWise.StateTemplate("advancedStateTemplate", {
  Name: "AdvancedStateTemplate",
  StateTemplateProperties: ["property1", "property2", "property3"],
  Description: "An advanced state template with extra dimensions",
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog:example-signal-catalog",
  DataExtraDimensions: ["dimension1", "dimension2"],
  MetadataExtraDimensions: ["metadata1"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "FleetManager" }
  ]
});
```

## Updating an Existing StateTemplate

Adopt an existing StateTemplate if it already exists instead of failing:

```ts
const updateStateTemplate = await AWS.IoTFleetWise.StateTemplate("updateStateTemplate", {
  Name: "ExistingStateTemplate",
  StateTemplateProperties: ["updatedProperty1", "updatedProperty2"],
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog:example-signal-catalog",
  adopt: true // Allow adoption of existing resource
});
```

## Using Multiple StateTemplates

Create multiple StateTemplates for different vehicle states:

```ts
const engineStateTemplate = await AWS.IoTFleetWise.StateTemplate("engineStateTemplate", {
  Name: "EngineStateTemplate",
  StateTemplateProperties: ["engineStatus", "engineTemperature"],
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog:example-signal-catalog"
});

const batteryStateTemplate = await AWS.IoTFleetWise.StateTemplate("batteryStateTemplate", {
  Name: "BatteryStateTemplate",
  StateTemplateProperties: ["batteryLevel", "batteryTemperature"],
  SignalCatalogArn: "arn:aws:iotfleetwise:us-west-2:123456789012:signal-catalog:example-signal-catalog"
});
```

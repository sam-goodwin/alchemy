---
title: Managing AWS IoT ThingTypes with Alchemy
description: Learn how to create, update, and manage AWS IoT ThingTypes using Alchemy Cloud Control.
---

# ThingType

The ThingType resource allows you to manage [AWS IoT ThingTypes](https://docs.aws.amazon.com/iot/latest/userguide/) which define the specifications for a group of IoT Things. This resource helps in organizing and managing your IoT devices effectively.

## Minimal Example

Create a basic ThingType with a name and properties.

```ts
import AWS from "alchemy/aws/control";

const BasicThingType = await AWS.IoT.ThingType("BasicThingType", {
  ThingTypeName: "TemperatureSensor",
  ThingTypeProperties: {
    // Additional properties can be added here
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "DeviceType", Value: "Sensor" }
  ]
});
```

## Advanced Configuration

Configure a ThingType with deprecation and specific properties.

```ts
const AdvancedThingType = await AWS.IoT.ThingType("AdvancedThingType", {
  ThingTypeName: "SmartLight",
  ThingTypeProperties: {
    // Here, you can define properties specific to your ThingType
    // For example: 
    // "Description": "A smart light bulb that can be controlled via IoT"
  },
  DeprecateThingType: false,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Deprecating a ThingType

Demonstrate how to deprecate an existing ThingType.

```ts
const DeprecateThingType = await AWS.IoT.ThingType("DeprecateThingType", {
  ThingTypeName: "OldTemperatureSensor",
  DeprecateThingType: true,
  Tags: [
    { Key: "Status", Value: "Deprecated" }
  ]
});
```

## Updating a ThingType

Show how to update the properties of an existing ThingType.

```ts
const UpdateThingType = await AWS.IoT.ThingType("UpdateThingType", {
  ThingTypeName: "TemperatureSensor",
  ThingTypeProperties: {
    // Update properties as needed
    // For example: 
    // "Description": "Updated description for temperature sensors"
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "IoT" }
  ]
});
```
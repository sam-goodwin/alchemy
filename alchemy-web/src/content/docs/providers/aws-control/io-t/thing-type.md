---
title: ThingType
description: Learn how to create, update, and manage AWS IoT ThingTypes using Alchemy Cloud Control.
---


The ThingType resource allows you to manage [AWS IoT ThingTypes](https://docs.aws.amazon.com/iot/latest/userguide/) which are used to define the characteristics of a group of devices in AWS IoT. This resource can be utilized to create, update, and deprecate ThingTypes for your IoT devices.

## Minimal Example

Create a basic ThingType with a specified name and optional properties.

```ts
import AWS from "alchemy/aws/control";

const basicThingType = await AWS.IoT.ThingType("basicThingType", {
  ThingTypeName: "TemperatureSensor",
  ThingTypeProperties: {
    searchableAttributes: ["location", "status"]
  }
});
```

## Advanced Configuration

Configure a ThingType with deprecation settings and tags for better organization.

```ts
const advancedThingType = await AWS.IoT.ThingType("advancedThingType", {
  ThingTypeName: "HumiditySensor",
  ThingTypeProperties: {
    searchableAttributes: ["location", "model"]
  },
  DeprecateThingType: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Type", Value: "Sensor" }
  ]
});
```

## Deprecating a ThingType

Deprecate an existing ThingType that is no longer needed.

```ts
const deprecateThingType = await AWS.IoT.ThingType("deprecateThingType", {
  ThingTypeName: "OldTemperatureSensor",
  DeprecateThingType: true
});
```

## Creating with Tags

Create a ThingType that includes multiple tags for better management and identification.

```ts
const taggedThingType = await AWS.IoT.ThingType("taggedThingType", {
  ThingTypeName: "PressureSensor",
  ThingTypeProperties: {
    searchableAttributes: ["location", "model"]
  },
  Tags: [
    { Key: "Department", Value: "Engineering" },
    { Key: "Usage", Value: "Research" }
  ]
});
```

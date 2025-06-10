---
title: Thing
description: Learn how to create, update, and manage AWS IoT Things using Alchemy Cloud Control.
---


The Thing resource allows you to manage [AWS IoT Things](https://docs.aws.amazon.com/iot/latest/userguide/) which represent physical devices or logical entities that connect to AWS IoT. This resource provides the ability to create, update, and configure IoT Things, including their attributes and names.

## Minimal Example

Create a basic IoT Thing with a specified name and an attribute payload.

```ts
import AWS from "alchemy/aws/control";

const myIoTThing = await AWS.IoT.Thing("myFirstIoTThing", {
  ThingName: "MyFirstIoTDevice",
  AttributePayload: {
    attributes: {
      manufacturer: "Acme Corp",
      model: "v1.0"
    }
  }
});
```

## Advanced Configuration

Configure an IoT Thing with additional properties, including adopting an existing resource.

```ts
const advancedIoTThing = await AWS.IoT.Thing("advancedIoTThing", {
  ThingName: "AdvancedIoTDevice",
  AttributePayload: {
    attributes: {
      manufacturer: "Acme Corp",
      model: "v2.0",
      location: "Warehouse A"
    }
  },
  adopt: true // Adopts the existing thing if it already exists
});
```

## Custom Attributes

Create a Thing with custom attributes to support device identification and categorization.

```ts
const categorizedIoTThing = await AWS.IoT.Thing("categorizedIoTThing", {
  ThingName: "TemperatureSensor",
  AttributePayload: {
    attributes: {
      manufacturer: "SensorTech",
      model: "TempPro",
      location: "Building 1",
      sensorType: "Temperature"
    }
  }
});
```

## Updating an Existing Thing

Demonstrate how to update an existing IoT Thing's attributes.

```ts
const updatedIoTThing = await AWS.IoT.Thing("updatedIoTThing", {
  ThingName: "TemperatureSensor",
  AttributePayload: {
    attributes: {
      manufacturer: "SensorTech",
      model: "TempPro",
      location: "Building 1",
      sensorType: "Temperature",
      lastServiced: "2023-10-01" // New attribute added
    }
  },
  adopt: true // Adopts the existing thing
});
```

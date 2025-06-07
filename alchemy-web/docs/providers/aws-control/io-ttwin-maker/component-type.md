---
title: Managing AWS IoTTwinMaker ComponentTypes with Alchemy
description: Learn how to create, update, and manage AWS IoTTwinMaker ComponentTypes using Alchemy Cloud Control.
---

# ComponentType

The ComponentType resource allows you to define and manage [AWS IoTTwinMaker ComponentTypes](https://docs.aws.amazon.com/iottwinmaker/latest/userguide/) for your digital twin applications, enabling you to create reusable models for your entities.

## Minimal Example

Create a basic ComponentType with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicComponentType = await AWS.IoTTwinMaker.ComponentType("BasicComponentType", {
  WorkspaceId: "myWorkspaceId",
  ComponentTypeId: "TemperatureSensor",
  Description: "A component type for temperature sensors."
});
```

## Advanced Configuration

Define a ComponentType with advanced options such as property definitions and tags.

```ts
const AdvancedComponentType = await AWS.IoTTwinMaker.ComponentType("AdvancedComponentType", {
  WorkspaceId: "myWorkspaceId",
  ComponentTypeId: "PressureSensor",
  Description: "A component type for pressure sensors.",
  PropertyDefinitions: {
    Pressure: {
      Type: "double",
      Unit: "Pa",
      Required: true,
      DefaultValue: 101325
    },
    Status: {
      Type: "string",
      Required: false
    }
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Singleton ComponentType

Demonstrate the creation of a singleton ComponentType, ensuring that only one instance exists.

```ts
const SingletonComponentType = await AWS.IoTTwinMaker.ComponentType("SingletonComponentType", {
  WorkspaceId: "myWorkspaceId",
  ComponentTypeId: "UniqueDevice",
  IsSingleton: true,
  Description: "A singleton component type for unique devices."
});
```

## Composite ComponentTypes

Create a ComponentType that serves as a composite of other ComponentTypes.

```ts
const CompositeComponentType = await AWS.IoTTwinMaker.ComponentType("CompositeComponentType", {
  WorkspaceId: "myWorkspaceId",
  ComponentTypeId: "SmartHomeDevice",
  Description: "A composite component type for smart home devices.",
  CompositeComponentTypes: [
    { ComponentTypeId: "TemperatureSensor" },
    { ComponentTypeId: "HumiditySensor" }
  ]
});
```
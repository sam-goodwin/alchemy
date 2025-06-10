---
title: ComponentType
description: Learn how to create, update, and manage AWS IoTTwinMaker ComponentTypes using Alchemy Cloud Control.
---


The ComponentType resource allows you to define and manage [AWS IoTTwinMaker ComponentTypes](https://docs.aws.amazon.com/iottwinmaker/latest/userguide/), which are essential for creating digital twins of physical assets.

## Minimal Example

Create a basic ComponentType with required properties and one optional property for description.

```ts
import AWS from "alchemy/aws/control";

const basicComponentType = await AWS.IoTTwinMaker.ComponentType("basicComponentType", {
  WorkspaceId: "workspace-123",
  ComponentTypeId: "basicComponent",
  Description: "A basic component type for demonstration purposes",
  IsSingleton: false
});
```

## Advanced Configuration

Configure a ComponentType with detailed property definitions and a composite component type.

```ts
const advancedComponentType = await AWS.IoTTwinMaker.ComponentType("advancedComponentType", {
  WorkspaceId: "workspace-123",
  ComponentTypeId: "advancedComponent",
  Description: "An advanced component type with specific property definitions",
  PropertyDefinitions: {
    Temperature: {
      Type: "Number",
      Unit: "Celsius",
      DefaultValue: 20
    },
    Status: {
      Type: "String",
      DefaultValue: "Operational"
    }
  },
  CompositeComponentTypes: {
    SubComponent: {
      Type: "SubComponentType"
    }
  },
  Tags: {
    Environment: "Production"
  }
});
```

## Singleton ComponentType

Define a singleton ComponentType that ensures only one instance can exist.

```ts
const singletonComponentType = await AWS.IoTTwinMaker.ComponentType("singletonComponentType", {
  WorkspaceId: "workspace-123",
  ComponentTypeId: "singletonComponent",
  IsSingleton: true,
  Description: "A singleton component type ensuring a single instance",
  PropertyDefinitions: {
    Version: {
      Type: "String",
      DefaultValue: "1.0"
    }
  }
});
```

## ComponentType Extending Another

Create a ComponentType that extends from another existing ComponentType.

```ts
const extendedComponentType = await AWS.IoTTwinMaker.ComponentType("extendedComponentType", {
  WorkspaceId: "workspace-123",
  ComponentTypeId: "extendedComponent",
  ExtendsFrom: ["baseComponent"],
  Description: "An extended component type from baseComponent",
  PropertyDefinitions: {
    Pressure: {
      Type: "Number",
      Unit: "Pascal",
      DefaultValue: 101325
    }
  }
});
```

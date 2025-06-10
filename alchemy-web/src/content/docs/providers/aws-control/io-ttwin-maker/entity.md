---
title: Entity
description: Learn how to create, update, and manage AWS IoTTwinMaker Entitys using Alchemy Cloud Control.
---


The Entity resource lets you manage [AWS IoTTwinMaker Entities](https://docs.aws.amazon.com/iottwinmaker/latest/userguide/) which represent real-world objects in your digital twin environments.

## Minimal Example

Create a basic entity with required properties and some optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicEntity = await AWS.IoTTwinMaker.Entity("basicEntity", {
  EntityId: "entity-12345",
  EntityName: "CoolingSystem",
  WorkspaceId: "workspace-xyz",
  Description: "A cooling system for the factory"
});
```

## Advanced Configuration

Configure an entity with components and tags for better identification and functionality.

```ts
const advancedEntity = await AWS.IoTTwinMaker.Entity("advancedEntity", {
  EntityId: "entity-67890",
  EntityName: "ConveyorBelt",
  WorkspaceId: "workspace-xyz",
  Components: {
    Speed: {
      type: "number",
      value: 5.0
    },
    Temperature: {
      type: "number",
      value: 70.0
    }
  },
  Tags: {
    environment: "production",
    status: "active"
  }
});
```

## Composite Components

This example demonstrates how to create an entity with composite components.

```ts
const compositeEntity = await AWS.IoTTwinMaker.Entity("compositeEntity", {
  EntityId: "entity-13579",
  EntityName: "SensorArray",
  WorkspaceId: "workspace-xyz",
  CompositeComponents: {
    TemperatureSensor: {
      type: "Sensor",
      properties: {
        unit: "Celsius",
        value: 22.5
      }
    },
    PressureSensor: {
      type: "Sensor",
      properties: {
        unit: "Pascal",
        value: 101325
      }
    }
  }
});
```

## Parent Entity Relationship

Link an entity as a child to a parent entity.

```ts
const childEntity = await AWS.IoTTwinMaker.Entity("childEntity", {
  EntityId: "entity-24680",
  EntityName: "SubCoolingUnit",
  WorkspaceId: "workspace-xyz",
  ParentEntityId: "entity-12345", // Link to the CoolingSystem entity
  Components: {
    Status: {
      type: "string",
      value: "operational"
    }
  }
});
```

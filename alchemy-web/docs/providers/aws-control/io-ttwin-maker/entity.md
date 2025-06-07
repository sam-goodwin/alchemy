---
title: Managing AWS IoTTwinMaker Entitys with Alchemy
description: Learn how to create, update, and manage AWS IoTTwinMaker Entitys using Alchemy Cloud Control.
---

# Entity

The Entity resource lets you manage [AWS IoTTwinMaker Entitys](https://docs.aws.amazon.com/iottwinmaker/latest/userguide/) and their configurations, allowing you to represent real-world objects in a digital twin.

## Minimal Example

Create a basic IoTTwinMaker Entity with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicEntity = await AWS.IoTTwinMaker.Entity("BasicEntity", {
  EntityId: "Device001",
  EntityName: "Temperature Sensor",
  WorkspaceId: "Workspace123",
  Description: "This entity represents a temperature sensor in the facility."
});
```

## Advanced Configuration

Configure an IoTTwinMaker Entity with components and tags for better organization.

```ts
const advancedEntity = await AWS.IoTTwinMaker.Entity("AdvancedEntity", {
  EntityId: "Device002",
  EntityName: "Pressure Sensor",
  WorkspaceId: "Workspace123",
  Components: {
    "PressureComponent": {
      "type": "PressureSensor",
      "properties": {
        "Pressure": {
          "type": "Double",
          "value": 101.3
        }
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Location", Value: "Main Hall" }
  ]
});
```

## Composite Components Example

Demonstrate how to create an IoTTwinMaker Entity with composite components.

```ts
const compositeEntity = await AWS.IoTTwinMaker.Entity("CompositeEntity", {
  EntityId: "Device003",
  EntityName: "HVAC System",
  WorkspaceId: "Workspace123",
  CompositeComponents: {
    "HVACComposite": {
      "type": "HVACSystem",
      "properties": {
        "Status": {
          "type": "String",
          "value": "Operational"
        },
        "Temperature": {
          "type": "Double",
          "value": 22.5
        }
      }
    }
  },
  Description: "This entity represents the HVAC system controlling room temperature."
});
```

## Parent Entity Example

Create an IoTTwinMaker Entity that has a parent entity defined.

```ts
const parentEntity = await AWS.IoTTwinMaker.Entity("ParentEntity", {
  EntityId: "Building001",
  EntityName: "Main Building",
  WorkspaceId: "Workspace123",
  Description: "This entity represents the main building."
});

const childEntity = await AWS.IoTTwinMaker.Entity("ChildEntity", {
  EntityId: "Room101",
  EntityName: "Conference Room",
  WorkspaceId: "Workspace123",
  ParentEntityId: parentEntity.EntityId,
  Description: "This entity represents the conference room in the main building."
});
```
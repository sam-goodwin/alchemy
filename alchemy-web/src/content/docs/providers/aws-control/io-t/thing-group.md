---
title: ThingGroup
description: Learn how to create, update, and manage AWS IoT ThingGroups using Alchemy Cloud Control.
---


The ThingGroup resource allows you to manage [AWS IoT ThingGroups](https://docs.aws.amazon.com/iot/latest/userguide/) which are collections of AWS IoT Things. ThingGroups help you organize and manage your IoT devices easily.

## Minimal Example

Create a basic ThingGroup with a name and optional parent group.

```ts
import AWS from "alchemy/aws/control";

const basicThingGroup = await AWS.IoT.ThingGroup("basicThingGroup", {
  ThingGroupName: "HomeDevices",
  ParentGroupName: "Devices",
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Configure a ThingGroup with properties for more complex use cases, such as setting custom properties.

```ts
const advancedThingGroup = await AWS.IoT.ThingGroup("advancedThingGroup", {
  ThingGroupName: "OfficeDevices",
  ThingGroupProperties: {
    AttributePayload: {
      Attributes: {
        Department: "IT",
        Location: "Main Office"
      },
      Merge: true
    }
  },
  Tags: [
    { Key: "Project", Value: "IoTDeployment" },
    { Key: "Owner", Value: "TeamAlpha" }
  ]
});
```

## Query String Usage

Create a ThingGroup that includes a query string to filter devices.

```ts
const queryStringThingGroup = await AWS.IoT.ThingGroup("queryStringThingGroup", {
  ThingGroupName: "FilteredDevices",
  QueryString: "attribute.department = 'IT'",
  Tags: [{ Key: "Status", Value: "Active" }]
});
```

## Adoption of Existing Resources

Create a ThingGroup and adopt an existing resource if it already exists.

```ts
const adoptedThingGroup = await AWS.IoT.ThingGroup("adoptedThingGroup", {
  ThingGroupName: "LegacyDevices",
  adopt: true // If true, adopts the existing resource instead of failing
});
```

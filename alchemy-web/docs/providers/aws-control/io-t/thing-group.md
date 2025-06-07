---
title: Managing AWS IoT ThingGroups with Alchemy
description: Learn how to create, update, and manage AWS IoT ThingGroups using Alchemy Cloud Control.
---

# ThingGroup

The ThingGroup resource lets you manage [AWS IoT ThingGroups](https://docs.aws.amazon.com/iot/latest/userguide/) for organizing and controlling IoT devices within a logical grouping.

## Minimal Example

Create a basic ThingGroup with a specified name and some tags for organization.

```ts
import AWS from "alchemy/aws/control";

const BasicThingGroup = await AWS.IoT.ThingGroup("BasicThingGroup", {
  ThingGroupName: "MyDeviceGroup",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "IoT" }
  ],
  adopt: true // This allows adoption of existing resources
});
```

## Advanced Configuration

Configure a ThingGroup with additional properties such as a parent group and custom properties.

```ts
const AdvancedThingGroup = await AWS.IoT.ThingGroup("AdvancedThingGroup", {
  ThingGroupName: "AdvancedDeviceGroup",
  ParentGroupName: "MyParentGroup",
  ThingGroupProperties: {
    // Custom properties relevant to your use case
    ThingGroupDescription: "This is an advanced device group.",
    AttributePayload: {
      Attributes: {
        Location: "Warehouse 1",
        Status: "Active"
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "SmartHome" }
  ]
});
```

## Using Query String for Filtering

Create a ThingGroup with a query string that filters things based on attributes.

```ts
const FilteredThingGroup = await AWS.IoT.ThingGroup("FilteredThingGroup", {
  ThingGroupName: "FilteredDevices",
  QueryString: "attribute:Status = 'Active'",
  Tags: [
    { Key: "Environment", Value: "Testing" }
  ]
});
```

## Updating an Existing ThingGroup

Update an existing ThingGroup by modifying its properties such as adding new tags.

```ts
const UpdateThingGroup = await AWS.IoT.ThingGroup("UpdateThingGroup", {
  ThingGroupName: "MyDeviceGroup", // Must match existing group
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "IoT" },
    { Key: "Updated", Value: "Yes" } // Adding a new tag
  ],
  adopt: true // Adopt existing resource instead of failing
});
```
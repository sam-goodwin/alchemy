---
title: Managing AWS AppStream StackFleetAssociations with Alchemy
description: Learn how to create, update, and manage AWS AppStream StackFleetAssociations using Alchemy Cloud Control.
---

# StackFleetAssociation

The StackFleetAssociation resource lets you manage the association between an AppStream stack and fleet. This allows you to define which fleet is associated with which stack, enabling users to stream applications from that fleet. For more details, refer to the [AWS AppStream StackFleetAssociations documentation](https://docs.aws.amazon.com/appstream/latest/userguide/).

## Minimal Example

Create a basic StackFleetAssociation linking a stack to a fleet with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicStackFleetAssociation = await AWS.AppStream.StackFleetAssociation("BasicAssociation", {
  FleetName: "MyFleet",
  StackName: "MyStack",
  adopt: true // Allows adoption of existing resource if it exists
});
```

## Advanced Configuration

Configure an association with additional properties such as adopting existing resources.

```ts
const AdvancedStackFleetAssociation = await AWS.AppStream.StackFleetAssociation("AdvancedAssociation", {
  FleetName: "AdvancedFleet",
  StackName: "AdvancedStack",
  adopt: true // Adopt existing resource instead of failing
});
```

## Distinct Use Case: Updating an Association

Update an existing StackFleetAssociation by modifying its properties.

```ts
const UpdatedStackFleetAssociation = await AWS.AppStream.StackFleetAssociation("UpdatedAssociation", {
  FleetName: "UpdatedFleet",
  StackName: "UpdatedStack",
  adopt: true // Ensures the resource is adopted if it exists
});
```

## Monitoring StackFleetAssociation Lifecycle

Monitor the creation time and last update time of the StackFleetAssociation.

```ts
const MonitoredStackFleetAssociation = await AWS.AppStream.StackFleetAssociation("MonitoredAssociation", {
  FleetName: "MonitoringFleet",
  StackName: "MonitoringStack",
  adopt: false // Default setting, will fail if resource exists
});

// Log creation and update times
console.log(`Created at: ${MonitoredStackFleetAssociation.CreationTime}`);
console.log(`Last updated at: ${MonitoredStackFleetAssociation.LastUpdateTime}`);
```
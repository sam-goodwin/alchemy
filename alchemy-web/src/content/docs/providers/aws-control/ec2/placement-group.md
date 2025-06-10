---
title: PlacementGroup
description: Learn how to create, update, and manage AWS EC2 PlacementGroups using Alchemy Cloud Control.
---


The PlacementGroup resource allows you to manage [AWS EC2 PlacementGroups](https://docs.aws.amazon.com/ec2/latest/userguide/) for your instances, enabling you to control how instances are placed in relation to each other to achieve better performance and resource utilization.

## Minimal Example

Create a basic PlacementGroup with the default strategy:

```ts
import AWS from "alchemy/aws/control";

const placementGroup = await AWS.EC2.PlacementGroup("myPlacementGroup", {
  Strategy: "cluster",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a PlacementGroup with specific partition count and spread level for enhanced resource allocation:

```ts
const advancedPlacementGroup = await AWS.EC2.PlacementGroup("advancedPlacementGroup", {
  Strategy: "partition",
  PartitionCount: 3,
  SpreadLevel: "instance",
  Tags: [
    {
      Key: "Project",
      Value: "WebApp"
    }
  ]
});
```

## Creating a Spread Placement Group

This example demonstrates creating a spread PlacementGroup which ensures that instances are placed across distinct hardware:

```ts
const spreadPlacementGroup = await AWS.EC2.PlacementGroup("spreadPlacementGroup", {
  Strategy: "spread",
  Tags: [
    {
      Key: "Application",
      Value: "Microservices"
    }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing PlacementGroup instead of failing if it already exists, you can set the `adopt` property to true:

```ts
const adoptPlacementGroup = await AWS.EC2.PlacementGroup("adoptPlacementGroup", {
  Strategy: "cluster",
  adopt: true,
  Tags: [
    {
      Key: "Status",
      Value: "Adopted"
    }
  ]
});
```

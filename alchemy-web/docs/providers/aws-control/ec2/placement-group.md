---
title: Managing AWS EC2 PlacementGroups with Alchemy
description: Learn how to create, update, and manage AWS EC2 PlacementGroups using Alchemy Cloud Control.
---

# PlacementGroup

The PlacementGroup resource allows you to manage [AWS EC2 Placement Groups](https://docs.aws.amazon.com/ec2/latest/userguide/) for deploying instances in specific configurations to optimize performance and reduce latency.

## Minimal Example

Create a basic Placement Group with a default strategy:

```ts
import AWS from "alchemy/aws/control";

const basicPlacementGroup = await AWS.EC2.PlacementGroup("BasicPlacementGroup", {
  Strategy: "cluster",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a Placement Group with a spread strategy and a specific partition count:

```ts
const advancedPlacementGroup = await AWS.EC2.PlacementGroup("AdvancedPlacementGroup", {
  Strategy: "spread",
  PartitionCount: 4,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Backend" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing Placement Group instead of failing when one already exists, you can do so by setting the adopt property:

```ts
const adoptedPlacementGroup = await AWS.EC2.PlacementGroup("AdoptedPlacementGroup", {
  Strategy: "cluster",
  adopt: true
});
```

## Using Spread Level

You can specify a spread level to control the placement of instances across different hardware:

```ts
const spreadLevelPlacementGroup = await AWS.EC2.PlacementGroup("SpreadLevelPlacementGroup", {
  Strategy: "spread",
  SpreadLevel: "instance",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```
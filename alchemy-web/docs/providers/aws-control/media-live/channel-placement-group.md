---
title: Managing AWS MediaLive ChannelPlacementGroups with Alchemy
description: Learn how to create, update, and manage AWS MediaLive ChannelPlacementGroups using Alchemy Cloud Control.
---

# ChannelPlacementGroup

The ChannelPlacementGroup resource allows you to manage [AWS MediaLive ChannelPlacementGroups](https://docs.aws.amazon.com/medialive/latest/userguide/) for organizing your MediaLive channels into a placement group, optimizing their placement across the resources in your cluster.

## Minimal Example

Create a basic ChannelPlacementGroup with necessary properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const MinimalChannelPlacementGroup = await AWS.MediaLive.ChannelPlacementGroup("MyPlacementGroup", {
  Name: "PrimaryPlacementGroup",
  ClusterId: "arn:aws:medialive:us-east-1:123456789012:cluster:my-cluster",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a ChannelPlacementGroup with additional nodes and multiple tags for better management.

```ts
const AdvancedChannelPlacementGroup = await AWS.MediaLive.ChannelPlacementGroup("AdvancedPlacementGroup", {
  Name: "AdvancedPlacementGroup",
  ClusterId: "arn:aws:medialive:us-east-1:123456789012:cluster:my-cluster",
  Nodes: ["Node1", "Node2"],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Adoption of Existing Resources

If you need to adopt an existing ChannelPlacementGroup instead of failing when it already exists, use the `adopt` property.

```ts
const AdoptExistingPlacementGroup = await AWS.MediaLive.ChannelPlacementGroup("ExistingPlacementGroup", {
  Name: "ExistingPlacementGroup",
  ClusterId: "arn:aws:medialive:us-east-1:123456789012:cluster:my-cluster",
  adopt: true
});
```

## Multi-Node Configuration

Set up a ChannelPlacementGroup with multiple nodes for high availability.

```ts
const MultiNodeChannelPlacementGroup = await AWS.MediaLive.ChannelPlacementGroup("MultiNodePlacementGroup", {
  Name: "MultiNodePlacementGroup",
  ClusterId: "arn:aws:medialive:us-east-1:123456789012:cluster:my-cluster",
  Nodes: ["Node1", "Node2", "Node3"],
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Dev" }
  ]
});
```
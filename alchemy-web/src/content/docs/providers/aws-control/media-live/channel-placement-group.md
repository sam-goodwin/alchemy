---
title: ChannelPlacementGroup
description: Learn how to create, update, and manage AWS MediaLive ChannelPlacementGroups using Alchemy Cloud Control.
---


The ChannelPlacementGroup resource allows you to manage [AWS MediaLive ChannelPlacementGroups](https://docs.aws.amazon.com/medialive/latest/userguide/) to optimize the placement of your media live channels.

## Minimal Example

Create a basic ChannelPlacementGroup with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const channelPlacementGroup = await AWS.MediaLive.ChannelPlacementGroup("basicPlacementGroup", {
  clusterId: "myClusterId",
  tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Configure a ChannelPlacementGroup with multiple nodes and a specific name.

```ts
const advancedChannelPlacementGroup = await AWS.MediaLive.ChannelPlacementGroup("advancedPlacementGroup", {
  clusterId: "myClusterId",
  nodes: ["node1", "node2", "node3"],
  name: "AdvancedGroup"
});
```

## Adoption of Existing Resources

Create a ChannelPlacementGroup that adopts an existing resource instead of failing if it already exists.

```ts
const adoptedChannelPlacementGroup = await AWS.MediaLive.ChannelPlacementGroup("adoptedPlacementGroup", {
  clusterId: "existingClusterId",
  adopt: true
});
```

## Tagging for Resource Management

Create a ChannelPlacementGroup with multiple tags for better resource management.

```ts
const taggedChannelPlacementGroup = await AWS.MediaLive.ChannelPlacementGroup("taggedPlacementGroup", {
  clusterId: "myClusterId",
  tags: [
    { Key: "Project", Value: "MediaProject" },
    { Key: "Owner", Value: "TeamA" }
  ]
});
```

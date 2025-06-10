---
title: ChannelGroup
description: Learn how to create, update, and manage AWS MediaPackageV2 ChannelGroups using Alchemy Cloud Control.
---


The ChannelGroup resource lets you manage [AWS MediaPackageV2 ChannelGroups](https://docs.aws.amazon.com/mediapackagev2/latest/userguide/) for organizing multiple channels under a single group.

## Minimal Example

Create a basic ChannelGroup with a name and description:

```ts
import AWS from "alchemy/aws/control";

const basicChannelGroup = await AWS.MediaPackageV2.ChannelGroup("basicChannelGroup", {
  ChannelGroupName: "MyChannelGroup",
  Description: "This is a basic channel group for content delivery.",
});
```

## Advanced Configuration

Create a ChannelGroup with tags for better organization and management:

```ts
const taggedChannelGroup = await AWS.MediaPackageV2.ChannelGroup("taggedChannelGroup", {
  ChannelGroupName: "MyTaggedChannelGroup",
  Description: "This channel group includes tags for categorization.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Media" }
  ],
});
```

## Adoption of Existing Resources

Create a ChannelGroup while adopting an existing resource if it already exists:

```ts
const adoptedChannelGroup = await AWS.MediaPackageV2.ChannelGroup("adoptedChannelGroup", {
  ChannelGroupName: "ExistingChannelGroup",
  Description: "Adopting an existing channel group without failure.",
  adopt: true,
});
```

## Use Case: Multi-Channel Organization

Create a ChannelGroup for organizing multiple channels for a streaming service:

```ts
const streamingChannelGroup = await AWS.MediaPackageV2.ChannelGroup("streamingChannelGroup", {
  ChannelGroupName: "StreamingServiceChannels",
  Description: "A channel group for organizing all streaming service channels.",
  Tags: [
    { Key: "Service", Value: "Streaming" },
    { Key: "Type", Value: "Live" }
  ],
});
``` 

These examples demonstrate how to create and configure AWS MediaPackageV2 ChannelGroups using Alchemy, from basic setups to more advanced configurations including resource adoption and tagging.

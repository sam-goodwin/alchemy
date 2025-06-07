---
title: Managing AWS MediaPackageV2 ChannelGroups with Alchemy
description: Learn how to create, update, and manage AWS MediaPackageV2 ChannelGroups using Alchemy Cloud Control.
---

# ChannelGroup

The ChannelGroup resource allows you to manage [AWS MediaPackageV2 ChannelGroups](https://docs.aws.amazon.com/mediapackagev2/latest/userguide/) for organizing channels, enabling seamless content delivery, and managing streaming configurations.

## Minimal Example

Create a basic ChannelGroup with a description and tags.

```ts
import AWS from "alchemy/aws/control";

const BasicChannelGroup = await AWS.MediaPackageV2.ChannelGroup("BasicChannelGroup", {
  ChannelGroupName: "MyChannelGroup",
  Description: "This is a basic channel group for streaming content.",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Advanced Configuration

Create a ChannelGroup with additional properties for enhanced management.

```ts
const AdvancedChannelGroup = await AWS.MediaPackageV2.ChannelGroup("AdvancedChannelGroup", {
  ChannelGroupName: "AdvancedChannelGroup",
  Description: "This group includes advanced settings for high availability.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Media" }
  ],
  adopt: true // Adopt existing resource instead of failing
});
```

## Channel Group with Multiple Tags

Create a ChannelGroup with multiple tags to facilitate better resource management.

```ts
const MultiTagChannelGroup = await AWS.MediaPackageV2.ChannelGroup("MultiTagChannelGroup", {
  ChannelGroupName: "MultiTagChannelGroup",
  Description: "Channel group with multiple tags for better tracking.",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "Alice" },
    { Key: "Project", Value: "LiveStreaming" }
  ]
});
```

## Channel Group Adoption Example

Demonstrate how to adopt an existing ChannelGroup if it already exists.

```ts
const AdoptedChannelGroup = await AWS.MediaPackageV2.ChannelGroup("AdoptedChannelGroup", {
  ChannelGroupName: "ExistingGroupName",
  Description: "Adopting an existing channel group.",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ],
  adopt: true // This flag enables the adoption of an existing resource
});
```
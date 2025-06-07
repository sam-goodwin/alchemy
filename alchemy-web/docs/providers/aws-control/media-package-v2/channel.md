---
title: Managing AWS MediaPackageV2 Channels with Alchemy
description: Learn how to create, update, and manage AWS MediaPackageV2 Channels using Alchemy Cloud Control.
---

# Channel

The Channel resource lets you create and manage [AWS MediaPackageV2 Channels](https://docs.aws.amazon.com/mediapackagev2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackagev2-channel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const channel = await AWS.MediaPackageV2.Channel("channel-example", {
  ChannelName: "channel-channel",
  ChannelGroupName: "channel-channelgroup",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A channel resource managed by Alchemy",
});
```

## Advanced Configuration

Create a channel with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedChannel = await AWS.MediaPackageV2.Channel("advanced-channel", {
  ChannelName: "channel-channel",
  ChannelGroupName: "channel-channelgroup",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A channel resource managed by Alchemy",
});
```


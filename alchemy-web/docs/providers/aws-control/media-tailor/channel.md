---
title: Managing AWS MediaTailor Channels with Alchemy
description: Learn how to create, update, and manage AWS MediaTailor Channels using Alchemy Cloud Control.
---

# Channel

The Channel resource lets you create and manage [AWS MediaTailor Channels](https://docs.aws.amazon.com/mediatailor/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-channel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const channel = await AWS.MediaTailor.Channel("channel-example", {
  ChannelName: "channel-channel",
  Outputs: [],
  PlaybackMode: "example-playbackmode",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a channel with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedChannel = await AWS.MediaTailor.Channel("advanced-channel", {
  ChannelName: "channel-channel",
  Outputs: [],
  PlaybackMode: "example-playbackmode",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


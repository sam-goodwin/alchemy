---
title: Managing AWS MediaPackage Channels with Alchemy
description: Learn how to create, update, and manage AWS MediaPackage Channels using Alchemy Cloud Control.
---

# Channel

The Channel resource lets you create and manage [AWS MediaPackage Channels](https://docs.aws.amazon.com/mediapackage/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackage-channel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const channel = await AWS.MediaPackage.Channel("channel-example", {
  Id: "example-id",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A channel resource managed by Alchemy",
});
```

## Advanced Configuration

Create a channel with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedChannel = await AWS.MediaPackage.Channel("advanced-channel", {
  Id: "example-id",
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


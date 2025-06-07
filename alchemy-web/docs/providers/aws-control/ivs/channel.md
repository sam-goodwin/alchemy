---
title: Managing AWS IVS Channels with Alchemy
description: Learn how to create, update, and manage AWS IVS Channels using Alchemy Cloud Control.
---

# Channel

The Channel resource lets you create and manage [AWS IVS Channels](https://docs.aws.amazon.com/ivs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const channel = await AWS.IVS.Channel("channel-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a channel with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedChannel = await AWS.IVS.Channel("advanced-channel", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


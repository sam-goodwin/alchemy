---
title: Managing AWS IVS StreamKeys with Alchemy
description: Learn how to create, update, and manage AWS IVS StreamKeys using Alchemy Cloud Control.
---

# StreamKey

The StreamKey resource allows you to manage [AWS IVS StreamKeys](https://docs.aws.amazon.com/ivs/latest/userguide/) for live streaming on the Amazon Interactive Video Service (IVS). StreamKeys are necessary for initiating a stream on an IVS channel.

## Minimal Example

This example demonstrates how to create a basic StreamKey associated with a specific IVS channel.

```ts
import AWS from "alchemy/aws/control";

const BasicStreamKey = await AWS.IVS.StreamKey("BasicStreamKey", {
  ChannelArn: "arn:aws:ivs:us-west-2:123456789012:channel/abcdefg1234",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "LiveStreaming" }
  ]
});
```

## Advanced Configuration

In this example, we create an advanced StreamKey with additional tags for better resource management.

```ts
const AdvancedStreamKey = await AWS.IVS.StreamKey("AdvancedStreamKey", {
  ChannelArn: "arn:aws:ivs:us-west-2:123456789012:channel/hijklmnop5678",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "LiveStreaming" },
    { Key: "Owner", Value: "TeamA" }
  ],
  adopt: true // Allows adopting an existing StreamKey if it already exists.
});
```

## Creating Multiple StreamKeys

This example shows how to create multiple StreamKeys for different channels, which can be useful for managing multiple live streams simultaneously.

```ts
const ChannelArn1 = "arn:aws:ivs:us-west-2:123456789012:channel/abcdefg1234";
const ChannelArn2 = "arn:aws:ivs:us-west-2:123456789012:channel/hijklmnop5678";

const StreamKey1 = await AWS.IVS.StreamKey("StreamKeyForChannel1", {
  ChannelArn: ChannelArn1,
  Tags: [{ Key: "Environment", Value: "development" }]
});

const StreamKey2 = await AWS.IVS.StreamKey("StreamKeyForChannel2", {
  ChannelArn: ChannelArn2,
  Tags: [{ Key: "Environment", Value: "production" }]
});
```
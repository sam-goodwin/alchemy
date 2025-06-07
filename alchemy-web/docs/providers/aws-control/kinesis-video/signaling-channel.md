---
title: Managing AWS KinesisVideo SignalingChannels with Alchemy
description: Learn how to create, update, and manage AWS KinesisVideo SignalingChannels using Alchemy Cloud Control.
---

# SignalingChannel

The SignalingChannel resource allows you to create and manage signaling channels in AWS Kinesis Video Streams, enabling real-time communication between clients. For more information, refer to the [AWS KinesisVideo SignalingChannels](https://docs.aws.amazon.com/kinesisvideo/latest/userguide/).

## Minimal Example

Create a basic signaling channel with a specified name and type.

```ts
import AWS from "alchemy/aws/control";

const BasicSignalingChannel = await AWS.KinesisVideo.SignalingChannel("BasicSignalingChannel", {
  Name: "MySignalingChannel",
  Type: "SINGLE_MASTER",
  MessageTtlSeconds: 300,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "VideoStream" }
  ]
});
```

## Advanced Configuration

Configure a signaling channel with custom message TTL and additional tags for better resource management.

```ts
const AdvancedSignalingChannel = await AWS.KinesisVideo.SignalingChannel("AdvancedSignalingChannel", {
  Name: "AdvancedSignalingChannel",
  Type: "SINGLE_MASTER",
  MessageTtlSeconds: 600,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "VideoStream" },
    { Key: "Project", Value: "RealTimeChat" }
  ]
});
```

## Utilizing Existing Resources

If you want to adopt an existing signaling channel instead of creating a new one, you can set the `adopt` property to true.

```ts
const AdoptExistingSignalingChannel = await AWS.KinesisVideo.SignalingChannel("AdoptExistingSignalingChannel", {
  Name: "ExistingChannel",
  adopt: true
});
```

## Custom Message TTL Configuration

Create a signaling channel with a custom message TTL of 120 seconds, suitable for short-lived signaling messages.

```ts
const ShortLivedSignalingChannel = await AWS.KinesisVideo.SignalingChannel("ShortLivedSignalingChannel", {
  Name: "ShortLivedChannel",
  Type: "SINGLE_MASTER",
  MessageTtlSeconds: 120
});
```
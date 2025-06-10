---
title: SignalingChannel
description: Learn how to create, update, and manage AWS KinesisVideo SignalingChannels using Alchemy Cloud Control.
---


The SignalingChannel resource allows you to manage [AWS KinesisVideo SignalingChannels](https://docs.aws.amazon.com/kinesisvideo/latest/userguide/) for real-time communication between devices and applications.

## Minimal Example

Create a basic signaling channel with a specified name and message TTL.

```ts
import AWS from "alchemy/aws/control";

const signalingChannel = await AWS.KinesisVideo.SignalingChannel("mySignalingChannel", {
  name: "MySignalingChannel",
  messageTtlSeconds: 300, // TTL of 5 minutes
});
```

## Advanced Configuration

Configure a signaling channel with additional options like the type and tags.

```ts
const advancedSignalingChannel = await AWS.KinesisVideo.SignalingChannel("advancedChannel", {
  name: "AdvancedSignalingChannel",
  type: "SINGLE_MASTER", // Specify the type of signaling channel
  messageTtlSeconds: 600, // TTL of 10 minutes
  tags: [
    { key: "Environment", value: "Production" },
    { key: "App", value: "VideoStreaming" }
  ],
});
```

## Adoption of Existing Resource

If you want to adopt an existing signaling channel instead of failing when the resource already exists, you can set the adopt property.

```ts
const adoptExistingChannel = await AWS.KinesisVideo.SignalingChannel("existingChannel", {
  name: "ExistingSignalingChannel",
  adopt: true // Adopts existing resource if it already exists
});
```

## Create with Custom Tags

Create a signaling channel while applying custom tags for better organization and management.

```ts
const taggedSignalingChannel = await AWS.KinesisVideo.SignalingChannel("taggedChannel", {
  name: "TaggedSignalingChannel",
  tags: [
    { key: "Project", value: "KinesisVideoDemo" },
    { key: "Owner", value: "DevTeam" }
  ],
});
```

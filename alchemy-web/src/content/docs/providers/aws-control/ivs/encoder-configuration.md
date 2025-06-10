---
title: EncoderConfiguration
description: Learn how to create, update, and manage AWS IVS EncoderConfigurations using Alchemy Cloud Control.
---


The EncoderConfiguration resource lets you manage [AWS IVS EncoderConfigurations](https://docs.aws.amazon.com/ivs/latest/userguide/) for configuring video encoding settings in your live streaming applications.

## Minimal Example

Create a basic encoder configuration with default video settings.

```ts
import AWS from "alchemy/aws/control";

const basicEncoderConfig = await AWS.IVS.EncoderConfiguration("basic-encoder-config", {
  name: "BasicEncoder",
  Video: {
    Codec: "H264",
    Resolution: "HD",
    Bitrate: 3000,
    Framerate: 30,
    KeyframeInterval: 2
  },
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Define an encoder configuration with advanced video settings for high-quality streaming.

```ts
const advancedEncoderConfig = await AWS.IVS.EncoderConfiguration("advanced-encoder-config", {
  name: "AdvancedEncoder",
  Video: {
    Codec: "H264",
    Resolution: "4K",
    Bitrate: 8000,
    Framerate: 60,
    KeyframeInterval: 2,
    AspectRatio: "16:9"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "LiveStreaming" }
  ]
});
```

## Custom Name and Tags

Create an encoder configuration with a custom name and multiple tags for better organization.

```ts
const customNameEncoderConfig = await AWS.IVS.EncoderConfiguration("custom-name-encoder-config", {
  name: "CustomEncoderConfiguration",
  Video: {
    Codec: "H264",
    Resolution: "Full HD",
    Bitrate: 4500,
    Framerate: 30,
    KeyframeInterval: 2
  },
  Tags: [
    { Key: "Owner", Value: "TeamA" },
    { Key: "UseCase", Value: "Gaming" }
  ]
});
```

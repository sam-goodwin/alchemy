---
title: Channel
description: Learn how to create, update, and manage AWS MediaTailor Channels using Alchemy Cloud Control.
---


The Channel resource lets you manage [AWS MediaTailor Channels](https://docs.aws.amazon.com/mediatailor/latest/userguide/) for delivering video on-demand and live streaming services.

## Minimal Example

Create a basic MediaTailor Channel with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const mediaTailorChannel = await AWS.MediaTailor.Channel("myMediaTailorChannel", {
  ChannelName: "MyChannel",
  PlaybackMode: "LIVE",
  Outputs: [
    {
      Url: "https://example.com/live",
      Name: "Output1"
    }
  ],
  FillerSlate: {
    Source: "https://example.com/slate.mp4"
  }
});
```

## Advanced Configuration

Configure a MediaTailor Channel with detailed audience targeting and logging configurations.

```ts
const advancedMediaTailorChannel = await AWS.MediaTailor.Channel("advancedMediaTailorChannel", {
  ChannelName: "AdvancedChannel",
  PlaybackMode: "LINEAR",
  Outputs: [
    {
      Url: "https://example.com/linear",
      Name: "OutputLinear1"
    }
  ],
  Audiences: ["US", "CA"],
  LogConfiguration: {
    LogLevel: "DEBUG",
    LogDestination: "s3://my-log-bucket/logs/"
  },
  TimeShiftConfiguration: {
    TimeShiftBuffer: 60, // Time in minutes
    TimeShiftOutput: {
      Url: "https://example.com/timeshift",
      Name: "TimeShiftOutput1"
    }
  }
});
```

## Using Tags for Organization

Create a MediaTailor Channel with tags for better organization and resource management.

```ts
const taggedMediaTailorChannel = await AWS.MediaTailor.Channel("taggedMediaTailorChannel", {
  ChannelName: "TaggedChannel",
  PlaybackMode: "VOD",
  Outputs: [
    {
      Url: "https://example.com/vod",
      Name: "OutputVOD1"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "VideoStreaming"
    }
  ]
});
```

## Adopting Existing Resources

Adopt an existing MediaTailor Channel by setting the adopt flag to true.

```ts
const existingMediaTailorChannel = await AWS.MediaTailor.Channel("existingMediaTailorChannel", {
  ChannelName: "ExistingChannel",
  PlaybackMode: "LIVE",
  Outputs: [
    {
      Url: "https://example.com/existing",
      Name: "ExistingOutput1"
    }
  ],
  adopt: true // Adopt existing resource instead of failing
});
```

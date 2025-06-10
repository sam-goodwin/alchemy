---
title: Input
description: Learn how to create, update, and manage AWS MediaLive Inputs using Alchemy Cloud Control.
---


The Input resource allows you to manage [AWS MediaLive Inputs](https://docs.aws.amazon.com/medialive/latest/userguide/) for ingesting media content for live streaming.

## Minimal Example

Create a basic MediaLive Input with required properties and one optional property for SRT settings:

```ts
import AWS from "alchemy/aws/control";

const mediaLiveInput = await AWS.MediaLive.Input("myMediaLiveInput", {
  Name: "MyLiveInput",
  Type: "RTMP_PUSH",
  SrtSettings: {
    SrtMode: "CALLME",
    StreamId: "my-srt-stream"
  }
});
```

## Advanced Configuration

Configure a MediaLive Input with multiple sources and VPC settings for enhanced network security:

```ts
const advancedMediaLiveInput = await AWS.MediaLive.Input("advancedMediaLiveInput", {
  Name: "AdvancedLiveInput",
  Type: "RTP",
  Sources: [{
    Url: "rtp://192.168.1.100:5000",
    SourceFailoverConfig: {
      FailoverMode: "MERGE",
      PrimarySource: "PrimarySource1",
      SecondarySource: "SecondarySource1"
    }
  }],
  Vpc: {
    SecurityGroupIds: ["sg-12345678"],
    SubnetIds: ["subnet-12345678"]
  }
});
```

## Multiple Destinations Example

Create a MediaLive Input that specifies multiple destinations for live streaming:

```ts
const multiDestinationInput = await AWS.MediaLive.Input("multiDestinationInput", {
  Name: "MultiDestinationInput",
  Type: "RTMP_PUSH",
  Destinations: [
    {
      Url: "rtmp://destination1.example.com/live",
      StreamName: "stream1"
    },
    {
      Url: "rtmp://destination2.example.com/live",
      StreamName: "stream2"
    }
  ]
});
```

## SRT Settings Example

Configure a MediaLive Input with specific SRT settings for secure transport:

```ts
const srtConfiguredInput = await AWS.MediaLive.Input("srtConfiguredInput", {
  Name: "SRTConfiguredInput",
  Type: "SRT",
  SrtSettings: {
    SrtMode: "LISTENER",
    StreamId: "my-srt-secure-stream",
    SourceIp: "0.0.0.0",
    DestinationIp: "192.168.1.200",
    Port: 9000
  }
});
```

---
title: Channel
description: Learn how to create, update, and manage AWS IVS Channels using Alchemy Cloud Control.
---


The Channel resource lets you manage [AWS IVS Channels](https://docs.aws.amazon.com/ivs/latest/userguide/) for live streaming. This resource provides a way to configure channels for video ingestion and streaming.

## Minimal Example

Create a basic IVS channel with default settings, specifying only the required properties:

```ts
import AWS from "alchemy/aws/control";

const basicChannel = await AWS.IVS.Channel("basicChannel", {
  Type: "BASIC",
  Name: "MyFirstChannel",
  RecordingConfigurationArn: "arn:aws:ivs:us-west-2:123456789012:recording-configuration/recording-config-id"
});
```

## Advanced Configuration

Configure a channel with advanced options such as multi-track input configuration and latency mode:

```ts
import AWS from "alchemy/aws/control";

const advancedChannel = await AWS.IVS.Channel("advancedChannel", {
  Type: "BASIC",
  Name: "MyAdvancedChannel",
  RecordingConfigurationArn: "arn:aws:ivs:us-west-2:123456789012:recording-configuration/recording-config-id",
  Authorized: true,
  LatencyMode: "LOW",
  MultitrackInputConfiguration: {
    AudioTracks: [
      { 
        LanguageCode: "en", 
        TrackName: "English" 
      },
      { 
        LanguageCode: "es", 
        TrackName: "Spanish" 
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Application", Value: "LiveStreamingApp" }
  ]
});
```

## Insecure Ingest Configuration

Set up a channel that allows insecure ingest, which can be useful for development purposes:

```ts
import AWS from "alchemy/aws/control";

const insecureIngestChannel = await AWS.IVS.Channel("insecureIngestChannel", {
  Type: "BASIC",
  Name: "InsecureChannel",
  InsecureIngest: true,
  RecordingConfigurationArn: "arn:aws:ivs:us-west-2:123456789012:recording-configuration/recording-config-id"
});
```

## Custom Preset and Container Format

Create a channel with a specific preset and container format suited for your streaming needs:

```ts
import AWS from "alchemy/aws/control";

const customFormatChannel = await AWS.IVS.Channel("customFormatChannel", {
  Type: "BASIC",
  Name: "CustomFormatChannel",
  Preset: "HLS",
  ContainerFormat: "MPEG-TS",
  RecordingConfigurationArn: "arn:aws:ivs:us-west-2:123456789012:recording-configuration/recording-config-id"
});
```

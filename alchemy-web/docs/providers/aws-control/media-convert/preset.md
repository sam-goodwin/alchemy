---
title: Managing AWS MediaConvert Presets with Alchemy
description: Learn how to create, update, and manage AWS MediaConvert Presets using Alchemy Cloud Control.
---

# Preset

The Preset resource allows you to manage [AWS MediaConvert Presets](https://docs.aws.amazon.com/mediaconvert/latest/userguide/) used for video transcoding. Presets define the settings for encoding tasks, making it easier to ensure consistent output across multiple media files.

## Minimal Example

Create a basic MediaConvert Preset with essential settings and a category.

```ts
import AWS from "alchemy/aws/control";

const BasicPreset = await AWS.MediaConvert.Preset("basic-preset", {
  Name: "BasicPreset",
  Category: "System-Avc_16x9_1080p_30fps_16x9",
  SettingsJson: JSON.stringify({
    Version: "1.0",
    Preset: {
      Video: {
        Codec: "H264",
        Width: 1920,
        Height: 1080,
        Bitrate: 5000000,
        FrameRate: 30
      },
      Audio: {
        Codec: "AAC",
        SampleRate: 48000,
        Bitrate: 192000,
        Channels: 2
      }
    }
  }),
  Tags: [{ Key: "Environment", Value: "production" }, { Key: "Project", Value: "VideoProcessing" }]
});
```

## Advanced Configuration

Configure a MediaConvert Preset with advanced video settings for better quality and performance.

```ts
const AdvancedPreset = await AWS.MediaConvert.Preset("advanced-preset", {
  Name: "AdvancedPreset",
  Description: "An advanced preset for high-quality video output",
  Category: "Custom",
  SettingsJson: JSON.stringify({
    Version: "1.0",
    Preset: {
      Video: {
        Codec: "H264",
        Width: 1920,
        Height: 1080,
        Bitrate: 8000000,
        FrameRate: 60,
        GopSize: 60,
        GopSizeUnits: "FRAMES"
      },
      Audio: {
        Codec: "AAC",
        SampleRate: 48000,
        Bitrate: 256000,
        Channels: 2
      }
    }
  }),
  Tags: [{ Key: "Environment", Value: "staging" }, { Key: "Team", Value: "Media" }]
});
```

## Custom Preset for Live Streaming

Define a MediaConvert Preset tailored for live streaming workflows.

```ts
const LiveStreamingPreset = await AWS.MediaConvert.Preset("live-streaming-preset", {
  Name: "LiveStreamingPreset",
  Description: "Preset optimized for live streaming applications",
  Category: "Live",
  SettingsJson: JSON.stringify({
    Version: "1.0",
    Preset: {
      Video: {
        Codec: "H264",
        Width: 1280,
        Height: 720,
        Bitrate: 3000000,
        FrameRate: 30,
        GopSize: 60,
        GopSizeUnits: "FRAMES"
      },
      Audio: {
        Codec: "AAC",
        SampleRate: 48000,
        Bitrate: 128000,
        Channels: 2
      }
    }
  }),
  Tags: [{ Key: "Environment", Value: "production" }, { Key: "Type", Value: "Streaming" }]
});
```
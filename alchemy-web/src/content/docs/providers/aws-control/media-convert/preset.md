---
title: Preset
description: Learn how to create, update, and manage AWS MediaConvert Presets using Alchemy Cloud Control.
---


The Preset resource lets you manage [AWS MediaConvert Presets](https://docs.aws.amazon.com/mediaconvert/latest/userguide/) for configuring media transcoding settings.

## Minimal Example

Create a basic MediaConvert Preset with required settings and a custom name.

```ts
import AWS from "alchemy/aws/control";

const basicPreset = await AWS.MediaConvert.Preset("basicPreset", {
  Name: "BasicPreset",
  SettingsJson: {
    Version: "1.0",
    Preset: {
      Container: "mp4",
      Audio: {
        Codec: "aac",
        Bitrate: 128000,
        Channels: 2
      },
      Video: {
        Codec: "h264",
        Bitrate: 5000000,
        Width: 1920,
        Height: 1080,
        Framerate: 30
      }
    }
  },
  Description: "A basic preset for high quality MP4 output."
});
```

## Advanced Configuration

Configure a MediaConvert Preset with additional options for enhanced settings.

```ts
const advancedPreset = await AWS.MediaConvert.Preset("advancedPreset", {
  Name: "AdvancedPreset",
  SettingsJson: {
    Version: "1.0",
    Preset: {
      Container: "mp4",
      Audio: {
        Codec: "aac",
        Bitrate: 192000,
        Channels: 2,
        SampleRate: 48000
      },
      Video: {
        Codec: "h265",
        Bitrate: 8000000,
        Width: 1920,
        Height: 1080,
        Framerate: 60,
        GopSize: 2
      }
    }
  },
  Category: "Custom Presets",
  Tags: {
    Environment: "Production",
    Team: "MediaTeam"
  },
  Description: "An advanced preset for high quality streaming."
});
```

## Custom Category and Tags

Create a preset with a specific category and tags for better resource management.

```ts
const categorizedPreset = await AWS.MediaConvert.Preset("categorizedPreset", {
  Name: "CategorizedPreset",
  SettingsJson: {
    Version: "1.0",
    Preset: {
      Container: "mkv",
      Audio: {
        Codec: "mp3",
        Bitrate: 160000,
        Channels: 2
      },
      Video: {
        Codec: "vp9",
        Bitrate: 6000000,
        Width: 1280,
        Height: 720,
        Framerate: 30
      }
    }
  },
  Category: "Video Processing",
  Tags: {
    Project: "VideoEditing",
    Owner: "JohnDoe"
  },
  Description: "A categorized preset for video editing projects."
});
```

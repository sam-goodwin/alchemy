---
title: PlaybackConfiguration
description: Learn how to create, update, and manage AWS MediaTailor PlaybackConfigurations using Alchemy Cloud Control.
---


The PlaybackConfiguration resource lets you manage [AWS MediaTailor PlaybackConfigurations](https://docs.aws.amazon.com/mediatailor/latest/userguide/) for streaming video content. This resource allows you to configure settings related to content playback, ad decision servers, and more.

## Minimal Example

Create a basic PlaybackConfiguration with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const playbackConfig = await AWS.MediaTailor.PlaybackConfiguration("basicPlaybackConfig", {
  VideoContentSourceUrl: "https://myvideosource.com/content",
  Name: "MyPlaybackConfig",
  AdDecisionServerUrl: "https://adserver.com/ads",
  HlsConfiguration: {
    // Example HLS configuration
    PlaylistType: "EVENT",
    ContinuousPlaybackMode: "ON"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "VideoStreaming" }
  ]
});
```

## Advanced Configuration

Configure a PlaybackConfiguration with more advanced settings, including DASH and CDN configurations.

```ts
const advancedPlaybackConfig = await AWS.MediaTailor.PlaybackConfiguration("advancedPlaybackConfig", {
  VideoContentSourceUrl: "https://myvideosource.com/content",
  Name: "AdvancedPlaybackConfig",
  AdDecisionServerUrl: "https://adserver.com/ads",
  DashConfiguration: {
    // Example DASH configuration
    ManifestEndpointPrefix: "https://mydashsource.com/manifest",
    MinBufferTime: "PT10S"
  },
  CdnConfiguration: {
    // Example CDN configuration
    AdSegmentUrlPrefix: "https://cdn.example.com/adsegment",
    ContentSegmentUrlPrefix: "https://cdn.example.com/content"
  },
  ConfigurationAliases: {
    alias1: "value1",
    alias2: "value2"
  }
});
```

## Live Pre-Roll Configuration

Demonstrate how to create a PlaybackConfiguration that includes live pre-roll settings.

```ts
const livePreRollConfig = await AWS.MediaTailor.PlaybackConfiguration("livePreRollConfig", {
  VideoContentSourceUrl: "https://myvideosource.com/livecontent",
  Name: "LivePreRollPlaybackConfig",
  AdDecisionServerUrl: "https://adserver.com/ads",
  LivePreRollConfiguration: {
    // Example live pre-roll configuration
    AdTagUri: "https://adserver.com/live/preroll",
    Duration: 30
  },
  SlateAdUrl: "https://myvideosource.com/slatead"
});
```

## Custom Manifest Processing Rules

Configure a PlaybackConfiguration with custom manifest processing rules to modify how the manifest is generated.

```ts
const manifestProcessingConfig = await AWS.MediaTailor.PlaybackConfiguration("manifestProcessingConfig", {
  VideoContentSourceUrl: "https://myvideosource.com/content",
  Name: "ManifestProcessingConfig",
  AdDecisionServerUrl: "https://adserver.com/ads",
  ManifestProcessingRules: {
    // Example manifest processing rules
    AdInsertion: {
      AdBehavior: "INSERT"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "VideoStreaming" }
  ]
});
``` 

This documentation provides a comprehensive overview of how to create and manage PlaybackConfigurations in AWS MediaTailor using the Alchemy framework, allowing for optimal customization and control over your streaming media experiences.

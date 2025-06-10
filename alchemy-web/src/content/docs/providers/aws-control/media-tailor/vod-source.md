---
title: VodSource
description: Learn how to create, update, and manage AWS MediaTailor VodSources using Alchemy Cloud Control.
---


The VodSource resource lets you manage [AWS MediaTailor VodSources](https://docs.aws.amazon.com/mediatailor/latest/userguide/) for delivering video on demand content. This resource allows you to define a source for your video content that MediaTailor can use to serve video streams.

## Minimal Example

Create a basic VodSource with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const vodSource = await AWS.MediaTailor.VodSource("myVodSource", {
  VodSourceName: "MyVodSource",
  SourceLocationName: "MySourceLocation",
  HttpPackageConfigurations: [
    {
      BaseUrl: "https://myvideo.com/content/",
      PackageType: "HLS",
      ManifestName: "playlist.m3u8"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a VodSource with multiple HTTP package configurations for different formats.

```ts
const advancedVodSource = await AWS.MediaTailor.VodSource("advancedVodSource", {
  VodSourceName: "AdvancedVodSource",
  SourceLocationName: "AdvancedSourceLocation",
  HttpPackageConfigurations: [
    {
      BaseUrl: "https://myvideo.com/content/hls/",
      PackageType: "HLS",
      ManifestName: "playlist.m3u8"
    },
    {
      BaseUrl: "https://myvideo.com/content/dash/",
      PackageType: "DASH",
      ManifestName: "manifest.mpd"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    }
  ]
});
```

## Adding a VodSource with Existing Resources

This example demonstrates how to adopt an existing VodSource instead of creating a new one.

```ts
const existingVodSource = await AWS.MediaTailor.VodSource("existingVodSource", {
  VodSourceName: "ExistingVodSource",
  SourceLocationName: "ExistingSourceLocation",
  HttpPackageConfigurations: [
    {
      BaseUrl: "https://myvideo.com/existing/content/",
      PackageType: "HLS",
      ManifestName: "existing_playlist.m3u8"
    }
  ],
  adopt: true // Adopt existing resource
});
``` 

By following the examples provided, you can effectively create and manage VodSources in AWS MediaTailor using Alchemy, allowing you to efficiently deliver video content to your users.

---
title: LiveSource
description: Learn how to create, update, and manage AWS MediaTailor LiveSources using Alchemy Cloud Control.
---


The LiveSource resource lets you manage [AWS MediaTailor LiveSources](https://docs.aws.amazon.com/mediatailor/latest/userguide/) for live video streaming. This resource allows you to define a source of live content for your MediaTailor configurations.

## Minimal Example

Create a basic LiveSource with required properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const liveSource = await AWS.MediaTailor.LiveSource("myLiveSource", {
  LiveSourceName: "MyLiveSource",
  SourceLocationName: "MySourceLocation",
  HttpPackageConfigurations: [
    {
      Name: "MyHttpPackageConfig",
      SourceGroup: "MySourceGroup",
      PackageType: "HLS",
      Url: "https://my-live-source-url.com/playlist.m3u8"
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

Configure a LiveSource with multiple HTTP package configurations and additional tags.

```ts
const advancedLiveSource = await AWS.MediaTailor.LiveSource("advancedLiveSource", {
  LiveSourceName: "AdvancedLiveSource",
  SourceLocationName: "AdvancedSourceLocation",
  HttpPackageConfigurations: [
    {
      Name: "MainHttpPackageConfig",
      SourceGroup: "MainSourceGroup",
      PackageType: "HLS",
      Url: "https://advanced-live-source-url.com/playlist.m3u8"
    },
    {
      Name: "BackupHttpPackageConfig",
      SourceGroup: "BackupSourceGroup",
      PackageType: "HLS",
      Url: "https://backup-live-source-url.com/playlist.m3u8"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    },
    {
      Key: "Owner",
      Value: "TeamA"
    }
  ]
});
```

## Adoption of Existing Resource

Create a LiveSource while adopting an existing resource if it already exists.

```ts
const adoptLiveSource = await AWS.MediaTailor.LiveSource("adoptLiveSource", {
  LiveSourceName: "ExistingLiveSource",
  SourceLocationName: "ExistingSourceLocation",
  HttpPackageConfigurations: [
    {
      Name: "AdoptedHttpPackageConfig",
      SourceGroup: "AdoptedSourceGroup",
      PackageType: "HLS",
      Url: "https://existing-live-source-url.com/playlist.m3u8"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

---
title: Managing AWS MediaTailor LiveSources with Alchemy
description: Learn how to create, update, and manage AWS MediaTailor LiveSources using Alchemy Cloud Control.
---

# LiveSource

The LiveSource resource lets you manage [AWS MediaTailor LiveSources](https://docs.aws.amazon.com/mediatailor/latest/userguide/) and their configurations for delivering live video streams.

## Minimal Example

Create a basic LiveSource with required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicLiveSource = await AWS.MediaTailor.LiveSource("BasicLiveSource", {
  LiveSourceName: "MyFirstLiveSource",
  SourceLocationName: "MySourceLocation",
  HttpPackageConfigurations: [{
    SourceGroup: "MySourceGroup",
    Path: "http://example.com/stream",
    Type: "HLS"
  }],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Advanced Configuration

Configure a LiveSource with multiple HTTP package configurations and tags.

```ts
const advancedLiveSource = await AWS.MediaTailor.LiveSource("AdvancedLiveSource", {
  LiveSourceName: "MyAdvancedLiveSource",
  SourceLocationName: "MySourceLocation",
  HttpPackageConfigurations: [
    {
      SourceGroup: "MainStream",
      Path: "http://example.com/main-stream",
      Type: "HLS"
    },
    {
      SourceGroup: "BackupStream",
      Path: "http://example.com/backup-stream",
      Type: "HLS"
    }
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Example with Resource Adoption

Create a LiveSource while adopting an existing resource if it already exists.

```ts
const adoptLiveSource = await AWS.MediaTailor.LiveSource("AdoptLiveSource", {
  LiveSourceName: "ExistingLiveSource",
  SourceLocationName: "MySourceLocation",
  HttpPackageConfigurations: [{
    SourceGroup: "AdoptedStream",
    Path: "http://example.com/adopted-stream",
    Type: "HLS"
  }],
  adopt: true // Adopts the existing resource if it exists
});
```

## Example without Tags

Create a LiveSource without any tags for a simpler setup.

```ts
const noTagLiveSource = await AWS.MediaTailor.LiveSource("NoTagLiveSource", {
  LiveSourceName: "SimpleLiveSource",
  SourceLocationName: "MySourceLocation",
  HttpPackageConfigurations: [{
    SourceGroup: "SimpleStream",
    Path: "http://example.com/simple-stream",
    Type: "HLS"
  }]
});
```
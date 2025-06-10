---
title: OriginEndpoint
description: Learn how to create, update, and manage AWS MediaPackageV2 OriginEndpoints using Alchemy Cloud Control.
---


The OriginEndpoint resource allows you to manage [AWS MediaPackageV2 OriginEndpoints](https://docs.aws.amazon.com/mediapackagev2/latest/userguide/) for delivering video content. This resource enables the configuration of various settings such as manifests, segmentation, and channel associations.

## Minimal Example

Create a basic OriginEndpoint with required properties and one optional property for description.

```ts
import AWS from "alchemy/aws/control";

const basicOriginEndpoint = await AWS.MediaPackageV2.OriginEndpoint("basicEndpoint", {
  ChannelName: "liveChannel",
  ContainerType: "MPEG-DASH",
  OriginEndpointName: "basic-endpoint",
  ChannelGroupName: "liveChannelGroup",
  Description: "A basic OriginEndpoint for live streaming"
});
```

## Advanced Configuration

Configure an OriginEndpoint with advanced settings, including HLS manifests and low latency configurations.

```ts
const advancedOriginEndpoint = await AWS.MediaPackageV2.OriginEndpoint("advancedEndpoint", {
  ChannelName: "liveChannel",
  ContainerType: "HLS",
  OriginEndpointName: "advanced-endpoint",
  ChannelGroupName: "liveChannelGroup",
  HlsManifests: [{
    ManifestName: "hls-manifest",
    AdMarkers: "NONE",
    ProgramDateTime: "INCLUDE",
    PlaylistType: "EVENT"
  }],
  LowLatencyHlsManifests: [{
    ManifestName: "low-latency-hls",
    AdMarkers: "NONE",
    ProgramDateTime: "INCLUDE",
    PlaylistType: "EVENT"
  }],
  StartoverWindowSeconds: 3600
});
```

## Force Endpoint Error Configuration

Create an OriginEndpoint with a force endpoint error configuration to handle errors effectively.

```ts
const errorConfiguredEndpoint = await AWS.MediaPackageV2.OriginEndpoint("errorConfiguredEndpoint", {
  ChannelName: "liveChannel",
  ContainerType: "MPEG-DASH",
  OriginEndpointName: "error-configured-endpoint",
  ChannelGroupName: "liveChannelGroup",
  ForceEndpointErrorConfiguration: {
    ErrorResponses: [{
      HttpStatusCode: 404,
      ResponseType: "NO_AUTH",
      ErrorResponse: {
        ErrorCode: "404",
        ErrorMessage: "Content not found"
      }
    }]
  }
});
```

## Tagging for Resource Management

Create an OriginEndpoint with tags for easier resource management and organization.

```ts
const taggedOriginEndpoint = await AWS.MediaPackageV2.OriginEndpoint("taggedEndpoint", {
  ChannelName: "liveChannel",
  ContainerType: "HLS",
  OriginEndpointName: "tagged-endpoint",
  ChannelGroupName: "liveChannelGroup",
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }, {
    Key: "Project",
    Value: "LiveStreaming"
  }]
});
```

---
title: OriginEndpoint
description: Learn how to create, update, and manage AWS MediaPackage OriginEndpoints using Alchemy Cloud Control.
---


The OriginEndpoint resource allows you to manage [AWS MediaPackage OriginEndpoints](https://docs.aws.amazon.com/mediapackage/latest/userguide/) for delivering video content securely and reliably.

## Minimal Example

Create a basic OriginEndpoint with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicOriginEndpoint = await AWS.MediaPackage.OriginEndpoint("basicOriginEndpoint", {
  id: "my-origin-endpoint",
  channelId: "my-channel",
  description: "Basic Origin Endpoint for HLS streaming",
  manifestName: "my-manifest",
  hlsPackage: {
    segmentDurationSeconds: 6,
    playlistType: "EVENT",
    playlistWindowSeconds: 60,
    adMarkers: "SCTE35_ENHANCED"
  }
});
```

## Advanced Configuration

Configure an OriginEndpoint with advanced settings including multiple package types and authorization.

```ts
const advancedOriginEndpoint = await AWS.MediaPackage.OriginEndpoint("advancedOriginEndpoint", {
  id: "my-advanced-origin-endpoint",
  channelId: "my-channel",
  description: "Advanced Origin Endpoint with multiple packages",
  authorization: {
    // Example IAM policy for securing access
    // This policy should be tailored to your needs
    secrets: [
      {
        name: "my-access-key",
        value: alchemy.secret(process.env.MEDIA_PACKAGE_ACCESS_KEY!)
      }
    ]
  },
  dashPackage: {
    segmentDurationSeconds: 10,
    manifestLayout: "FULL",
    minBufferTimeSeconds: 2
  },
  cmafPackage: {
    segmentDurationSeconds: 5,
    encryption: {
      spekeKeyProvider: {
        resourceId: "my-key-provider",
        roleArn: "arn:aws:iam::123456789012:role/MediaPackageRole"
      }
    }
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "VideoStreaming" }
  ]
});
```

## Secure Access with Whitelisting

Create an OriginEndpoint that restricts access to specific IP addresses for security.

```ts
const secureOriginEndpoint = await AWS.MediaPackage.OriginEndpoint("secureOriginEndpoint", {
  id: "my-secure-origin-endpoint",
  channelId: "my-channel",
  description: "Secure Origin Endpoint with IP whitelisting",
  whitelist: ["192.168.1.0/24", "203.0.113.0/24"],
  hlsPackage: {
    segmentDurationSeconds: 6,
    playlistType: "EVENT"
  }
});
```

## Time Delay Configuration

Set up an OriginEndpoint with a time delay configuration for live events.

```ts
const delayedOriginEndpoint = await AWS.MediaPackage.OriginEndpoint("delayedOriginEndpoint", {
  id: "my-delayed-origin-endpoint",
  channelId: "my-channel",
  description: "Origin Endpoint with time delay for live events",
  timeDelaySeconds: 300, // 5 minutes delay
  hlsPackage: {
    segmentDurationSeconds: 6
  }
});
```

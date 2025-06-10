---
title: RecordingConfiguration
description: Learn how to create, update, and manage AWS IVS RecordingConfigurations using Alchemy Cloud Control.
---


The RecordingConfiguration resource lets you manage [AWS IVS RecordingConfigurations](https://docs.aws.amazon.com/ivs/latest/userguide/) for your video streaming applications. This resource allows you to configure recording settings for your live streams, including destination storage, rendition settings, and thumbnail generation.

## Minimal Example

Create a basic recording configuration with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const recordingConfig = await AWS.IVS.RecordingConfiguration("basicRecordingConfig", {
  destinationConfiguration: {
    s3: {
      bucketName: "my-video-recordings",
      prefix: "recordings/",
      roleArn: "arn:aws:iam::123456789012:role/IVSRecordingRole"
    }
  },
  recordingReconnectWindowSeconds: 30
});
```

## Advanced Configuration

Configure a recording setup with additional options for thumbnails and renditions.

```ts
const advancedRecordingConfig = await AWS.IVS.RecordingConfiguration("advancedRecordingConfig", {
  destinationConfiguration: {
    s3: {
      bucketName: "my-advanced-video-recordings",
      prefix: "advanced_recordings/",
      roleArn: "arn:aws:iam::123456789012:role/IVSAdvancedRecordingRole"
    }
  },
  renditionConfiguration: {
    renditions: [
      {
        resolution: "1280x720",
        framerate: 30,
        bitrate: 3000
      },
      {
        resolution: "640x360",
        framerate: 30,
        bitrate: 800
      }
    ]
  },
  thumbnailConfiguration: {
    destination: {
      s3: {
        bucketName: "my-thumbnail-recordings",
        prefix: "thumbnails/",
        roleArn: "arn:aws:iam::123456789012:role/IVSThumbnailRole"
      }
    },
    intervalSeconds: 60
  },
  tags: [
    {
      key: "Project",
      value: "LiveStreaming"
    }
  ]
});
```

## Custom Reconnect Window

This example demonstrates how to set a custom reconnect window for recording.

```ts
const customReconnectConfig = await AWS.IVS.RecordingConfiguration("customReconnectConfig", {
  destinationConfiguration: {
    s3: {
      bucketName: "my-custom-reconnect-recordings",
      prefix: "custom_recordings/",
      roleArn: "arn:aws:iam::123456789012:role/IVSCustomReconnectRole"
    }
  },
  recordingReconnectWindowSeconds: 45
});
```

## Thumbnail Configuration

Configure a recording with thumbnail generation enabled at specific intervals.

```ts
const thumbnailConfig = await AWS.IVS.RecordingConfiguration("thumbnailConfig", {
  destinationConfiguration: {
    s3: {
      bucketName: "my-thumbnail-config-recordings",
      prefix: "thumbnails/",
      roleArn: "arn:aws:iam::123456789012:role/IVSThumbnailRole"
    }
  },
  thumbnailConfiguration: {
    destination: {
      s3: {
        bucketName: "my-thumbnails-bucket",
        prefix: "thumbnail_images/",
        roleArn: "arn:aws:iam::123456789012:role/IVSThumbnailRole"
      }
    },
    intervalSeconds: 30
  }
});
```

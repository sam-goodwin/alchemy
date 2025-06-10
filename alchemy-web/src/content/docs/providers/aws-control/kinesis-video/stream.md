---
title: Stream
description: Learn how to create, update, and manage AWS KinesisVideo Streams using Alchemy Cloud Control.
---


The Stream resource lets you manage [AWS KinesisVideo Streams](https://docs.aws.amazon.com/kinesisvideo/latest/userguide/) for processing and analyzing video data in real-time.

## Minimal Example

Create a basic KinesisVideo Stream with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const videoStream = await AWS.KinesisVideo.Stream("myVideoStream", {
  name: "MyVideoStream",
  mediaType: "video/h264",
  dataRetentionInHours: 24
});
```

## Advanced Configuration

Configure a KinesisVideo Stream with additional security settings using KMS for encryption.

```ts
const secureVideoStream = await AWS.KinesisVideo.Stream("secureVideoStream", {
  name: "SecureVideoStream",
  mediaType: "video/h264",
  dataRetentionInHours: 48,
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-kms-key"
});
```

## Using Tags for Management

Create a KinesisVideo Stream that includes tags for easier management and organization.

```ts
const taggedVideoStream = await AWS.KinesisVideo.Stream("taggedVideoStream", {
  name: "TaggedVideoStream",
  mediaType: "video/h264",
  dataRetentionInHours: 72,
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "VideoAnalytics" }
  ]
});
```

## Stream with Device Name

Create a KinesisVideo Stream associated with a specific device for better tracking.

```ts
const deviceVideoStream = await AWS.KinesisVideo.Stream("deviceVideoStream", {
  name: "DeviceVideoStream",
  mediaType: "video/h264",
  dataRetentionInHours: 24,
  deviceName: "Camera1"
});
```

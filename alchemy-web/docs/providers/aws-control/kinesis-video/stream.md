---
title: Managing AWS KinesisVideo Streams with Alchemy
description: Learn how to create, update, and manage AWS KinesisVideo Streams using Alchemy Cloud Control.
---

# Stream

The Stream resource allows you to manage [AWS KinesisVideo Streams](https://docs.aws.amazon.com/kinesisvideo/latest/userguide/) for processing and analyzing video data in real-time.

## Minimal Example

Create a basic KinesisVideo Stream with essential properties.

```ts
import AWS from "alchemy/aws/control";

const BasicStream = await AWS.KinesisVideo.Stream("BasicStream", {
  Name: "MyVideoStream",
  MediaType: "video/h264",
  DataRetentionInHours: 24,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Advanced Configuration

Configure a KinesisVideo Stream with additional properties such as a KMS key for encryption.

```ts
const EncryptedStream = await AWS.KinesisVideo.Stream("EncryptedStream", {
  Name: "SecureVideoStream",
  MediaType: "video/h264",
  DataRetentionInHours: 48,
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Compliance", Value: "HIPAA" }
  ]
});
```

## Stream with Device Name

Create a stream that specifies a device name for better identification.

```ts
const DeviceStream = await AWS.KinesisVideo.Stream("DeviceStream", {
  Name: "CameraStream",
  MediaType: "video/h264",
  DeviceName: "Camera_1",
  DataRetentionInHours: 72,
  Tags: [
    { Key: "Location", Value: "Building A" },
    { Key: "Status", Value: "Active" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing KinesisVideo Stream rather than creating a new one.

```ts
const ExistingStream = await AWS.KinesisVideo.Stream("ExistingStream", {
  Name: "ExistingVideoStream",
  adopt: true // Adopt the existing resource instead of failing.
});
```
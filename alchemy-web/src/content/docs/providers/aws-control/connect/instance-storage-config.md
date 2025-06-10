---
title: InstanceStorageConfig
description: Learn how to create, update, and manage AWS Connect InstanceStorageConfigs using Alchemy Cloud Control.
---


The InstanceStorageConfig resource lets you manage [AWS Connect Instance Storage Configurations](https://docs.aws.amazon.com/connect/latest/userguide/) for storing various types of data associated with your AWS Connect instance.

## Minimal Example

Create a basic instance storage configuration with required properties and one optional S3 configuration.

```ts
import AWS from "alchemy/aws/control";

const instanceStorageConfig = await AWS.Connect.InstanceStorageConfig("basicInstanceStorageConfig", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-12ab-34cd-56ef-1234567890ab",
  ResourceType: "CHAT",
  StorageType: "S3",
  S3Config: {
    BucketName: "my-connect-storage-bucket",
    ObjectKey: "connect-chat-logs/",
    Encryption: "AES256"
  }
});
```

## Advanced Configuration

Configure an instance storage configuration with multiple storage types including Kinesis and S3.

```ts
const advancedInstanceStorageConfig = await AWS.Connect.InstanceStorageConfig("advancedInstanceStorageConfig", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-12ab-34cd-56ef-1234567890ab",
  ResourceType: "VOICE",
  StorageType: "KINESIS",
  KinesisStreamConfig: {
    StreamArn: "arn:aws:kinesis:us-east-1:123456789012:stream/my-kinesis-stream",
    RoleArn: "arn:aws:iam::123456789012:role/KinesisRole"
  },
  S3Config: {
    BucketName: "my-connect-voice-storage-bucket",
    ObjectKey: "connect-voice-recordings/",
    Encryption: "AES256"
  }
});
```

## Kinesis Video Stream Configuration

Set up a storage configuration that includes a Kinesis Video Stream configuration.

```ts
const videoStreamStorageConfig = await AWS.Connect.InstanceStorageConfig("videoStreamStorageConfig", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-12ab-34cd-56ef-1234567890ab",
  ResourceType: "VIDEO",
  StorageType: "KINESIS_VIDEO",
  KinesisVideoStreamConfig: {
    StreamArn: "arn:aws:kinesisvideo:us-east-1:123456789012:stream/my-video-stream",
    RoleArn: "arn:aws:iam::123456789012:role/KinesisVideoRole"
  }
});
```

## Adoption of Existing Resource

Create an instance storage configuration that adopts an existing resource.

```ts
const adoptExistingStorageConfig = await AWS.Connect.InstanceStorageConfig("adoptExistingStorageConfig", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-12ab-34cd-56ef-1234567890ab",
  ResourceType: "CHAT",
  StorageType: "S3",
  S3Config: {
    BucketName: "my-adopted-bucket",
    ObjectKey: "connect-chat-logs/",
    Encryption: "AES256"
  },
  adopt: true
});
```

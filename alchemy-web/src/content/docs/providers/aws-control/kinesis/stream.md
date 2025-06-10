---
title: Stream
description: Learn how to create, update, and manage AWS Kinesis Streams using Alchemy Cloud Control.
---


The Stream resource lets you manage [AWS Kinesis Streams](https://docs.aws.amazon.com/kinesis/latest/userguide/) for real-time data streaming and processing.

## Minimal Example

Create a basic Kinesis Stream with a specified number of shards and optional retention period.

```ts
import AWS from "alchemy/aws/control";

const kinesisStream = await AWS.Kinesis.Stream("basicKinesisStream", {
  name: "my-kinesis-stream",
  shardCount: 2,
  retentionPeriodHours: 24
});
```

## Advanced Configuration

Configure a Kinesis Stream with enhanced security settings and stream mode details.

```ts
const advancedKinesisStream = await AWS.Kinesis.Stream("advancedKinesisStream", {
  name: "secure-kinesis-stream",
  shardCount: 4,
  retentionPeriodHours: 48,
  streamModeDetails: {
    streamMode: "PROVISIONED"
  },
  streamEncryption: {
    keyId: "alias/my-kms-key",
    encryptionType: "KMS"
  }
});
```

## Using Tags for Organization

Create a Kinesis Stream with tags for better resource management.

```ts
const taggedKinesisStream = await AWS.Kinesis.Stream("taggedKinesisStream", {
  name: "tagged-kinesis-stream",
  shardCount: 3,
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "DataIngestion" }
  ]
});
```

## Adopting Existing Streams

Adopt an existing Kinesis Stream by setting the `adopt` property to true.

```ts
const existingKinesisStream = await AWS.Kinesis.Stream("existingKinesisStream", {
  name: "existing-kinesis-stream",
  adopt: true // This will not fail if the stream already exists
});
```

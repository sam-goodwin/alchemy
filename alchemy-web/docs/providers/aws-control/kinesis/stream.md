---
title: Managing AWS Kinesis Streams with Alchemy
description: Learn how to create, update, and manage AWS Kinesis Streams using Alchemy Cloud Control.
---

# Stream

The Stream resource allows you to manage [AWS Kinesis Streams](https://docs.aws.amazon.com/kinesis/latest/userguide/) for real-time data processing and analytics.

## Minimal Example

Create a basic Kinesis Stream with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicStream = await AWS.Kinesis.Stream("BasicStream", {
  Name: "MyBasicStream",
  ShardCount: 1,
  RetentionPeriodHours: 24,
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "DataIngestion" }
  ]
});
```

## Advanced Configuration

Configure a Kinesis Stream with encryption and shard-level metrics.

```ts
const advancedStream = await AWS.Kinesis.Stream("AdvancedStream", {
  Name: "MyAdvancedStream",
  ShardCount: 2,
  StreamEncryption: {
    EncryptionType: "KMS",
    KeyId: "arn:aws:kms:us-east-1:123456789012:key/my-key-id"
  },
  DesiredShardLevelMetrics: ["IncomingBytes", "IncomingRecords"],
  RetentionPeriodHours: 48,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```

## Stream with Custom Metrics

Create a Kinesis Stream that tracks custom metrics for better monitoring.

```ts
const metricsStream = await AWS.Kinesis.Stream("MetricsStream", {
  Name: "MyMetricsStream",
  ShardCount: 3,
  DesiredShardLevelMetrics: ["OutgoingBytes", "OutgoingRecords"],
  RetentionPeriodHours: 72,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Stream with Encryption and Adoption

Create a Kinesis Stream that adopts existing resources while implementing encryption.

```ts
const adoptedStream = await AWS.Kinesis.Stream("AdoptedStream", {
  Name: "MyAdoptedStream",
  ShardCount: 1,
  StreamEncryption: {
    EncryptionType: "KMS",
    KeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id"
  },
  adopt: true // Adopt existing resource if it exists
});
```
---
title: Stream
description: Learn how to create, update, and manage AWS QLDB Streams using Alchemy Cloud Control.
---


The Stream resource allows you to manage [AWS QLDB Streams](https://docs.aws.amazon.com/qldb/latest/userguide/) for capturing changes to your ledger's data. This resource facilitates real-time processing of changes, enabling applications to respond to updates in your QLDB ledgers.

## Minimal Example

Create a QLDB Stream with essential properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const qldbStream = await AWS.QLDB.Stream("myQldbStream", {
  InclusiveStartTime: new Date().toISOString(),
  StreamName: "MyStream",
  KinesisConfiguration: {
    StreamArn: "arn:aws:kinesis:us-east-1:123456789012:stream/MyKinesisStream",
    RoleArn: "arn:aws:iam::123456789012:role/MyKinesisRole"
  },
  LedgerName: "MyLedger",
  RoleArn: "arn:aws:iam::123456789012:role/QLDBStreamRole",
  ExclusiveEndTime: new Date(Date.now() + 86400000).toISOString() // Optional: 1 day later
});
```

## Advanced Configuration

Configure a QLDB Stream with tags to enhance resource management and identification.

```ts
const taggedQldbStream = await AWS.QLDB.Stream("taggedQldbStream", {
  InclusiveStartTime: new Date().toISOString(),
  StreamName: "TaggedStream",
  KinesisConfiguration: {
    StreamArn: "arn:aws:kinesis:us-east-1:123456789012:stream/MyKinesisStream",
    RoleArn: "arn:aws:iam::123456789012:role/MyKinesisRole"
  },
  LedgerName: "MyLedger",
  RoleArn: "arn:aws:iam::123456789012:role/QLDBStreamRole",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Finance" }
  ]
});
```

## Stream with Exclusive End Time

Demonstrate how to create a stream that includes an exclusive end time for more controlled data capture.

```ts
const timeLimitedQldbStream = await AWS.QLDB.Stream("timeLimitedQldbStream", {
  InclusiveStartTime: new Date().toISOString(),
  StreamName: "TimeLimitedStream",
  KinesisConfiguration: {
    StreamArn: "arn:aws:kinesis:us-east-1:123456789012:stream/MyKinesisStream",
    RoleArn: "arn:aws:iam::123456789012:role/MyKinesisRole"
  },
  LedgerName: "MyLedger",
  RoleArn: "arn:aws:iam::123456789012:role/QLDBStreamRole",
  ExclusiveEndTime: new Date(Date.now() + 3600000).toISOString() // Optional: 1 hour later
});
```

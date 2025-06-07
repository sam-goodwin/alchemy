---
title: Managing AWS QLDB Streams with Alchemy
description: Learn how to create, update, and manage AWS QLDB Streams using Alchemy Cloud Control.
---

# Stream

The Stream resource lets you create and manage [AWS QLDB Streams](https://docs.aws.amazon.com/qldb/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-qldb-stream.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const stream = await AWS.QLDB.Stream("stream-example", {
  InclusiveStartTime: "example-inclusivestarttime",
  StreamName: "stream-stream",
  KinesisConfiguration: "example-kinesisconfiguration",
  LedgerName: "stream-ledger",
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a stream with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStream = await AWS.QLDB.Stream("advanced-stream", {
  InclusiveStartTime: "example-inclusivestarttime",
  StreamName: "stream-stream",
  KinesisConfiguration: "example-kinesisconfiguration",
  LedgerName: "stream-ledger",
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


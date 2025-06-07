---
title: Managing AWS Logs LogStreams with Alchemy
description: Learn how to create, update, and manage AWS Logs LogStreams using Alchemy Cloud Control.
---

# LogStream

The LogStream resource lets you manage [AWS Logs LogStreams](https://docs.aws.amazon.com/logs/latest/userguide/) for collecting and processing log data within specified log groups.

## Minimal Example

Create a basic LogStream within a specified LogGroup with a defined name.

```ts
import AWS from "alchemy/aws/control";

const logStream = await AWS.Logs.LogStream("MyLogStream", {
  LogGroupName: "MyLogGroup",
  LogStreamName: "MyStream",
  adopt: true // Adopt existing resource instead of failing
});
```

## Advanced Configuration

Configure a LogStream with specific properties for better management.

```ts
const advancedLogStream = await AWS.Logs.LogStream("AdvancedLogStream", {
  LogGroupName: "AdvancedLogGroup",
  LogStreamName: "AdvancedStream",
  adopt: false // Do not adopt existing resource
});
```

## Using with AWS IAM Policies

Example of creating a LogStream with IAM policies for fine-grained access control.

```ts
const logStreamWithPolicy = await AWS.Logs.LogStream("LogStreamWithPolicy", {
  LogGroupName: "PolicyLogGroup",
  LogStreamName: "PolicyStream",
  adopt: true
});

// Attach IAM policy to allow writing logs to the LogStream
const iamPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: "logs:PutLogEvents",
      Resource: `arn:aws:logs:us-east-1:123456789012:log-group:${logStreamWithPolicy.LogGroupName}:log-stream:${logStreamWithPolicy.LogStreamName}`
    }
  ]
};
```
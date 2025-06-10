---
title: Destination
description: Learn how to create, update, and manage AWS Logs Destinations using Alchemy Cloud Control.
---


The Destination resource lets you manage [AWS Logs Destinations](https://docs.aws.amazon.com/logs/latest/userguide/) for routing log events to AWS services. A destination is an AWS resource that allows you to send logs from Amazon CloudWatch Logs to other services like Amazon Kinesis Data Streams or Amazon Kinesis Data Firehose.

## Minimal Example

Create a basic log destination that sends logs to a Kinesis Data Stream.

```ts
import AWS from "alchemy/aws/control";

const logDestination = await AWS.Logs.Destination("myLogDestination", {
  DestinationName: "MyKinesisStream",
  TargetArn: "arn:aws:kinesis:us-east-1:123456789012:stream/my-kinesis-stream",
  RoleArn: "arn:aws:iam::123456789012:role/myCloudWatchLogsRole",
  DestinationPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "logs.amazonaws.com"
        },
        Action: "kinesis:PutRecord",
        Resource: "arn:aws:kinesis:us-east-1:123456789012:stream/my-kinesis-stream"
      }
    ]
  })
});
```

## Advanced Configuration

Configure a log destination with a more specific IAM policy for controlling access.

```ts
const advancedLogDestination = await AWS.Logs.Destination("advancedLogDestination", {
  DestinationName: "AdvancedKinesisStream",
  TargetArn: "arn:aws:kinesis:us-east-1:123456789012:stream/advanced-kinesis-stream",
  RoleArn: "arn:aws:iam::123456789012:role/myAdvancedCloudWatchLogsRole",
  DestinationPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "logs.amazonaws.com"
        },
        Action: [
          "kinesis:PutRecord",
          "kinesis:PutRecords"
        ],
        Resource: "arn:aws:kinesis:us-east-1:123456789012:stream/advanced-kinesis-stream"
      },
      {
        Effect: "Allow",
        Principal: {
          Service: "logs.amazonaws.com"
        },
        Action: "iam:PassRole",
        Resource: "arn:aws:iam::123456789012:role/myAdvancedCloudWatchLogsRole"
      }
    ]
  })
});
```

## Adoption of Existing Resource

If you want to adopt an existing log destination resource instead of failing if it already exists, you can set the adopt property to true.

```ts
const adoptLogDestination = await AWS.Logs.Destination("adoptLogDestination", {
  DestinationName: "ExistingLogDestination",
  TargetArn: "arn:aws:kinesis:us-east-1:123456789012:stream/existing-kinesis-stream",
  RoleArn: "arn:aws:iam::123456789012:role/myExistingCloudWatchLogsRole",
  adopt: true
});
```

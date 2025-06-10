---
title: EventStream
description: Learn how to create, update, and manage AWS Pinpoint EventStreams using Alchemy Cloud Control.
---


The EventStream resource allows you to manage [AWS Pinpoint EventStreams](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for capturing and streaming events to data sinks like Amazon Kinesis. This enables you to analyze user engagement and application usage in real-time.

## Minimal Example

Create a basic EventStream with required properties.

```ts
import AWS from "alchemy/aws/control";

const eventStream = await AWS.Pinpoint.EventStream("basicEventStream", {
  ApplicationId: "1234567890abcdef",
  DestinationStreamArn: "arn:aws:kinesis:us-east-1:123456789012:stream/my-kinesis-stream",
  RoleArn: "arn:aws:iam::123456789012:role/myPinpointRole"
});
```

## Advanced Configuration

Configure an EventStream with an optional `adopt` property to manage existing resources.

```ts
const advancedEventStream = await AWS.Pinpoint.EventStream("advancedEventStream", {
  ApplicationId: "abcdef1234567890",
  DestinationStreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/another-kinesis-stream",
  RoleArn: "arn:aws:iam::123456789012:role/anotherPinpointRole",
  adopt: true // Adopt existing resource instead of failing
});
```

## Custom IAM Role

Set up an EventStream with a specific IAM role allowing it to interact with Kinesis.

```ts
const customRoleEventStream = await AWS.Pinpoint.EventStream("customRoleEventStream", {
  ApplicationId: "fedcba0987654321",
  DestinationStreamArn: "arn:aws:kinesis:us-west-1:123456789012:stream/custom-kinesis-stream",
  RoleArn: "arn:aws:iam::123456789012:role/customPinpointRole"
});

// Example IAM policy that can be attached to the RoleArn
const iamPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "kinesis:PutRecord",
        "kinesis:PutRecords"
      ],
      Resource: "arn:aws:kinesis:us-west-1:123456789012:stream/custom-kinesis-stream"
    }
  ]
};
```

## Using EventStream in Analytics

Integrate an EventStream to send user engagement data to Kinesis for analytics.

```ts
const analyticsEventStream = await AWS.Pinpoint.EventStream("analyticsEventStream", {
  ApplicationId: "0987654321abcdef",
  DestinationStreamArn: "arn:aws:kinesis:us-east-1:123456789012:stream/user-engagement-stream",
  RoleArn: "arn:aws:iam::123456789012:role/analyticsPinpointRole"
});

// This stream can now be used to analyze user behavior in real-time
```

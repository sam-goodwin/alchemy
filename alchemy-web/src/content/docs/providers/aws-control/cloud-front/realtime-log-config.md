---
title: RealtimeLogConfig
description: Learn how to create, update, and manage AWS CloudFront RealtimeLogConfigs using Alchemy Cloud Control.
---


The RealtimeLogConfig resource lets you manage [AWS CloudFront Realtime Log Configurations](https://docs.aws.amazon.com/cloudfront/latest/userguide/) for real-time logging of data as it is delivered through CloudFront.

## Minimal Example

Create a basic RealtimeLogConfig with the required properties and a sampling rate.

```ts
import AWS from "alchemy/aws/control";

const realTimeLogConfig = await AWS.CloudFront.RealtimeLogConfig("basic-realtime-log-config", {
  name: "my-realtime-log-config",
  fields: ["timestamp", "c-ip", "cs-method", "cs-uri-stem"],
  endPoints: [{
    StreamType: "Kinesis",
    KinesisStreamConfig: {
      StreamARN: "arn:aws:kinesis:us-east-1:123456789012:stream/my-stream",
      RoleARN: "arn:aws:iam::123456789012:role/my-role"
    }
  }],
  samplingRate: 10 // Log every 10th request
});
```

## Advanced Configuration

Configure a RealtimeLogConfig with multiple endpoints and a higher sampling rate for more granular logging.

```ts
const advancedLogConfig = await AWS.CloudFront.RealtimeLogConfig("advanced-realtime-log-config", {
  name: "my-advanced-realtime-log-config",
  fields: ["timestamp", "c-ip", "cs-method", "cs-uri-stem", "sc-status"],
  endPoints: [{
    StreamType: "Kinesis",
    KinesisStreamConfig: {
      StreamARN: "arn:aws:kinesis:us-east-1:123456789012:stream/my-stream",
      RoleARN: "arn:aws:iam::123456789012:role/my-role"
    },
    Name: "my-kinesis-endpoint"
  }, {
    StreamType: "Firehose",
    FirehoseStreamConfig: {
      DeliveryStreamARN: "arn:aws:firehose:us-east-1:123456789012:deliverystream/my-firehose",
      RoleARN: "arn:aws:iam::123456789012:role/my-firehose-role"
    },
    Name: "my-firehose-endpoint"
  }],
  samplingRate: 5 // Log every 5th request
});
```

## Custom Adoption

If you want to adopt an existing RealtimeLogConfig rather than fail when it already exists, you can set the `adopt` property.

```ts
const adoptExistingLogConfig = await AWS.CloudFront.RealtimeLogConfig("existing-realtime-log-config", {
  name: "existing-log-config",
  fields: ["timestamp", "c-ip"],
  endPoints: [{
    StreamType: "Kinesis",
    KinesisStreamConfig: {
      StreamARN: "arn:aws:kinesis:us-east-1:123456789012:stream/my-existing-stream",
      RoleARN: "arn:aws:iam::123456789012:role/my-existing-role"
    }
  }],
  samplingRate: 1, // Log every request
  adopt: true // Adopt existing resource
});
```

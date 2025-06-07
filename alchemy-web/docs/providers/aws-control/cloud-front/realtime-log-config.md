---
title: Managing AWS CloudFront RealtimeLogConfigs with Alchemy
description: Learn how to create, update, and manage AWS CloudFront RealtimeLogConfigs using Alchemy Cloud Control.
---

# RealtimeLogConfig

The RealtimeLogConfig resource allows you to create and manage [AWS CloudFront Realtime Log Configurations](https://docs.aws.amazon.com/cloudfront/latest/userguide/). This resource enables you to collect and stream logs in real-time from CloudFront distributions to your specified endpoints.

## Minimal Example

Create a basic RealtimeLogConfig with required fields and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicRealtimeLogConfig = await AWS.CloudFront.RealtimeLogConfig("BasicLogConfig", {
  Name: "BasicRealtimeLogConfig",
  Fields: ["date", "time", "c-ip", "cs-method", "cs-uri-stem"],
  EndPoints: [
    {
      StreamType: "EventStream",
      KinesisStreamConfig: {
        RoleArn: "arn:aws:iam::123456789012:role/CloudFrontKinesisRole",
        StreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/CloudFrontLogs"
      }
    }
  ],
  SamplingRate: 1
});
```

## Advanced Configuration

Configure a RealtimeLogConfig with multiple endpoints and additional properties.

```ts
const advancedRealtimeLogConfig = await AWS.CloudFront.RealtimeLogConfig("AdvancedLogConfig", {
  Name: "AdvancedRealtimeLogConfig",
  Fields: ["date", "time", "c-ip", "cs-method", "cs-uri-stem", "x-edge-result-type"],
  EndPoints: [
    {
      StreamType: "EventStream",
      KinesisStreamConfig: {
        RoleArn: "arn:aws:iam::123456789012:role/CloudFrontKinesisRole",
        StreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/CloudFrontLogs"
      }
    },
    {
      StreamType: "EventStream",
      KinesisStreamConfig: {
        RoleArn: "arn:aws:iam::123456789012:role/CloudFrontKinesisRole",
        StreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/AnotherCloudFrontLogs"
      }
    }
  ],
  SamplingRate: 10,
  adopt: true // Adopt existing resource if it already exists
});
```

## Stream to Multiple Endpoints

This example demonstrates how to configure a RealtimeLogConfig to stream logs to multiple Kinesis streams.

```ts
const multiEndpointLogConfig = await AWS.CloudFront.RealtimeLogConfig("MultiEndpointLogConfig", {
  Name: "MultiEndpointRealtimeLogConfig",
  Fields: ["date", "time", "c-ip", "cs-method", "cs-uri-stem"],
  EndPoints: [
    {
      StreamType: "EventStream",
      KinesisStreamConfig: {
        RoleArn: "arn:aws:iam::123456789012:role/CloudFrontKinesisRole",
        StreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/CloudFrontLogs1"
      }
    },
    {
      StreamType: "EventStream",
      KinesisStreamConfig: {
        RoleArn: "arn:aws:iam::123456789012:role/CloudFrontKinesisRole",
        StreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/CloudFrontLogs2"
      }
    }
  ],
  SamplingRate: 5
});
```
---
title: DeliveryDestination
description: Learn how to create, update, and manage AWS Logs DeliveryDestinations using Alchemy Cloud Control.
---


The DeliveryDestination resource lets you manage [AWS Logs DeliveryDestinations](https://docs.aws.amazon.com/logs/latest/userguide/) for streaming log data to various destinations like Amazon S3, Kinesis Data Firehose, or others. 

## Minimal Example

Create a basic delivery destination that streams logs to an S3 bucket with default settings.

```ts
import AWS from "alchemy/aws/control";

const deliveryDestination = await AWS.Logs.DeliveryDestination("basicDeliveryDestination", {
  name: "ExampleDeliveryDestination",
  destinationResourceArn: "arn:aws:s3:::my-log-bucket",
  outputFormat: "json"
});
```

## Advanced Configuration

Configure a delivery destination with a custom IAM policy and additional options.

```ts
const advancedDeliveryDestination = await AWS.Logs.DeliveryDestination("advancedDeliveryDestination", {
  name: "AdvancedDeliveryDestination",
  destinationResourceArn: "arn:aws:kinesis:us-west-2:123456789012:stream/my-log-stream",
  outputFormat: "json",
  deliveryDestinationPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "logs.amazonaws.com"
        },
        Action: "kinesis:PutRecord",
        Resource: "arn:aws:kinesis:us-west-2:123456789012:stream/my-log-stream"
      }
    ]
  },
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Using Tags for Organization

Create a delivery destination while tagging it for better organization and cost management.

```ts
const taggedDeliveryDestination = await AWS.Logs.DeliveryDestination("taggedDeliveryDestination", {
  name: "TaggedDeliveryDestination",
  destinationResourceArn: "arn:aws:s3:::my-tagged-bucket",
  outputFormat: "json",
  tags: [
    { Key: "Project", Value: "LogAnalysis" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```

## Adopting an Existing Resource

Adopt an existing delivery destination instead of failing when it already exists.

```ts
const adoptedDeliveryDestination = await AWS.Logs.DeliveryDestination("adoptedDeliveryDestination", {
  name: "ExistingDeliveryDestination",
  destinationResourceArn: "arn:aws:kinesis:us-east-1:123456789012:stream/existing-log-stream",
  adopt: true
});
```

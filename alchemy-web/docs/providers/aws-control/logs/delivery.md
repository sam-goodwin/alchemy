---
title: Managing AWS Logs Deliverys with Alchemy
description: Learn how to create, update, and manage AWS Logs Deliverys using Alchemy Cloud Control.
---

# Delivery

The Delivery resource allows you to manage the delivery of logs to specified destinations in AWS. For more details, refer to the [AWS Logs Delivery documentation](https://docs.aws.amazon.com/logs/latest/userguide/).

## Minimal Example

Create a basic logs delivery configuration with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const logsDelivery = await AWS.Logs.Delivery("BasicLogsDelivery", {
  DeliveryDestinationArn: "arn:aws:s3:::my-log-bucket",
  DeliverySourceName: "MyLogSource",
  FieldDelimiter: ",",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a logs delivery with additional options such as Hive-compatible paths and suffix paths.

```ts
const advancedLogsDelivery = await AWS.Logs.Delivery("AdvancedLogsDelivery", {
  DeliveryDestinationArn: "arn:aws:s3:::my-advanced-log-bucket",
  DeliverySourceName: "MyAdvancedLogSource",
  S3EnableHiveCompatiblePath: true,
  S3SuffixPath: ".log",
  RecordFields: ["timestamp", "level", "message"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Project", Value: "LoggingService" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing logs delivery resource instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const adoptedLogsDelivery = await AWS.Logs.Delivery("AdoptedLogsDelivery", {
  DeliveryDestinationArn: "arn:aws:s3:::my-adopted-log-bucket",
  DeliverySourceName: "MyAdoptedLogSource",
  adopt: true
});
```
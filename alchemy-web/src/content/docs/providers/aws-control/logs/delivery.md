---
title: Delivery
description: Learn how to create, update, and manage AWS Logs Deliverys using Alchemy Cloud Control.
---


The Delivery resource enables you to configure AWS Logs Delivery for managing and directing log data to specified destinations. For more details, refer to the [AWS Logs Delivery documentation](https://docs.aws.amazon.com/logs/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic Logs Delivery configuration with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const logsDelivery = await AWS.Logs.Delivery("basicLogsDelivery", {
  DeliveryDestinationArn: "arn:aws:s3:::my-logs-bucket",
  DeliverySourceName: "MyApplicationLogs",
  S3EnableHiveCompatiblePath: true
});
```

## Advanced Configuration

In this example, we configure Logs Delivery with additional options such as field delimiter and tags for better organization.

```ts
const advancedLogsDelivery = await AWS.Logs.Delivery("advancedLogsDelivery", {
  DeliveryDestinationArn: "arn:aws:s3:::my-logs-bucket",
  DeliverySourceName: "MyApplicationLogs",
  FieldDelimiter: ",",
  RecordFields: ["timestamp", "logLevel", "message"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Application", Value: "WebApp" }
  ]
});
```

## Custom S3 Path

This example shows how to customize the S3 path for log storage by specifying a suffix path.

```ts
const customPathLogsDelivery = await AWS.Logs.Delivery("customPathLogsDelivery", {
  DeliveryDestinationArn: "arn:aws:s3:::my-logs-bucket",
  DeliverySourceName: "MyApplicationLogs",
  S3SuffixPath: "logs/yyyy/MM/dd/"
});
```

## Adoption of Existing Resource

In this example, we demonstrate how to adopt an existing Logs Delivery resource instead of failing if it already exists.

```ts
const adoptExistingLogsDelivery = await AWS.Logs.Delivery("adoptExistingLogsDelivery", {
  DeliveryDestinationArn: "arn:aws:s3:::my-logs-bucket",
  DeliverySourceName: "MyApplicationLogs",
  adopt: true
});
```

---
title: Managing AWS Logs DeliverySources with Alchemy
description: Learn how to create, update, and manage AWS Logs DeliverySources using Alchemy Cloud Control.
---

# DeliverySource

The DeliverySource resource allows you to manage [AWS Logs DeliverySources](https://docs.aws.amazon.com/logs/latest/userguide/) which facilitate the delivery of log data to various destinations.

## Minimal Example

Create a basic delivery source with required properties and a few optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicDeliverySource = await AWS.Logs.DeliverySource("BasicDeliverySource", {
  Name: "MyDeliverySource",
  ResourceArn: "arn:aws:logs:us-west-2:123456789012:destination:MyDestination",
  LogType: "S3",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Logging" }
  ]
});
```

## Advanced Configuration

Configure a delivery source with additional properties to handle existing resources and specific log types.

```ts
const AdvancedDeliverySource = await AWS.Logs.DeliverySource("AdvancedDeliverySource", {
  Name: "AdvancedDeliverySource",
  ResourceArn: "arn:aws:logs:us-west-2:123456789012:destination:MyAdvancedDestination",
  LogType: "Kinesis",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "LoggingSystem" }
  ]
});
```

## Example with Adoption of Existing Resource

This example demonstrates how to adopt an existing delivery source instead of failing if it already exists.

```ts
const AdoptExistingDeliverySource = await AWS.Logs.DeliverySource("AdoptExistingDeliverySource", {
  Name: "ExistingDeliverySource",
  ResourceArn: "arn:aws:logs:us-west-2:123456789012:destination:ExistingDestination",
  LogType: "CloudWatch",
  adopt: true
});
```

## Example with Custom Tags

Create a delivery source while specifying custom tags for better resource management.

```ts
const TaggedDeliverySource = await AWS.Logs.DeliverySource("TaggedDeliverySource", {
  Name: "TaggedDeliverySource",
  ResourceArn: "arn:aws:logs:us-west-2:123456789012:destination:TaggedDestination",
  LogType: "Firehose",
  Tags: [
    { Key: "Department", Value: "IT" },
    { Key: "CostCenter", Value: "12345" }
  ]
});
```
---
title: DeliverySource
description: Learn how to create, update, and manage AWS Logs DeliverySources using Alchemy Cloud Control.
---


The DeliverySource resource lets you manage [AWS Logs DeliverySources](https://docs.aws.amazon.com/logs/latest/userguide/) for delivering log data to specified destinations, simplifying the management and configuration of log delivery in your AWS environment.

## Minimal Example

Create a basic log delivery source with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicDeliverySource = await AWS.Logs.DeliverySource("basicDeliverySource", {
  Name: "BasicDeliverySource",
  ResourceArn: "arn:aws:logs:us-east-1:123456789012:log-group:my-log-group",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a delivery source with a specific log type and additional properties.

```ts
const advancedDeliverySource = await AWS.Logs.DeliverySource("advancedDeliverySource", {
  Name: "AdvancedDeliverySource",
  ResourceArn: "arn:aws:logs:us-east-1:123456789012:log-group:my-log-group",
  LogType: "AWS::CloudTrail::Log",
  Tags: [
    {
      Key: "Project",
      Value: "LoggingProject"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Adoption of Existing Resources

Demonstrate how to adopt an existing log delivery source instead of creating a new one.

```ts
const adoptedDeliverySource = await AWS.Logs.DeliverySource("adoptedDeliverySource", {
  Name: "AdoptedDeliverySource",
  ResourceArn: "arn:aws:logs:us-east-1:123456789012:log-group:existing-log-group",
  adopt: true // This will allow the resource to be adopted if it already exists
});
```

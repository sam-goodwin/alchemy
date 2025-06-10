---
title: EventSubscription
description: Learn how to create, update, and manage AWS RDS EventSubscriptions using Alchemy Cloud Control.
---


The EventSubscription resource allows you to manage [AWS RDS EventSubscriptions](https://docs.aws.amazon.com/rds/latest/userguide/) for monitoring events related to your RDS resources.

## Minimal Example

Create a basic RDS EventSubscription with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const eventSubscription = await AWS.RDS.EventSubscription("myEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:mySNSTopic",
  SourceType: "db-instance",
  Enabled: true
});
```

## Advanced Configuration

Configure an EventSubscription to receive specific event categories for multiple RDS instances.

```ts
const advancedEventSubscription = await AWS.RDS.EventSubscription("advancedEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:mySNSTopic",
  SourceType: "db-instance",
  EventCategories: ["availability", "deletion", "failover"],
  SourceIds: ["mydbinstance1", "mydbinstance2"],
  Enabled: true
});
```

## Using Tags for Resource Management

Create an EventSubscription with tags for better resource management and cost allocation.

```ts
const taggedEventSubscription = await AWS.RDS.EventSubscription("taggedEventSubscription", {
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:mySNSTopic",
  SourceType: "db-instance",
  Enabled: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

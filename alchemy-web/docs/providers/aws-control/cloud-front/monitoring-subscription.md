---
title: Managing AWS CloudFront MonitoringSubscriptions with Alchemy
description: Learn how to create, update, and manage AWS CloudFront MonitoringSubscriptions using Alchemy Cloud Control.
---

# MonitoringSubscription

The MonitoringSubscription resource lets you create and manage [AWS CloudFront MonitoringSubscriptions](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-monitoringsubscription.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const monitoringsubscription = await AWS.CloudFront.MonitoringSubscription(
  "monitoringsubscription-example",
  {
    MonitoringSubscription: "example-monitoringsubscription",
    DistributionId: "example-distributionid",
  }
);
```


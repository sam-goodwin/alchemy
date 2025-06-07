---
title: Managing AWS CloudFront Distributions with Alchemy
description: Learn how to create, update, and manage AWS CloudFront Distributions using Alchemy Cloud Control.
---

# Distribution

The Distribution resource lets you create and manage [AWS CloudFront Distributions](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const distribution = await AWS.CloudFront.Distribution("distribution-example", {
  DistributionConfig: "example-distributionconfig",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a distribution with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDistribution = await AWS.CloudFront.Distribution("advanced-distribution", {
  DistributionConfig: "example-distributionconfig",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


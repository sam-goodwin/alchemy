---
title: Managing AWS CloudFront DistributionTenants with Alchemy
description: Learn how to create, update, and manage AWS CloudFront DistributionTenants using Alchemy Cloud Control.
---

# DistributionTenant

The DistributionTenant resource lets you create and manage [AWS CloudFront DistributionTenants](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distributiontenant.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const distributiontenant = await AWS.CloudFront.DistributionTenant("distributiontenant-example", {
  Domains: ["example-domains-1"],
  DistributionId: "example-distributionid",
  Name: "distributiontenant-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a distributiontenant with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDistributionTenant = await AWS.CloudFront.DistributionTenant(
  "advanced-distributiontenant",
  {
    Domains: ["example-domains-1"],
    DistributionId: "example-distributionid",
    Name: "distributiontenant-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```


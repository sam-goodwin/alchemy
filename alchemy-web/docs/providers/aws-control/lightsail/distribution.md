---
title: Managing AWS Lightsail Distributions with Alchemy
description: Learn how to create, update, and manage AWS Lightsail Distributions using Alchemy Cloud Control.
---

# Distribution

The Distribution resource lets you create and manage [AWS Lightsail Distributions](https://docs.aws.amazon.com/lightsail/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lightsail-distribution.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const distribution = await AWS.Lightsail.Distribution("distribution-example", {
  Origin: "example-origin",
  DistributionName: "distribution-distribution",
  BundleId: "example-bundleid",
  DefaultCacheBehavior: "example-defaultcachebehavior",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a distribution with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDistribution = await AWS.Lightsail.Distribution("advanced-distribution", {
  Origin: "example-origin",
  DistributionName: "distribution-distribution",
  BundleId: "example-bundleid",
  DefaultCacheBehavior: "example-defaultcachebehavior",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


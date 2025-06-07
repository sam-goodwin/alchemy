---
title: Managing AWS ResilienceHub ResiliencyPolicys with Alchemy
description: Learn how to create, update, and manage AWS ResilienceHub ResiliencyPolicys using Alchemy Cloud Control.
---

# ResiliencyPolicy

The ResiliencyPolicy resource lets you create and manage [AWS ResilienceHub ResiliencyPolicys](https://docs.aws.amazon.com/resiliencehub/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resiliencehub-resiliencypolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resiliencypolicy = await AWS.ResilienceHub.ResiliencyPolicy("resiliencypolicy-example", {
  Policy: "example-policy",
  Tier: "example-tier",
  PolicyName: "resiliencypolicy-policy",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a resiliencypolicy with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedResiliencyPolicy = await AWS.ResilienceHub.ResiliencyPolicy(
  "advanced-resiliencypolicy",
  {
    Policy: "example-policy",
    Tier: "example-tier",
    PolicyName: "resiliencypolicy-policy",
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


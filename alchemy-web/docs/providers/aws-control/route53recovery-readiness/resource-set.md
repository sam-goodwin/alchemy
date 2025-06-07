---
title: Managing AWS Route53RecoveryReadiness ResourceSets with Alchemy
description: Learn how to create, update, and manage AWS Route53RecoveryReadiness ResourceSets using Alchemy Cloud Control.
---

# ResourceSet

The ResourceSet resource lets you create and manage [AWS Route53RecoveryReadiness ResourceSets](https://docs.aws.amazon.com/route53recoveryreadiness/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53recoveryreadiness-resourceset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourceset = await AWS.Route53RecoveryReadiness.ResourceSet("resourceset-example", {
  ResourceSetType: "example-resourcesettype",
  Resources: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a resourceset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedResourceSet = await AWS.Route53RecoveryReadiness.ResourceSet("advanced-resourceset", {
  ResourceSetType: "example-resourcesettype",
  Resources: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


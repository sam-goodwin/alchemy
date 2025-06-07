---
title: Managing AWS BillingConductor PricingRules with Alchemy
description: Learn how to create, update, and manage AWS BillingConductor PricingRules using Alchemy Cloud Control.
---

# PricingRule

The PricingRule resource lets you create and manage [AWS BillingConductor PricingRules](https://docs.aws.amazon.com/billingconductor/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const pricingrule = await AWS.BillingConductor.PricingRule("pricingrule-example", {
  Type: "example-type",
  Scope: "example-scope",
  Name: "pricingrule-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A pricingrule resource managed by Alchemy",
});
```

## Advanced Configuration

Create a pricingrule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPricingRule = await AWS.BillingConductor.PricingRule("advanced-pricingrule", {
  Type: "example-type",
  Scope: "example-scope",
  Name: "pricingrule-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A pricingrule resource managed by Alchemy",
});
```


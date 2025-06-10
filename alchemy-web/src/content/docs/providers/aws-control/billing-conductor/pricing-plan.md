---
title: PricingPlan
description: Learn how to create, update, and manage AWS BillingConductor PricingPlans using Alchemy Cloud Control.
---


The PricingPlan resource lets you create and manage [AWS BillingConductor PricingPlans](https://docs.aws.amazon.com/billingconductor/latest/userguide/) for customizing your billing management and pricing structures.

## Minimal Example

Create a basic PricingPlan with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicPricingPlan = await AWS.BillingConductor.PricingPlan("basicPricingPlan", {
  Name: "BasicPricing",
  Description: "This is a basic pricing plan for our services."
});
```

## Advanced Configuration

Configure a PricingPlan with additional pricing rules and tags for better organization and management.

```ts
const advancedPricingPlan = await AWS.BillingConductor.PricingPlan("advancedPricingPlan", {
  Name: "AdvancedPricing",
  Description: "This pricing plan includes advanced pricing rules.",
  PricingRuleArns: [
    "arn:aws:billingconductor:us-east-1:123456789012:pricing-rule/abc123",
    "arn:aws:billingconductor:us-east-1:123456789012:pricing-rule/def456"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Finance" }
  ]
});
```

## Adoption of Existing Resources

Create a PricingPlan that adopts an existing resource instead of failing if it already exists.

```ts
const adoptExistingPricingPlan = await AWS.BillingConductor.PricingPlan("adoptExistingPricingPlan", {
  Name: "AdoptedPricing",
  Description: "This pricing plan adopts an existing resource.",
  adopt: true
});
```

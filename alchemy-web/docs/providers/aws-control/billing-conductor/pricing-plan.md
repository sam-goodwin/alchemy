---
title: Managing AWS BillingConductor PricingPlans with Alchemy
description: Learn how to create, update, and manage AWS BillingConductor PricingPlans using Alchemy Cloud Control.
---

# PricingPlan

The PricingPlan resource lets you create and manage [AWS BillingConductor PricingPlans](https://docs.aws.amazon.com/billingconductor/latest/userguide/) to handle custom billing strategies in your AWS account.

## Minimal Example

Create a basic PricingPlan with a name and a description:

```ts
import AWS from "alchemy/aws/control";

const BasicPricingPlan = await AWS.BillingConductor.PricingPlan("BasicPricingPlan", {
  Name: "Basic Pricing Plan",
  Description: "A simple pricing plan for basic services",
  PricingRuleArns: [
    "arn:aws:billingconductor:us-east-1:123456789012:pricing-rule/abc123"
  ],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Billing" }
  ]
});
```

## Advanced Configuration

Configure a PricingPlan with multiple pricing rules and tags:

```ts
const AdvancedPricingPlan = await AWS.BillingConductor.PricingPlan("AdvancedPricingPlan", {
  Name: "Advanced Pricing Plan",
  Description: "An advanced pricing plan with multiple rules",
  PricingRuleArns: [
    "arn:aws:billingconductor:us-east-1:123456789012:pricing-rule/def456",
    "arn:aws:billingconductor:us-east-1:123456789012:pricing-rule/ghi789"
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Finance" },
    { Key: "Project", Value: "CostManagement" }
  ]
});
```

## Adopt Existing Resource

Create a PricingPlan that adopts an existing resource instead of failing:

```ts
const ExistingPricingPlan = await AWS.BillingConductor.PricingPlan("ExistingPricingPlan", {
  Name: "Existing Pricing Plan",
  Description: "This plan adopts an existing pricing plan",
  PricingRuleArns: [
    "arn:aws:billingconductor:us-east-1:123456789012:pricing-rule/jkl012"
  ],
  adopt: true
});
```
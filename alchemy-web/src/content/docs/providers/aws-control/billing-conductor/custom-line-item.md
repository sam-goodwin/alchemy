---
title: CustomLineItem
description: Learn how to create, update, and manage AWS BillingConductor CustomLineItems using Alchemy Cloud Control.
---


The CustomLineItem resource lets you manage [AWS BillingConductor CustomLineItems](https://docs.aws.amazon.com/billingconductor/latest/userguide/) which are used for custom billing adjustments in AWS organizations.

## Minimal Example

Create a basic custom line item with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicCustomLineItem = await AWS.BillingConductor.CustomLineItem("basicCustomLineItem", {
  Name: "MonthlyAdjustment",
  BillingGroupArn: "arn:aws:billingconductor:us-east-1:123456789012:billing-group/my-billing-group",
  Description: "Adjustment for monthly usage"
});
```

## Advanced Configuration

Configure a custom line item with billing period range and tags for better tracking.

```ts
const advancedCustomLineItem = await AWS.BillingConductor.CustomLineItem("advancedCustomLineItem", {
  Name: "QuarterlyAdjustment",
  BillingGroupArn: "arn:aws:billingconductor:us-east-1:123456789012:billing-group/my-billing-group",
  Description: "Adjustment for quarterly usage",
  BillingPeriodRange: {
    Start: "2023-01-01T00:00:00Z",
    End: "2023-03-31T23:59:59Z"
  },
  Tags: [
    { Key: "Department", Value: "Finance" },
    { Key: "Project", Value: "CostOptimization" }
  ]
});
```

## Specific Use Case: Adoption of Existing Resource

Create a custom line item and adopt an existing resource if it already exists.

```ts
const adoptedCustomLineItem = await AWS.BillingConductor.CustomLineItem("adoptedCustomLineItem", {
  Name: "AdoptedAdjustment",
  BillingGroupArn: "arn:aws:billingconductor:us-east-1:123456789012:billing-group/my-billing-group",
  Description: "Adjustment for adopted resource",
  adopt: true
});
```

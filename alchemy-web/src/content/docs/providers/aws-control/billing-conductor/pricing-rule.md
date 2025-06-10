---
title: PricingRule
description: Learn how to create, update, and manage AWS BillingConductor PricingRules using Alchemy Cloud Control.
---


The PricingRule resource lets you manage [AWS BillingConductor PricingRules](https://docs.aws.amazon.com/billingconductor/latest/userguide/) for defining pricing configurations and rules for your AWS services.

## Minimal Example

Create a basic PricingRule with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicPricingRule = await AWS.BillingConductor.PricingRule("basicPricingRule", {
  Type: "Percentage",
  Description: "Discount for AWS services",
  Scope: "Service",
  Service: "AmazonEC2",
  ModifierPercentage: 10,
  Name: "EC2 Discount"
});
```

## Advanced Configuration

Configure a PricingRule with tiering options and additional modifiers.

```ts
import AWS from "alchemy/aws/control";

const advancedPricingRule = await AWS.BillingConductor.PricingRule("advancedPricingRule", {
  Type: "Tiered",
  Description: "Tiered pricing for data transfer",
  Scope: "UsageType",
  Service: "AmazonS3",
  ModifierPercentage: 5,
  Tiering: {
    Tiers: [
      {
        UpTo: 500,
        Percentage: 20
      },
      {
        UpTo: 1000,
        Percentage: 15
      },
      {
        UpTo: 5000,
        Percentage: 10
      }
    ]
  },
  Name: "S3 Tiered Pricing"
});
```

## Usage Type Specific Rule

Create a PricingRule that applies to a specific usage type.

```ts
import AWS from "alchemy/aws/control";

const usageTypePricingRule = await AWS.BillingConductor.PricingRule("usageTypePricingRule", {
  Type: "Flat",
  Description: "Flat rate for specific usage type",
  Scope: "UsageType",
  UsageType: "DataTransfer-Out-Bytes",
  ModifierPercentage: 0,
  Name: "Data Transfer Flat Rate"
});
```

## Adoption of Existing Pricing Rule

Create a PricingRule that adopts an existing resource instead of failing if the resource already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptExistingPricingRule = await AWS.BillingConductor.PricingRule("adoptExistingPricingRule", {
  Type: "Percentage",
  Description: "Adopt existing pricing rule",
  Scope: "Service",
  Service: "AmazonRDS",
  ModifierPercentage: 15,
  Name: "RDS Discount",
  adopt: true
});
```

---
title: BillingGroup
description: Learn how to create, update, and manage AWS BillingConductor BillingGroups using Alchemy Cloud Control.
---


The BillingGroup resource lets you manage [AWS BillingConductor BillingGroups](https://docs.aws.amazon.com/billingconductor/latest/userguide/) for organizing and managing billing across multiple accounts.

## Minimal Example

Create a basic billing group with required properties and optional description and tags.

```ts
import AWS from "alchemy/aws/control";

const billingGroup = await AWS.BillingConductor.BillingGroup("basicBillingGroup", {
  Name: "BasicBillingGroup",
  PrimaryAccountId: "123456789012",
  ComputationPreference: {
    PriceListId: "price-list-id",
    PricingPlan: "FlatRate"
  },
  AccountGrouping: {
    AccountIds: ["123456789012", "987654321098"]
  },
  Description: "A simple billing group for demo purposes",
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a billing group with additional properties for enhanced management.

```ts
const advancedBillingGroup = await AWS.BillingConductor.BillingGroup("advancedBillingGroup", {
  Name: "AdvancedBillingGroup",
  PrimaryAccountId: "123456789012",
  ComputationPreference: {
    PriceListId: "advanced-price-list-id",
    PricingPlan: "Tiered"
  },
  AccountGrouping: {
    AccountIds: ["123456789012", "987654321098", "112233445566"]
  },
  Description: "An advanced billing group with multiple accounts",
  Tags: [
    { Key: "Team", Value: "Finance" },
    { Key: "Project", Value: "BillingOptimization" }
  ],
  adopt: true
});
```

## Custom Computation Preferences

Create a billing group with custom computation preferences for specific pricing strategies.

```ts
const customComputationBillingGroup = await AWS.BillingConductor.BillingGroup("customComputationBillingGroup", {
  Name: "CustomComputationBillingGroup",
  PrimaryAccountId: "123456789012",
  ComputationPreference: {
    PriceListId: "custom-price-list-id",
    PricingPlan: "UsageBased"
  },
  AccountGrouping: {
    AccountIds: ["123456789012", "987654321098", "223344556677"]
  },
  Description: "Billing group with unique computation preferences",
  Tags: [
    { Key: "BillingType", Value: "Usage" }
  ]
});
```

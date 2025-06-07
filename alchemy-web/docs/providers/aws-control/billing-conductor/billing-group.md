---
title: Managing AWS BillingConductor BillingGroups with Alchemy
description: Learn how to create, update, and manage AWS BillingConductor BillingGroups using Alchemy Cloud Control.
---

# BillingGroup

The BillingGroup resource lets you create and manage [AWS BillingConductor BillingGroups](https://docs.aws.amazon.com/billingconductor/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const billinggroup = await AWS.BillingConductor.BillingGroup("billinggroup-example", {
  PrimaryAccountId: "example-primaryaccountid",
  ComputationPreference: "example-computationpreference",
  AccountGrouping: "example-accountgrouping",
  Name: "billinggroup-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A billinggroup resource managed by Alchemy",
});
```

## Advanced Configuration

Create a billinggroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedBillingGroup = await AWS.BillingConductor.BillingGroup("advanced-billinggroup", {
  PrimaryAccountId: "example-primaryaccountid",
  ComputationPreference: "example-computationpreference",
  AccountGrouping: "example-accountgrouping",
  Name: "billinggroup-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A billinggroup resource managed by Alchemy",
});
```


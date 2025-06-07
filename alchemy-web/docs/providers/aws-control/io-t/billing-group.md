---
title: Managing AWS IoT BillingGroups with Alchemy
description: Learn how to create, update, and manage AWS IoT BillingGroups using Alchemy Cloud Control.
---

# BillingGroup

The BillingGroup resource lets you manage [AWS IoT BillingGroups](https://docs.aws.amazon.com/iot/latest/userguide/) for grouping billing accounts and managing costs effectively.

## Minimal Example

Create a basic BillingGroup with a name and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicBillingGroup = await AWS.IoT.BillingGroup("BasicBillingGroup", {
  BillingGroupName: "BasicBillingGroup",
  Tags: [
    { Key: "Environment", Value: "development" }
  ]
});
```

## Advanced Configuration

Configure a BillingGroup with additional properties including billing group properties.

```ts
const AdvancedBillingGroup = await AWS.IoT.BillingGroup("AdvancedBillingGroup", {
  BillingGroupName: "AdvancedBillingGroup",
  BillingGroupProperties: {
    // Define specific properties for the billing group
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Finance" }
  ]
});
```

## Existing Resource Adoption

Adopt an existing BillingGroup if it already exists.

```ts
const AdoptedBillingGroup = await AWS.IoT.BillingGroup("AdoptedBillingGroup", {
  BillingGroupName: "ExistingBillingGroup",
  adopt: true // Set to true to adopt the resource if it exists
});
```
---
title: BillingGroup
description: Learn how to create, update, and manage AWS IoT BillingGroups using Alchemy Cloud Control.
---


The BillingGroup resource lets you manage [AWS IoT BillingGroups](https://docs.aws.amazon.com/iot/latest/userguide/) that allow you to group billing for multiple devices. This is essential for tracking costs associated with your IoT devices efficiently.

## Minimal Example

Create a basic BillingGroup with a specified name and tags.

```ts
import AWS from "alchemy/aws/control";

const billingGroup = await AWS.IoT.BillingGroup("myBillingGroup", {
  BillingGroupName: "MyBillingGroup",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "IoTIntegration" }
  ]
});
```

## Advanced Configuration

Configure a BillingGroup with additional properties and billing group properties.

```ts
const advancedBillingGroup = await AWS.IoT.BillingGroup("advancedBillingGroup", {
  BillingGroupName: "AdvancedBillingGroup",
  BillingGroupProperties: {
    BillingGroupArn: "arn:aws:iot:us-west-2:123456789012:billinggroup/AdvancedBillingGroup"
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing BillingGroup if it already exists to avoid failures.

```ts
const adoptBillingGroup = await AWS.IoT.BillingGroup("adoptedBillingGroup", {
  BillingGroupName: "ExistingBillingGroup",
  adopt: true // This will adopt the existing resource instead of failing
});
```

## Creating Multiple BillingGroups

Create multiple BillingGroups to manage different environments.

```ts
const productionBillingGroup = await AWS.IoT.BillingGroup("prodBillingGroup", {
  BillingGroupName: "ProductionBillingGroup",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});

const stagingBillingGroup = await AWS.IoT.BillingGroup("stagingBillingGroup", {
  BillingGroupName: "StagingBillingGroup",
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```

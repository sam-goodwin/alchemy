---
title: RecoveryGroup
description: Learn how to create, update, and manage AWS Route53RecoveryReadiness RecoveryGroups using Alchemy Cloud Control.
---


The RecoveryGroup resource allows you to manage [AWS Route53RecoveryReadiness RecoveryGroups](https://docs.aws.amazon.com/route53recoveryreadiness/latest/userguide/) for improving the recovery readiness of your applications.

## Minimal Example

Create a basic RecoveryGroup with a specified name and a single cell.

```ts
import AWS from "alchemy/aws/control";

const recoveryGroup = await AWS.Route53RecoveryReadiness.RecoveryGroup("myRecoveryGroup", {
  RecoveryGroupName: "MyRecoveryGroup",
  Cells: ["cell-1"],
});
```

## Advanced Configuration

Configure a RecoveryGroup with tags for resource management and multiple cells.

```ts
const advancedRecoveryGroup = await AWS.Route53RecoveryReadiness.RecoveryGroup("advancedRecoveryGroup", {
  RecoveryGroupName: "AdvancedRecoveryGroup",
  Cells: ["cell-1", "cell-2", "cell-3"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "TeamA" }
  ],
});
```

## Adopting Existing Resources

If you want to adopt an existing RecoveryGroup instead of failing if it already exists, you can set the `adopt` property to true.

```ts
const adoptedRecoveryGroup = await AWS.Route53RecoveryReadiness.RecoveryGroup("adoptedRecoveryGroup", {
  RecoveryGroupName: "AdoptedRecoveryGroup",
  Cells: ["cell-1"],
  adopt: true,
});
```

## Creating Multiple RecoveryGroups

Manage multiple RecoveryGroups for different environments efficiently.

```ts
const devRecoveryGroup = await AWS.Route53RecoveryReadiness.RecoveryGroup("devRecoveryGroup", {
  RecoveryGroupName: "DevRecoveryGroup",
  Cells: ["cell-dev-1", "cell-dev-2"],
});

const prodRecoveryGroup = await AWS.Route53RecoveryReadiness.RecoveryGroup("prodRecoveryGroup", {
  RecoveryGroupName: "ProdRecoveryGroup",
  Cells: ["cell-prod-1", "cell-prod-2"],
  Tags: [
    { Key: "Environment", Value: "Production" }
  ],
});
```

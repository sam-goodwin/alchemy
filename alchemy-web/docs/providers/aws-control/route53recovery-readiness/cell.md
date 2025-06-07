---
title: Managing AWS Route53RecoveryReadiness Cells with Alchemy
description: Learn how to create, update, and manage AWS Route53RecoveryReadiness Cells using Alchemy Cloud Control.
---

# Cell

The Cell resource lets you create and manage [AWS Route53RecoveryReadiness Cells](https://docs.aws.amazon.com/route53recoveryreadiness/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53recoveryreadiness-cell.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cell = await AWS.Route53RecoveryReadiness.Cell("cell-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a cell with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCell = await AWS.Route53RecoveryReadiness.Cell("advanced-cell", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


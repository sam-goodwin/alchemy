---
title: Managing AWS CE CostCategorys with Alchemy
description: Learn how to create, update, and manage AWS CE CostCategorys using Alchemy Cloud Control.
---

# CostCategory

The CostCategory resource lets you create and manage [AWS CE CostCategorys](https://docs.aws.amazon.com/ce/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ce-costcategory.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const costcategory = await AWS.CE.CostCategory("costcategory-example", {
  RuleVersion: "example-ruleversion",
  Rules: "example-rules",
  Name: "costcategory-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a costcategory with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCostCategory = await AWS.CE.CostCategory("advanced-costcategory", {
  RuleVersion: "example-ruleversion",
  Rules: "example-rules",
  Name: "costcategory-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


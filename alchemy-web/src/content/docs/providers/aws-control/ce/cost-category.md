---
title: CostCategory
description: Learn how to create, update, and manage AWS CE CostCategorys using Alchemy Cloud Control.
---


The CostCategory resource lets you manage [AWS Cost Categories](https://docs.aws.amazon.com/ce/latest/userguide/) for organizing your AWS cost allocation according to your business needs.

## Minimal Example

Create a basic cost category with a default value and a set of rules.

```ts
import AWS from "alchemy/aws/control";

const costCategory = await AWS.CE.CostCategory("basicCostCategory", {
  name: "Basic Cost Category",
  ruleVersion: "CostCategoryExpression.v1",
  rules: JSON.stringify({
    "Rule1": {
      "RuleType": "Service",
      "MatchOptions": ["Include"],
      "Values": ["AmazonEC2"]
    }
  }),
  defaultValue: "Unallocated"
});
```

## Advanced Configuration

Configure a cost category with split charge rules to distribute costs across different services.

```ts
const advancedCostCategory = await AWS.CE.CostCategory("advancedCostCategory", {
  name: "Advanced Cost Category",
  ruleVersion: "CostCategoryExpression.v1",
  rules: JSON.stringify({
    "Rule1": {
      "RuleType": "Service",
      "MatchOptions": ["Include"],
      "Values": ["AmazonS3"]
    },
    "Rule2": {
      "RuleType": "LinkedAccount",
      "MatchOptions": ["Include"],
      "Values": ["123456789012"]
    }
  }),
  splitChargeRules: JSON.stringify({
    "SplitRule1": {
      "Percentage": 50,
      "ChargeType": "Service"
    },
    "SplitRule2": {
      "Percentage": 50,
      "ChargeType": "LinkedAccount"
    }
  })
});
```

## Example with Tags

Create a cost category that includes tags for additional categorization.

```ts
const taggedCostCategory = await AWS.CE.CostCategory("taggedCostCategory", {
  name: "Tagged Cost Category",
  ruleVersion: "CostCategoryExpression.v1",
  rules: JSON.stringify({
    "Rule1": {
      "RuleType": "Tag",
      "MatchOptions": ["Include"],
      "Values": ["Environment"]
    }
  }),
  tags: [
    { Key: "Project", Value: "ProjectAlpha" },
    { Key: "Department", Value: "Engineering" }
  ]
});
```

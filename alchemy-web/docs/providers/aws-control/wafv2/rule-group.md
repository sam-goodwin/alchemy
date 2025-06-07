---
title: Managing AWS WAFv2 RuleGroups with Alchemy
description: Learn how to create, update, and manage AWS WAFv2 RuleGroups using Alchemy Cloud Control.
---

# RuleGroup

The RuleGroup resource lets you create and manage [AWS WAFv2 RuleGroups](https://docs.aws.amazon.com/wafv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-rulegroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rulegroup = await AWS.WAFv2.RuleGroup("rulegroup-example", {
  Scope: "example-scope",
  Capacity: 1,
  VisibilityConfig: "example-visibilityconfig",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A rulegroup resource managed by Alchemy",
});
```

## Advanced Configuration

Create a rulegroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRuleGroup = await AWS.WAFv2.RuleGroup("advanced-rulegroup", {
  Scope: "example-scope",
  Capacity: 1,
  VisibilityConfig: "example-visibilityconfig",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A rulegroup resource managed by Alchemy",
});
```


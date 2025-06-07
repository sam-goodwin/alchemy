---
title: Managing AWS NetworkFirewall RuleGroups with Alchemy
description: Learn how to create, update, and manage AWS NetworkFirewall RuleGroups using Alchemy Cloud Control.
---

# RuleGroup

The RuleGroup resource lets you create and manage [AWS NetworkFirewall RuleGroups](https://docs.aws.amazon.com/networkfirewall/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkfirewall-rulegroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rulegroup = await AWS.NetworkFirewall.RuleGroup("rulegroup-example", {
  Type: "example-type",
  Capacity: 1,
  RuleGroupName: "rulegroup-rulegroup",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A rulegroup resource managed by Alchemy",
});
```

## Advanced Configuration

Create a rulegroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRuleGroup = await AWS.NetworkFirewall.RuleGroup("advanced-rulegroup", {
  Type: "example-type",
  Capacity: 1,
  RuleGroupName: "rulegroup-rulegroup",
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


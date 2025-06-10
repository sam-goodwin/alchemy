---
title: RuleGroup
description: Learn how to create, update, and manage AWS NetworkFirewall RuleGroups using Alchemy Cloud Control.
---


The RuleGroup resource allows you to manage [AWS NetworkFirewall RuleGroups](https://docs.aws.amazon.com/networkfirewall/latest/userguide/) for creating and applying firewall rules to your network traffic.

## Minimal Example

Create a basic RuleGroup with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicRuleGroup = await AWS.NetworkFirewall.RuleGroup("basicRuleGroup", {
  Type: "STATEFUL",
  Capacity: 100,
  RuleGroupName: "BasicRuleGroup",
  Description: "A simple stateful rule group for basic traffic filtering."
});
```

## Advanced Configuration

Configure a RuleGroup with detailed rules and tags for better management.

```ts
const advancedRuleGroup = await AWS.NetworkFirewall.RuleGroup("advancedRuleGroup", {
  Type: "STATEFUL",
  Capacity: 200,
  RuleGroupName: "AdvancedRuleGroup",
  RuleGroup: {
    RulesSource: {
      RulesString: `
        rule1: {
          action: "PASS",
          protocol: "TCP",
          destination: {
            addresses: ["192.168.1.0/24"],
            ports: ["80", "443"]
          }
        }
      `
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ]
});
```

## Custom Firewall Rules

Demonstrate how to create a RuleGroup with custom firewall rules that include complex conditions.

```ts
const customRulesGroup = await AWS.NetworkFirewall.RuleGroup("customRulesGroup", {
  Type: "STATEFUL",
  Capacity: 150,
  RuleGroupName: "CustomRulesGroup",
  RuleGroup: {
    RulesSource: {
      RulesString: `
        rule2: {
          action: "DROP",
          protocol: "UDP",
          source: {
            addresses: ["10.0.0.0/16"],
            ports: ["53"]
          },
          destination: {
            addresses: ["0.0.0.0/0"],
            ports: ["53"]
          }
        }
      `
    }
  }
});
```

## Adoption of Existing RuleGroups

Create a new RuleGroup and adopt an existing one if it already exists.

```ts
const adoptRuleGroup = await AWS.NetworkFirewall.RuleGroup("adoptRuleGroup", {
  Type: "STATELESS",
  Capacity: 100,
  RuleGroupName: "AdoptedRuleGroup",
  adopt: true
});
```

---
title: FirewallPolicy
description: Learn how to create, update, and manage AWS NetworkFirewall FirewallPolicys using Alchemy Cloud Control.
---


The FirewallPolicy resource allows you to manage [AWS NetworkFirewall FirewallPolicys](https://docs.aws.amazon.com/networkfirewall/latest/userguide/) to define your firewall rules and behaviors.

## Minimal Example

Create a basic FirewallPolicy with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicFirewallPolicy = await AWS.NetworkFirewall.FirewallPolicy("basicFirewallPolicy", {
  FirewallPolicyName: "BasicPolicy",
  Description: "A basic firewall policy for demonstration purposes",
  FirewallPolicy: {
    StatelessRuleGroupReferences: [],
    StatelessDefaultActions: ["aws:pass"],
    StatelessFragmentDefaultActions: ["aws:pass"],
    StatefullRuleGroupReferences: []
  }
});
```

## Advanced Configuration

Configure a firewall policy with stateful rule groups and more complex default actions.

```ts
const advancedFirewallPolicy = await AWS.NetworkFirewall.FirewallPolicy("advancedFirewallPolicy", {
  FirewallPolicyName: "AdvancedPolicy",
  Description: "An advanced firewall policy with stateful rules",
  FirewallPolicy: {
    StatelessRuleGroupReferences: [
      {
        ResourceArn: "arn:aws:network-firewall:us-east-1:123456789012:stateful-rulegroup/MyStatefulRuleGroup"
      }
    ],
    StatelessDefaultActions: ["aws:drop"],
    StatelessFragmentDefaultActions: ["aws:drop"],
    StatefulRuleGroupReferences: [
      {
        ResourceArn: "arn:aws:network-firewall:us-east-1:123456789012:stateless-rulegroup/MyStatelessRuleGroup"
      }
    ]
  }
});
```

## Example with Tags

Create a FirewallPolicy that includes tags for better resource management.

```ts
const taggedFirewallPolicy = await AWS.NetworkFirewall.FirewallPolicy("taggedFirewallPolicy", {
  FirewallPolicyName: "TaggedPolicy",
  Description: "A policy with tags for organizational purposes",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Team",
      Value: "Security"
    }
  ],
  FirewallPolicy: {
    StatelessRuleGroupReferences: [],
    StatelessDefaultActions: ["aws:pass"],
    StatelessFragmentDefaultActions: ["aws:pass"],
    StatefulRuleGroupReferences: []
  }
});
```

## Example with Adoption

Create a FirewallPolicy and adopt an existing resource if it already exists.

```ts
const adoptiveFirewallPolicy = await AWS.NetworkFirewall.FirewallPolicy("adoptiveFirewallPolicy", {
  FirewallPolicyName: "AdoptivePolicy",
  Description: "Adopt an existing firewall policy if it exists",
  adopt: true,
  FirewallPolicy: {
    StatelessRuleGroupReferences: [],
    StatelessDefaultActions: ["aws:pass"],
    StatelessFragmentDefaultActions: ["aws:pass"],
    StatefulRuleGroupReferences: []
  }
});
```

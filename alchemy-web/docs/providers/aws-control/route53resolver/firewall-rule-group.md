---
title: Managing AWS Route53Resolver FirewallRuleGroups with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver FirewallRuleGroups using Alchemy Cloud Control.
---

# FirewallRuleGroup

The FirewallRuleGroup resource lets you create and manage [AWS Route53Resolver FirewallRuleGroups](https://docs.aws.amazon.com/route53resolver/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const firewallrulegroup = await AWS.Route53Resolver.FirewallRuleGroup("firewallrulegroup-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a firewallrulegroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFirewallRuleGroup = await AWS.Route53Resolver.FirewallRuleGroup(
  "advanced-firewallrulegroup",
  {
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```


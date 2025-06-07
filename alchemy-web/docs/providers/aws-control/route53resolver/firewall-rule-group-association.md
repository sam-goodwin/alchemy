---
title: Managing AWS Route53Resolver FirewallRuleGroupAssociations with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver FirewallRuleGroupAssociations using Alchemy Cloud Control.
---

# FirewallRuleGroupAssociation

The FirewallRuleGroupAssociation resource lets you create and manage [AWS Route53Resolver FirewallRuleGroupAssociations](https://docs.aws.amazon.com/route53resolver/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const firewallrulegroupassociation = await AWS.Route53Resolver.FirewallRuleGroupAssociation(
  "firewallrulegroupassociation-example",
  {
    VpcId: "example-vpcid",
    FirewallRuleGroupId: "example-firewallrulegroupid",
    Priority: 1,
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a firewallrulegroupassociation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFirewallRuleGroupAssociation = await AWS.Route53Resolver.FirewallRuleGroupAssociation(
  "advanced-firewallrulegroupassociation",
  {
    VpcId: "example-vpcid",
    FirewallRuleGroupId: "example-firewallrulegroupid",
    Priority: 1,
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


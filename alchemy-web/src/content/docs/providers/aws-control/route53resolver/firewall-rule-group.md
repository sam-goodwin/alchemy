---
title: FirewallRuleGroup
description: Learn how to create, update, and manage AWS Route53Resolver FirewallRuleGroups using Alchemy Cloud Control.
---


The FirewallRuleGroup resource lets you manage [AWS Route53Resolver FirewallRuleGroups](https://docs.aws.amazon.com/route53resolver/latest/userguide/) for controlling DNS queries and applying firewall rules.

## Minimal Example

Create a simple FirewallRuleGroup with a basic rule and a descriptive name.

```ts
import AWS from "alchemy/aws/control";

const firewallRuleGroup = await AWS.Route53Resolver.FirewallRuleGroup("basicFirewallRuleGroup", {
  name: "BasicFirewallRuleGroup",
  FirewallRules: [{
    Action: "ALLOW",
    Name: "AllowSpecificIP",
    Priority: 1,
    RuleAction: {
      Action: "ALLOW"
    },
    FirewallDomainListId: "example-domain-list-id",
    BlockResponse: "NODATA"
  }],
  Tags: [{
    Key: "Environment",
    Value: "Development"
  }]
});
```

## Advanced Configuration

Configure a FirewallRuleGroup with multiple firewall rules and additional tags for better organization.

```ts
const advancedFirewallRuleGroup = await AWS.Route53Resolver.FirewallRuleGroup("advancedFirewallRuleGroup", {
  name: "AdvancedFirewallRuleGroup",
  FirewallRules: [
    {
      Action: "BLOCK",
      Name: "BlockMaliciousDomains",
      Priority: 2,
      RuleAction: {
        Action: "BLOCK"
      },
      FirewallDomainListId: "malicious-domain-list-id",
      BlockResponse: "NXDOMAIN"
    },
    {
      Action: "ALLOW",
      Name: "AllowTrustedIP",
      Priority: 1,
      RuleAction: {
        Action: "ALLOW"
      },
      FirewallDomainListId: "trusted-domain-list-id",
      BlockResponse: "NODATA"
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "Security"
    },
    {
      Key: "Owner",
      Value: "TeamA"
    }
  ]
});
```

## Using Existing Resources

Adopt an existing FirewallRuleGroup if it already exists instead of creating a new one.

```ts
const adoptedFirewallRuleGroup = await AWS.Route53Resolver.FirewallRuleGroup("adoptedFirewallRuleGroup", {
  name: "AdoptedFirewallRuleGroup",
  adopt: true,
  FirewallRules: [{
    Action: "ALLOW",
    Name: "AllowInternalTraffic",
    Priority: 1,
    RuleAction: {
      Action: "ALLOW"
    },
    FirewallDomainListId: "internal-domain-list-id",
    BlockResponse: "NODATA"
  }]
});
```

## Multiple Rules with Different Actions

Create a FirewallRuleGroup with a mix of ALLOW and BLOCK actions to manage traffic effectively.

```ts
const mixedRulesFirewallRuleGroup = await AWS.Route53Resolver.FirewallRuleGroup("mixedRulesFirewallRuleGroup", {
  name: "MixedRulesFirewallRuleGroup",
  FirewallRules: [
    {
      Action: "BLOCK",
      Name: "BlockUnauthorizedAccess",
      Priority: 2,
      RuleAction: {
        Action: "BLOCK"
      },
      FirewallDomainListId: "unauthorized-domain-list-id",
      BlockResponse: "NXDOMAIN"
    },
    {
      Action: "ALLOW",
      Name: "AllowCorporateNetwork",
      Priority: 1,
      RuleAction: {
        Action: "ALLOW"
      },
      FirewallDomainListId: "corporate-domain-list-id",
      BlockResponse: "NODATA"
    }
  ]
});
```

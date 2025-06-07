---
title: Managing AWS Route53Resolver FirewallDomainLists with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver FirewallDomainLists using Alchemy Cloud Control.
---

# FirewallDomainList

The FirewallDomainList resource lets you create and manage [AWS Route53Resolver FirewallDomainLists](https://docs.aws.amazon.com/route53resolver/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const firewalldomainlist = await AWS.Route53Resolver.FirewallDomainList(
  "firewalldomainlist-example",
  { Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a firewalldomainlist with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFirewallDomainList = await AWS.Route53Resolver.FirewallDomainList(
  "advanced-firewalldomainlist",
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


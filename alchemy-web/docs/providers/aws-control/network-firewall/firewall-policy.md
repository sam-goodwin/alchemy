---
title: Managing AWS NetworkFirewall FirewallPolicys with Alchemy
description: Learn how to create, update, and manage AWS NetworkFirewall FirewallPolicys using Alchemy Cloud Control.
---

# FirewallPolicy

The FirewallPolicy resource lets you create and manage [AWS NetworkFirewall FirewallPolicys](https://docs.aws.amazon.com/networkfirewall/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkfirewall-firewallpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const firewallpolicy = await AWS.NetworkFirewall.FirewallPolicy("firewallpolicy-example", {
  FirewallPolicyName: "firewallpolicy-firewallpolicy",
  FirewallPolicy: "example-firewallpolicy",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A firewallpolicy resource managed by Alchemy",
});
```

## Advanced Configuration

Create a firewallpolicy with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFirewallPolicy = await AWS.NetworkFirewall.FirewallPolicy("advanced-firewallpolicy", {
  FirewallPolicyName: "firewallpolicy-firewallpolicy",
  FirewallPolicy: "example-firewallpolicy",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A firewallpolicy resource managed by Alchemy",
});
```


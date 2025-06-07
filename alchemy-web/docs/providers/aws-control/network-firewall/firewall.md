---
title: Managing AWS NetworkFirewall Firewalls with Alchemy
description: Learn how to create, update, and manage AWS NetworkFirewall Firewalls using Alchemy Cloud Control.
---

# Firewall

The Firewall resource lets you manage [AWS NetworkFirewall Firewalls](https://docs.aws.amazon.com/networkfirewall/latest/userguide/) and their configurations for enhanced security within your VPC.

## Minimal Example

Create a basic firewall with essential properties and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicFirewall = await AWS.NetworkFirewall.Firewall("BasicFirewall", {
  FirewallName: "MyFirewall",
  FirewallPolicyArn: "arn:aws:network-firewall:us-west-2:123456789012:firewall-policy/MyFirewallPolicy",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetMappings: [
    {
      SubnetId: "subnet-0abcd1234efgh5678"
    }
  ],
  Description: "Basic firewall for my VPC",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Advanced Configuration

Configure a firewall with advanced settings, including protection against changes to the firewall policy and subnet.

```ts
const AdvancedFirewall = await AWS.NetworkFirewall.Firewall("AdvancedFirewall", {
  FirewallName: "AdvancedFirewall",
  FirewallPolicyArn: "arn:aws:network-firewall:us-west-2:123456789012:firewall-policy/AdvancedFirewallPolicy",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetMappings: [
    {
      SubnetId: "subnet-0abcd1234efgh5678"
    },
    {
      SubnetId: "subnet-0ijkl9012mnop3456"
    }
  ],
  Description: "Advanced firewall with protection enabled",
  SubnetChangeProtection: true,
  DeleteProtection: true,
  FirewallPolicyChangeProtection: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Network" }
  ]
});
```

## Enhanced Analysis Configuration

Set up a firewall with enabled analysis types for better monitoring and security insights.

```ts
const AnalysisFirewall = await AWS.NetworkFirewall.Firewall("AnalysisFirewall", {
  FirewallName: "AnalysisFirewall",
  FirewallPolicyArn: "arn:aws:network-firewall:us-west-2:123456789012:firewall-policy/AnalysisFirewallPolicy",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetMappings: [
    {
      SubnetId: "subnet-0abcd1234efgh5678"
    }
  ],
  EnabledAnalysisTypes: [
    "FLOW_LOG", 
    "TLS_LOG"
  ],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Custom Firewall Policy Example

Utilize a custom firewall policy for enhanced control over traffic filtering.

```ts
const CustomPolicyFirewall = await AWS.NetworkFirewall.Firewall("CustomPolicyFirewall", {
  FirewallName: "CustomPolicyFirewall",
  FirewallPolicyArn: "arn:aws:network-firewall:us-west-2:123456789012:firewall-policy/CustomPolicy",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetMappings: [
    {
      SubnetId: "subnet-0abcd1234efgh5678"
    }
  ],
  Description: "Firewall using a custom policy",
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Team", Value: "QA" }
  ]
});
```
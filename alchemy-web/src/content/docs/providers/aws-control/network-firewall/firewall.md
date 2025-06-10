---
title: Firewall
description: Learn how to create, update, and manage AWS NetworkFirewall Firewalls using Alchemy Cloud Control.
---


The Firewall resource lets you manage [AWS NetworkFirewall Firewalls](https://docs.aws.amazon.com/networkfirewall/latest/userguide/) to protect your virtual networks from unwanted traffic. This resource allows you to define firewall policies, configure network settings, and set up various protection features.

## Minimal Example

Create a basic firewall with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicFirewall = await AWS.NetworkFirewall.Firewall("basicFirewall", {
  FirewallName: "BasicFirewall",
  FirewallPolicyArn: "arn:aws:network-firewall:us-west-2:123456789012:firewall-policy/MyFirewallPolicy",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetMappings: [
    {
      SubnetId: "subnet-0abcd1234efgh5678"
    }
  ],
  Description: "A basic firewall configuration",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a firewall with additional features such as protection settings and analysis types.

```ts
const advancedFirewall = await AWS.NetworkFirewall.Firewall("advancedFirewall", {
  FirewallName: "AdvancedFirewall",
  FirewallPolicyArn: "arn:aws:network-firewall:us-west-2:123456789012:firewall-policy/MyAdvancedFirewallPolicy",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetMappings: [
    {
      SubnetId: "subnet-0abcd1234efgh5678"
    }
  ],
  SubnetChangeProtection: true,
  DeleteProtection: true,
  FirewallPolicyChangeProtection: true,
  EnabledAnalysisTypes: ["FLOW", "TLS"],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Secure Firewall with Multiple Subnets

Create a firewall that spans multiple subnets for increased resilience.

```ts
const multiSubnetFirewall = await AWS.NetworkFirewall.Firewall("multiSubnetFirewall", {
  FirewallName: "MultiSubnetFirewall",
  FirewallPolicyArn: "arn:aws:network-firewall:us-west-2:123456789012:firewall-policy/MyMultiSubnetFirewallPolicy",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetMappings: [
    {
      SubnetId: "subnet-0abcd1234efgh5678"
    },
    {
      SubnetId: "subnet-0abcd9876ijkl4321"
    }
  ],
  Description: "A firewall with multiple subnets for high availability",
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    }
  ]
});
```

## Firewall with Custom Analysis Types

Set up a firewall with specific analysis types for in-depth traffic insights.

```ts
const customAnalysisFirewall = await AWS.NetworkFirewall.Firewall("customAnalysisFirewall", {
  FirewallName: "CustomAnalysisFirewall",
  FirewallPolicyArn: "arn:aws:network-firewall:us-west-2:123456789012:firewall-policy/MyCustomPolicy",
  VpcId: "vpc-0abcd1234efgh5678",
  SubnetMappings: [
    {
      SubnetId: "subnet-0abcd1234efgh5678"
    }
  ],
  EnabledAnalysisTypes: ["FLOW"],
  Tags: [
    {
      Key: "AnalysisType",
      Value: "TrafficFlow"
    }
  ]
});
```

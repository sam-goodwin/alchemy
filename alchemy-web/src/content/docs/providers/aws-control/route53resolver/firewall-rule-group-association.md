---
title: FirewallRuleGroupAssociation
description: Learn how to create, update, and manage AWS Route53Resolver FirewallRuleGroupAssociations using Alchemy Cloud Control.
---


The FirewallRuleGroupAssociation resource allows you to associate a Route 53 Resolver Firewall Rule Group with a specified VPC, enabling DNS filtering for your network. For more details, see the [AWS Route53Resolver FirewallRuleGroupAssociations documentation](https://docs.aws.amazon.com/route53resolver/latest/userguide/).

## Minimal Example

Create a basic Firewall Rule Group Association with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const firewallRuleGroupAssociation = await AWS.Route53Resolver.FirewallRuleGroupAssociation("basicAssociation", {
  VpcId: "vpc-123abc45",
  FirewallRuleGroupId: "rg-678def90",
  Priority: 1,
  MutationProtection: "DISABLED" // Optional
});
```

## Advanced Configuration

Configure a Firewall Rule Group Association with additional optional properties for better management.

```ts
const advancedAssociation = await AWS.Route53Resolver.FirewallRuleGroupAssociation("advancedAssociation", {
  VpcId: "vpc-123abc45",
  FirewallRuleGroupId: "rg-678def90",
  Priority: 10,
  MutationProtection: "ENABLED", // Optional
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "TeamA" }
  ],
  Name: "AdvancedFirewallAssociation" // Optional
});
```

## Adoption of Existing Resource

Adopt an existing Firewall Rule Group Association to manage it through your Alchemy configuration.

```ts
const existingAssociation = await AWS.Route53Resolver.FirewallRuleGroupAssociation("existingAssociation", {
  VpcId: "vpc-123abc45",
  FirewallRuleGroupId: "rg-678def90",
  Priority: 5,
  adopt: true // This indicates to adopt an existing resource
});
```

## Managing Multiple Associations

Create multiple Firewall Rule Group Associations for different VPCs or configurations.

```ts
const associationForVpc1 = await AWS.Route53Resolver.FirewallRuleGroupAssociation("associationVpc1", {
  VpcId: "vpc-111aaa22",
  FirewallRuleGroupId: "rg-222bbb33",
  Priority: 1
});

const associationForVpc2 = await AWS.Route53Resolver.FirewallRuleGroupAssociation("associationVpc2", {
  VpcId: "vpc-333ccc44",
  FirewallRuleGroupId: "rg-444ddd55",
  Priority: 2,
  Tags: [{ Key: "Project", Value: "Alpha" }]
});
```

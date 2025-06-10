---
title: ResolverRuleAssociation
description: Learn how to create, update, and manage AWS Route53Resolver ResolverRuleAssociations using Alchemy Cloud Control.
---


The ResolverRuleAssociation resource allows you to associate a Resolver Rule with a VPC in AWS Route 53 Resolver. This enables you to route DNS queries according to the specified Resolver Rule. For more details, refer to the [AWS Route53Resolver ResolverRuleAssociations documentation](https://docs.aws.amazon.com/route53resolver/latest/userguide/).

## Minimal Example

Create a basic ResolverRuleAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const resolverRuleAssociation = await AWS.Route53Resolver.ResolverRuleAssociation("basicAssociation", {
  VPCId: "vpc-0abcd1234efgh5678",
  ResolverRuleId: "rslvr-rr-1234567890abcdef",
  Name: "PrimaryAssociation" // Optional: A name for the association
});
```

## Advanced Configuration

Configure a ResolverRuleAssociation with adoption behavior for existing resources.

```ts
const adoptedAssociation = await AWS.Route53Resolver.ResolverRuleAssociation("adoptedAssociation", {
  VPCId: "vpc-0abcd1234efgh5678",
  ResolverRuleId: "rslvr-rr-abcdef1234567890",
  Name: "AdoptedAssociation", // Optional: A name for the association
  adopt: true // Optional: Indicates to adopt an existing resource
});
```

## Use Case: Multiple Associations

Demonstrate creating multiple ResolverRuleAssociations for different VPCs.

```ts
const firstAssociation = await AWS.Route53Resolver.ResolverRuleAssociation("firstAssociation", {
  VPCId: "vpc-0abcd1234efgh5678",
  ResolverRuleId: "rslvr-rr-1234567890abcdef",
  Name: "FirstAssociation"
});

const secondAssociation = await AWS.Route53Resolver.ResolverRuleAssociation("secondAssociation", {
  VPCId: "vpc-1abcd1234efgh5678",
  ResolverRuleId: "rslvr-rr-abcdef1234567890",
  Name: "SecondAssociation"
});
```

## Use Case: Updating an Association

Show how to update an existing ResolverRuleAssociation's name.

```ts
const updatedAssociation = await AWS.Route53Resolver.ResolverRuleAssociation("updateAssociation", {
  VPCId: "vpc-0abcd1234efgh5678",
  ResolverRuleId: "rslvr-rr-1234567890abcdef",
  Name: "UpdatedAssociation" // Changing the name of the existing association
});
```

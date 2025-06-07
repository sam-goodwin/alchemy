---
title: Managing AWS VpcLattice ServiceNetworkResourceAssociations with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice ServiceNetworkResourceAssociations using Alchemy Cloud Control.
---

# ServiceNetworkResourceAssociation

The ServiceNetworkResourceAssociation resource allows you to manage the associations between a service network and its resources in AWS VpcLattice. For more information, refer to the [AWS VpcLattice ServiceNetworkResourceAssociations documentation](https://docs.aws.amazon.com/vpclattice/latest/userguide/).

## Minimal Example

Create a basic ServiceNetworkResourceAssociation with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicAssociation = await AWS.VpcLattice.ServiceNetworkResourceAssociation("BasicAssociation", {
  ResourceConfigurationId: "resource-config-123",
  ServiceNetworkId: "service-network-abc",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a ServiceNetworkResourceAssociation with additional properties, such as adopting existing resources.

```ts
const AdvancedAssociation = await AWS.VpcLattice.ServiceNetworkResourceAssociation("AdvancedAssociation", {
  ResourceConfigurationId: "resource-config-456",
  ServiceNetworkId: "service-network-def",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Development" }
  ],
  adopt: true
});
```

## Adoption of Existing Resources

This example demonstrates how to adopt an existing resource instead of failing when the resource already exists.

```ts
const ExistingResourceAssociation = await AWS.VpcLattice.ServiceNetworkResourceAssociation("ExistingResourceAssociation", {
  ResourceConfigurationId: "existing-resource-789",
  ServiceNetworkId: "service-network-ghi",
  adopt: true
});
```

## Resource Details and Metadata

Create a ServiceNetworkResourceAssociation and retrieve its metadata, including ARN and timestamps.

```ts
const MetadataAssociation = await AWS.VpcLattice.ServiceNetworkResourceAssociation("MetadataAssociation", {
  ResourceConfigurationId: "resource-config-012",
  ServiceNetworkId: "service-network-jkl"
});

// Accessing resource metadata
const resourceArn = MetadataAssociation.Arn;
const creationTime = MetadataAssociation.CreationTime;
const lastUpdateTime = MetadataAssociation.LastUpdateTime;

console.log(`Resource ARN: ${resourceArn}`);
console.log(`Created at: ${creationTime}`);
console.log(`Last updated at: ${lastUpdateTime}`);
```
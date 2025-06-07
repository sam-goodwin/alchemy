---
title: Managing AWS VpcLattice ServiceNetworkVpcAssociations with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice ServiceNetworkVpcAssociations using Alchemy Cloud Control.
---

# ServiceNetworkVpcAssociation

The ServiceNetworkVpcAssociation resource allows you to associate a VPC with a service network in AWS VpcLattice, enabling seamless connectivity between your services across different VPCs. For more detailed information, refer to the [AWS VpcLattice ServiceNetworkVpcAssociations documentation](https://docs.aws.amazon.com/vpclattice/latest/userguide/).

## Minimal Example

Create a basic ServiceNetworkVpcAssociation with required properties and one optional tag:

```ts
import AWS from "alchemy/aws/control";

const minimalAssociation = await AWS.VpcLattice.ServiceNetworkVpcAssociation("MinimalAssociation", {
  ServiceNetworkIdentifier: "sn-12345678",
  VpcIdentifier: "vpc-12345678",
  Tags: [{ Key: "Environment", Value: "staging" }]
});
```

## Advanced Configuration

Configure a ServiceNetworkVpcAssociation with security group IDs and multiple tags for better organization:

```ts
const advancedAssociation = await AWS.VpcLattice.ServiceNetworkVpcAssociation("AdvancedAssociation", {
  ServiceNetworkIdentifier: "sn-87654321",
  VpcIdentifier: "vpc-87654321",
  SecurityGroupIds: ["sg-12345678", "sg-87654321"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Network" }
  ]
});
```

## Adopt Existing Resource

If you want to adopt an existing resource instead of creating a new one, you can set the `adopt` property to true:

```ts
const adoptedAssociation = await AWS.VpcLattice.ServiceNetworkVpcAssociation("AdoptedAssociation", {
  ServiceNetworkIdentifier: "sn-existing",
  VpcIdentifier: "vpc-existing",
  adopt: true
});
```

## Associating Multiple Security Groups

You can associate multiple security groups with the ServiceNetworkVpcAssociation:

```ts
const multiSecurityGroupAssociation = await AWS.VpcLattice.ServiceNetworkVpcAssociation("MultiSecurityGroupAssociation", {
  ServiceNetworkIdentifier: "sn-multi-sg",
  VpcIdentifier: "vpc-multi-sg",
  SecurityGroupIds: ["sg-abcdef12", "sg-ghijkl34", "sg-mnopqr56"],
  Tags: [{ Key: "Environment", Value: "testing" }]
});
```
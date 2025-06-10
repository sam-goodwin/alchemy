---
title: SecurityGroupVpcAssociation
description: Learn how to create, update, and manage AWS EC2 SecurityGroupVpcAssociations using Alchemy Cloud Control.
---


The SecurityGroupVpcAssociation resource allows you to associate a security group with a VPC (Virtual Private Cloud) in AWS. This is essential for configuring network security settings for your EC2 instances. For more information, refer to the [AWS EC2 SecurityGroupVpcAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic SecurityGroupVpcAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const securityGroupVpcAssociation = await AWS.EC2.SecurityGroupVpcAssociation("myVpcAssociation", {
  VpcId: "vpc-12345678",
  GroupId: "sg-87654321",
  adopt: true // Adopt the existing security group if it already exists
});
```

## Advanced Configuration

Configure a SecurityGroupVpcAssociation with additional properties like adoption.

```ts
const advancedVpcAssociation = await AWS.EC2.SecurityGroupVpcAssociation("advancedVpcAssociation", {
  VpcId: "vpc-87654321",
  GroupId: "sg-12345678",
  adopt: true // This will adopt the existing resource if it exists
});
```

## Multiple Associations

Demonstrate how to create multiple security group associations for different VPCs.

```ts
const firstVpcAssociation = await AWS.EC2.SecurityGroupVpcAssociation("firstVpcAssociation", {
  VpcId: "vpc-11111111",
  GroupId: "sg-22222222",
  adopt: false
});

const secondVpcAssociation = await AWS.EC2.SecurityGroupVpcAssociation("secondVpcAssociation", {
  VpcId: "vpc-33333333",
  GroupId: "sg-44444444",
  adopt: false
});
```

## Dynamic Updates

Show how to update an existing SecurityGroupVpcAssociation by changing its VPC.

```ts
const updatedVpcAssociation = await AWS.EC2.SecurityGroupVpcAssociation("updatedVpcAssociation", {
  VpcId: "vpc-55555555", // New VPC ID
  GroupId: "sg-22222222",
  adopt: true // This will adopt if the resource exists
});
```

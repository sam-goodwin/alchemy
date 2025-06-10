---
title: SubnetNetworkAclAssociation
description: Learn how to create, update, and manage AWS EC2 SubnetNetworkAclAssociations using Alchemy Cloud Control.
---


The SubnetNetworkAclAssociation resource allows you to manage associations between a subnet and a network ACL in AWS EC2. This enables you to control inbound and outbound traffic for the associated subnet. For more detailed information, you can refer to the [AWS EC2 SubnetNetworkAclAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic association between a subnet and a network ACL with required properties.

```ts
import AWS from "alchemy/aws/control";

const subnetNetworkAclAssociation = await AWS.EC2.SubnetNetworkAclAssociation("subnetAclAssociation", {
  NetworkAclId: "acl-12345678",
  SubnetId: "subnet-87654321"
});
```

## Advanced Configuration

You can also adopt an existing resource instead of failing if it already exists, which can be useful in specific scenarios.

```ts
const existingSubnetNetworkAclAssociation = await AWS.EC2.SubnetNetworkAclAssociation("existingSubnetAclAssociation", {
  NetworkAclId: "acl-12345678",
  SubnetId: "subnet-87654321",
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Additional Properties

In this example, we demonstrate how to access additional properties like `Arn`, `CreationTime`, and `LastUpdateTime` after creating the association.

```ts
const detailedSubnetNetworkAclAssociation = await AWS.EC2.SubnetNetworkAclAssociation("detailedSubnetAclAssociation", {
  NetworkAclId: "acl-12345678",
  SubnetId: "subnet-87654321"
});

// Accessing additional properties
console.log(`ARN: ${detailedSubnetNetworkAclAssociation.Arn}`);
console.log(`Created At: ${detailedSubnetNetworkAclAssociation.CreationTime}`);
console.log(`Last Updated At: ${detailedSubnetNetworkAclAssociation.LastUpdateTime}`);
```

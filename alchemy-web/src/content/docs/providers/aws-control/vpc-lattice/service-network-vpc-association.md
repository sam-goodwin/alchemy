---
title: ServiceNetworkVpcAssociation
description: Learn how to create, update, and manage AWS VpcLattice ServiceNetworkVpcAssociations using Alchemy Cloud Control.
---


The ServiceNetworkVpcAssociation resource lets you manage associations between Amazon VPCs and service networks in AWS VpcLattice. This resource allows you to enable communication between your VPCs and services defined in a service network. For more details, refer to the [AWS VpcLattice ServiceNetworkVpcAssociations documentation](https://docs.aws.amazon.com/vpclattice/latest/userguide/).

## Minimal Example

Create a basic ServiceNetworkVpcAssociation with the required properties:

```ts
import AWS from "alchemy/aws/control";

const serviceNetworkVpcAssociation = await AWS.VpcLattice.ServiceNetworkVpcAssociation("myVpcAssociation", {
  ServiceNetworkIdentifier: "sn-1234567890abcdef0",
  VpcIdentifier: "vpc-0ab12345cdef67890",
  SecurityGroupIds: ["sg-0123456789abcdef0"]
});
```

## Advanced Configuration

Configure a ServiceNetworkVpcAssociation with additional tags for better resource management:

```ts
const advancedVpcAssociation = await AWS.VpcLattice.ServiceNetworkVpcAssociation("advancedVpcAssociation", {
  ServiceNetworkIdentifier: "sn-0987654321fedcba0",
  VpcIdentifier: "vpc-0ab12345cdef67890",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "ProjectX" }
  ]
});
```

## Adopting an Existing Association

Use the adopt option to manage an existing service network VPC association without failing if it already exists:

```ts
const adoptVpcAssociation = await AWS.VpcLattice.ServiceNetworkVpcAssociation("adoptExistingVpcAssociation", {
  ServiceNetworkIdentifier: "sn-11223344556677889",
  VpcIdentifier: "vpc-0ab12345cdef67890",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  adopt: true
});
```

## Including Multiple Security Groups

Create a ServiceNetworkVpcAssociation with multiple security groups for enhanced security:

```ts
const multiSecurityGroupVpcAssociation = await AWS.VpcLattice.ServiceNetworkVpcAssociation("multiSecurityGroupVpcAssociation", {
  ServiceNetworkIdentifier: "sn-22334455667788990",
  VpcIdentifier: "vpc-0ab12345cdef67890",
  SecurityGroupIds: [
    "sg-0123456789abcdef0",
    "sg-abcdef01234567890"
  ]
});
```

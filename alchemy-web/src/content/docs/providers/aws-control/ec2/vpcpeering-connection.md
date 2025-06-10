---
title: VPCPeeringConnection
description: Learn how to create, update, and manage AWS EC2 VPCPeeringConnections using Alchemy Cloud Control.
---


The VPCPeeringConnection resource allows you to create and manage [AWS EC2 VPC Peering Connections](https://docs.aws.amazon.com/ec2/latest/userguide/) which enable networking between two VPCs, allowing instances in either VPC to communicate with each other as if they were within the same network.

## Minimal Example

Create a basic VPC Peering Connection between two VPCs with minimal required properties.

```ts
import AWS from "alchemy/aws/control";

const vpcPeeringConnection = await AWS.EC2.VPCPeeringConnection("myVpcPeeringConnection", {
  VpcId: "vpc-12345678",
  PeerVpcId: "vpc-87654321",
  PeerRoleArn: "arn:aws:iam::123456789012:role/PeeringRole"
});
```

## Advanced Configuration

Configure a VPC Peering Connection with additional properties such as region and owner ID for more control over the peering connection.

```ts
const advancedVpcPeeringConnection = await AWS.EC2.VPCPeeringConnection("advancedVpcPeeringConnection", {
  VpcId: "vpc-12345678",
  PeerVpcId: "vpc-87654321",
  PeerRegion: "us-west-2",
  PeerOwnerId: "123456789012",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "VPCConnectivity" }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing VPC Peering Connection instead of creating a new one, you can set the `adopt` property to true.

```ts
const adoptedVpcPeeringConnection = await AWS.EC2.VPCPeeringConnection("adoptedVpcPeeringConnection", {
  VpcId: "vpc-12345678",
  PeerVpcId: "vpc-87654321",
  adopt: true
});
```

## Tags for Resource Management

Utilize tags for better resource management and cost allocation in your AWS environment.

```ts
const taggedVpcPeeringConnection = await AWS.EC2.VPCPeeringConnection("taggedVpcPeeringConnection", {
  VpcId: "vpc-12345678",
  PeerVpcId: "vpc-87654321",
  Tags: [
    { Key: "Department", Value: "Engineering" },
    { Key: "CostCenter", Value: "CC1001" }
  ]
});
```

---
title: Managing AWS EC2 VPCPeeringConnections with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCPeeringConnections using Alchemy Cloud Control.
---

# VPCPeeringConnection

The VPCPeeringConnection resource allows you to create and manage [AWS EC2 VPC Peering Connections](https://docs.aws.amazon.com/ec2/latest/userguide/) between two Virtual Private Clouds (VPCs). This enables networking capabilities across different VPCs, facilitating resource communication.

## Minimal Example

Create a basic VPC Peering Connection with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const PeeringConnection = await AWS.EC2.VPCPeeringConnection("MyVPCPeeringConnection", {
  VpcId: "vpc-12345678",
  PeerVpcId: "vpc-87654321",
  PeerRoleArn: "arn:aws:iam::123456789012:role/MyPeeringRole"
});
```

## Advanced Configuration

Configure a VPC Peering Connection with additional parameters such as tags and region.

```ts
const AdvancedPeeringConnection = await AWS.EC2.VPCPeeringConnection("AdvancedVPCPeeringConnection", {
  VpcId: "vpc-12345678",
  PeerVpcId: "vpc-87654321",
  PeerRoleArn: "arn:aws:iam::123456789012:role/MyPeeringRole",
  PeerRegion: "us-west-2",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Network" }
  ]
});
```

## Using Existing VPC Peering Connection

Adopt an existing VPC Peering Connection instead of creating a new one.

```ts
const ExistingPeeringConnection = await AWS.EC2.VPCPeeringConnection("AdoptExistingVPCPeeringConnection", {
  VpcId: "vpc-12345678",
  PeerVpcId: "vpc-87654321",
  adopt: true
});
```

## Monitoring Connection Status

Retrieve the status of a VPC Peering Connection, including creation and last update time.

```ts
const PeeringConnectionDetails = await AWS.EC2.VPCPeeringConnection("GetPeeringConnectionDetails", {
  VpcId: "vpc-12345678",
  PeerVpcId: "vpc-87654321"
});

// Log the connection details
console.log(`Peering Connection ARN: ${PeeringConnectionDetails.Arn}`);
console.log(`Created At: ${PeeringConnectionDetails.CreationTime}`);
console.log(`Last Updated At: ${PeeringConnectionDetails.LastUpdateTime}`);
```
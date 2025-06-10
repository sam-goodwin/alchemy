---
title: TransitGatewayPeering
description: Learn how to create, update, and manage AWS NetworkManager TransitGatewayPeerings using Alchemy Cloud Control.
---


The TransitGatewayPeering resource allows you to manage [AWS NetworkManager TransitGatewayPeerings](https://docs.aws.amazon.com/networkmanager/latest/userguide/) for connecting transit gateways across different AWS accounts and regions.

## Minimal Example

Create a basic Transit Gateway Peering with required properties and one optional tag:

```ts
import AWS from "alchemy/aws/control";

const transitGatewayPeering = await AWS.NetworkManager.TransitGatewayPeering("myTransitGatewayPeering", {
  CoreNetworkId: "core-network-12345678",
  TransitGatewayArn: "arn:aws:ec2:us-west-2:123456789012:transit-gateway/tgw-0abc1234567890def",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a Transit Gateway Peering with additional properties, including an adopt flag to handle existing resources:

```ts
const advancedTransitGatewayPeering = await AWS.NetworkManager.TransitGatewayPeering("advancedTransitGatewayPeering", {
  CoreNetworkId: "core-network-87654321",
  TransitGatewayArn: "arn:aws:ec2:us-east-1:123456789012:transit-gateway/tgw-0fedcba9876543210",
  Tags: [
    {
      Key: "Project",
      Value: "Migration"
    }
  ],
  adopt: true // Adopt existing resource if it exists
});
```

## Handling Multiple Peerings

Create multiple peering connections to manage different transit gateways simultaneously:

```ts
const peeringConnection1 = await AWS.NetworkManager.TransitGatewayPeering("peeringConnection1", {
  CoreNetworkId: "core-network-11223344",
  TransitGatewayArn: "arn:aws:ec2:us-west-1:123456789012:transit-gateway/tgw-0abcdef1234567890"
});

const peeringConnection2 = await AWS.NetworkManager.TransitGatewayPeering("peeringConnection2", {
  CoreNetworkId: "core-network-22334455",
  TransitGatewayArn: "arn:aws:ec2:us-west-1:123456789012:transit-gateway/tgw-0fedcba9876543210",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

These examples demonstrate how to create and manage AWS NetworkManager TransitGatewayPeerings effectively using the Alchemy framework.

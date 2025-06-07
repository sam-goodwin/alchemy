---
title: Managing AWS NetworkManager TransitGatewayPeerings with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager TransitGatewayPeerings using Alchemy Cloud Control.
---

# TransitGatewayPeering

The TransitGatewayPeering resource lets you manage [AWS NetworkManager TransitGatewayPeerings](https://docs.aws.amazon.com/networkmanager/latest/userguide/) for connecting multiple transit gateways across different regions or accounts.

## Minimal Example

Create a basic transit gateway peering connection with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const TransitGatewayPeering = await AWS.NetworkManager.TransitGatewayPeering("MyTransitGatewayPeering", {
  CoreNetworkId: "core-network-12345678",
  TransitGatewayArn: "arn:aws:ec2:us-west-2:123456789012:transit-gateway/tgw-12345678",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

Configure a transit gateway peering with additional tags and the adoption property.

```ts
const AdvancedTransitGatewayPeering = await AWS.NetworkManager.TransitGatewayPeering("AdvancedTransitGatewayPeering", {
  CoreNetworkId: "core-network-87654321",
  TransitGatewayArn: "arn:aws:ec2:us-east-1:123456789012:transit-gateway/tgw-87654321",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Networking" }
  ],
  adopt: true
});
```

## Use Case: Cross-Region Peering

Establish a peering connection between transit gateways located in different AWS regions.

```ts
const CrossRegionTransitGatewayPeering = await AWS.NetworkManager.TransitGatewayPeering("CrossRegionPeering", {
  CoreNetworkId: "core-network-11223344",
  TransitGatewayArn: "arn:aws:ec2:us-west-1:123456789012:transit-gateway/tgw-11223344",
  Tags: [
    { Key: "Project", Value: "GlobalExpansion" }
  ],
  adopt: false
});
```

## Use Case: Multi-Account Peering

Set up a peering connection for transit gateways across multiple AWS accounts.

```ts
const MultiAccountTransitGatewayPeering = await AWS.NetworkManager.TransitGatewayPeering("MultiAccountPeering", {
  CoreNetworkId: "core-network-99887766",
  TransitGatewayArn: "arn:aws:ec2:us-east-2:123456789012:transit-gateway/tgw-99887766",
  Tags: [
    { Key: "Department", Value: "Engineering" },
    { Key: "CostCenter", Value: "12345" }
  ],
  adopt: true
});
```
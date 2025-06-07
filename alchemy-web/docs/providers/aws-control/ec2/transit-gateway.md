---
title: Managing AWS EC2 TransitGateways with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGateways using Alchemy Cloud Control.
---

# TransitGateway

The TransitGateway resource allows you to create and manage [AWS EC2 TransitGateways](https://docs.aws.amazon.com/ec2/latest/userguide/), which provide a central hub for connecting multiple VPCs and on-premises networks. This simplifies your network architecture and reduces the complexity that comes with managing multiple individual connections.

## Minimal Example

Create a basic TransitGateway with a description and default settings.

```ts
import AWS from "alchemy/aws/control";

const BasicTransitGateway = await AWS.EC2.TransitGateway("BasicTransitGateway", {
  Description: "Main transit gateway for connecting VPCs",
  AutoAcceptSharedAttachments: "enable", // Automatically accept attachments from shared VPCs
  DnsSupport: "enable", // Enable DNS support for the transit gateway
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Advanced Configuration

Configure a TransitGateway with advanced settings for optimal performance and routing.

```ts
const AdvancedTransitGateway = await AWS.EC2.TransitGateway("AdvancedTransitGateway", {
  Description: "Advanced transit gateway with custom settings",
  AssociationDefaultRouteTableId: "rtb-0123456789abcdef0", // Custom default route table ID
  PropagationDefaultRouteTableId: "rtb-abcdef0123456789", // Custom propagation route table ID
  TransitGatewayCidrBlocks: ["192.168.0.0/16"], // CIDR block for the transit gateway
  VpnEcmpSupport: "enable", // Enable Equal Cost Multi-Path (ECMP) support for VPN
  MulticastSupport: "enable", // Enable multicast support
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Infrastructure" }
  ]
});
```

## Custom Routing Configuration

Set up a TransitGateway with specific routing and DNS configurations.

```ts
const CustomRoutingTransitGateway = await AWS.EC2.TransitGateway("CustomRoutingTransitGateway", {
  Description: "Transit gateway with custom routing configurations",
  DefaultRouteTableAssociation: "enable", // Enable default route table association
  DefaultRouteTablePropagation: "enable", // Enable default route table propagation
  AmazonSideAsn: 64512, // Set Amazon ASN for the transit gateway
  SecurityGroupReferencingSupport: "enable", // Enable security group referencing
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```
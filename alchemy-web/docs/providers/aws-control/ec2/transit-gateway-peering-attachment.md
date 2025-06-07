---
title: Managing AWS EC2 TransitGatewayPeeringAttachments with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayPeeringAttachments using Alchemy Cloud Control.
---

# TransitGatewayPeeringAttachment

The TransitGatewayPeeringAttachment resource allows you to create and manage peering attachments between AWS Transit Gateways, enabling connectivity between different VPCs or on-premises networks. For more information, visit the [AWS EC2 TransitGatewayPeeringAttachments documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic Transit Gateway Peering Attachment with the required properties.

```ts
import AWS from "alchemy/aws/control";

const PeeringAttachment = await AWS.EC2.TransitGatewayPeeringAttachment("MyPeeringAttachment", {
  TransitGatewayId: "tgw-0123456789abcdef0",
  PeerTransitGatewayId: "tgw-0fedcba9876543210",
  PeerAccountId: "123456789012",
  PeerRegion: "us-west-2",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Advanced Configuration

In this example, we add an optional `adopt` property to allow the resource to adopt an existing Transit Gateway Peering Attachment if it already exists.

```ts
const AdvancedPeeringAttachment = await AWS.EC2.TransitGatewayPeeringAttachment("AdvancedPeeringAttachment", {
  TransitGatewayId: "tgw-0123456789abcdef0",
  PeerTransitGatewayId: "tgw-0fedcba9876543210",
  PeerAccountId: "123456789012",
  PeerRegion: "us-west-2",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ],
  adopt: true
});
```

## Specific Use Case: Cross-Region Peering

This example demonstrates how to establish a peering attachment for a Transit Gateway located in a different region.

```ts
const CrossRegionPeeringAttachment = await AWS.EC2.TransitGatewayPeeringAttachment("CrossRegionPeeringAttachment", {
  TransitGatewayId: "tgw-0123456789abcdef0",
  PeerTransitGatewayId: "tgw-0fedcba9876543210",
  PeerAccountId: "123456789012",
  PeerRegion: "eu-central-1",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "GlobalNetworking" }
  ]
});
```
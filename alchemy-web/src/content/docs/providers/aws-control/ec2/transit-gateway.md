---
title: TransitGateway
description: Learn how to create, update, and manage AWS EC2 TransitGateways using Alchemy Cloud Control.
---


The TransitGateway resource lets you manage [AWS EC2 TransitGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) that enable customers to connect multiple VPCs and on-premises networks through a single gateway.

## Minimal Example

Create a basic Transit Gateway with a description and default route table settings.

```ts
import AWS from "alchemy/aws/control";

const transitGateway = await AWS.EC2.TransitGateway("myTransitGateway", {
  Description: "Primary Transit Gateway for connecting VPCs",
  AssociationDefaultRouteTableId: "default-route-table-id",
  Tags: [
    {
      Key: "Name",
      Value: "MyTransitGateway"
    }
  ]
});
```

## Advanced Configuration

Configure a Transit Gateway with enhanced settings such as DNS support and multicast support.

```ts
const advancedTransitGateway = await AWS.EC2.TransitGateway("advancedTransitGateway", {
  Description: "Advanced Transit Gateway with enhanced features",
  DnsSupport: "enable",
  MulticastSupport: "enable",
  AmazonSideAsn: 64512,
  TransitGatewayCidrBlocks: ["10.0.0.0/16"],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Using Auto Accept for Shared Attachments

Set up a Transit Gateway that automatically accepts shared attachments from other accounts.

```ts
const sharedTransitGateway = await AWS.EC2.TransitGateway("sharedTransitGateway", {
  Description: "Transit Gateway with auto-accept for shared attachments",
  AutoAcceptSharedAttachments: "enable",
  AssociationDefaultRouteTableId: "default-route-table-id",
  Tags: [
    {
      Key: "UseCase",
      Value: "Multi-Account Setup"
    }
  ]
});
```

## Configuring ECMP Support

Create a Transit Gateway that supports Equal-Cost Multi-Path (ECMP) routing for VPN connections.

```ts
const ecmpTransitGateway = await AWS.EC2.TransitGateway("ecmpTransitGateway", {
  Description: "Transit Gateway with ECMP support for VPN",
  VpnEcmpSupport: "enable",
  TransitGatewayCidrBlocks: ["192.168.0.0/16"],
  Tags: [
    {
      Key: "Type",
      Value: "VPN"
    }
  ]
});
```

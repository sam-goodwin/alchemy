---
title: TransitGatewayPeeringAttachment
description: Learn how to create, update, and manage AWS EC2 TransitGatewayPeeringAttachments using Alchemy Cloud Control.
---


The TransitGatewayPeeringAttachment resource lets you manage [AWS EC2 Transit Gateway Peering Attachments](https://docs.aws.amazon.com/ec2/latest/userguide/). This resource facilitates the connection between two transit gateways, allowing for the exchange of traffic between their respective networks.

## Minimal Example

Create a basic Transit Gateway Peering Attachment with required properties and some optional tags.

```ts
import AWS from "alchemy/aws/control";

const peeringAttachment = await AWS.EC2.TransitGatewayPeeringAttachment("myPeeringAttachment", {
  TransitGatewayId: "tgw-0123456789abcdef0",
  PeerTransitGatewayId: "tgw-0123456789abcdef1",
  PeerAccountId: "123456789012",
  PeerRegion: "us-west-2",
  Tags: [
    {
      Key: "Name",
      Value: "MyTransitGatewayPeering"
    }
  ]
});
```

## Advanced Configuration

Configure the peering attachment with the option to adopt an existing resource.

```ts
const advancedPeeringAttachment = await AWS.EC2.TransitGatewayPeeringAttachment("advancedPeeringAttachment", {
  TransitGatewayId: "tgw-0123456789abcdef0",
  PeerTransitGatewayId: "tgw-0123456789abcdef1",
  PeerAccountId: "123456789012",
  PeerRegion: "us-west-2",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ],
  adopt: true // Adopt existing resource instead of failing if it exists
});
```

## Distinct Use Case: Cross-Region Connectivity

Establish a peering attachment between transit gateways in different AWS regions.

```ts
const crossRegionPeeringAttachment = await AWS.EC2.TransitGatewayPeeringAttachment("crossRegionPeering", {
  TransitGatewayId: "tgw-0123456789abcdef0",
  PeerTransitGatewayId: "tgw-0123456789abcdef1",
  PeerAccountId: "123456789012",
  PeerRegion: "eu-central-1",
  Tags: [
    {
      Key: "Name",
      Value: "CrossRegionPeering"
    }
  ]
});
```

---
title: Managing AWS EC2 TransitGatewayMulticastDomains with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayMulticastDomains using Alchemy Cloud Control.
---

# TransitGatewayMulticastDomain

The TransitGatewayMulticastDomain resource allows you to manage [AWS EC2 Transit Gateway Multicast Domains](https://docs.aws.amazon.com/ec2/latest/userguide/). This resource facilitates the creation and management of multicast domains for routing traffic between multiple sources and destinations within a transit gateway.

## Minimal Example

Create a basic Transit Gateway Multicast Domain with a specified Transit Gateway ID.

```ts
import AWS from "alchemy/aws/control";

const MulticastDomain = await AWS.EC2.TransitGatewayMulticastDomain("BasicMulticastDomain", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  Options: {
    Ipv6Support: "enable"
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "NetworkTeam" }
  ]
});
```

## Advanced Configuration

Configure a Transit Gateway Multicast Domain with additional options, including enabling IPv6 support and custom tags.

```ts
const AdvancedMulticastDomain = await AWS.EC2.TransitGatewayMulticastDomain("AdvancedMulticastDomain", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  Options: {
    Ipv6Support: "enable"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "VideoStreaming" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing Transit Gateway Multicast Domain instead of creating a new one if it already exists.

```ts
const ExistingMulticastDomain = await AWS.EC2.TransitGatewayMulticastDomain("ExistingMulticastDomain", {
  TransitGatewayId: "tgw-0abcd1234efgh5678",
  Options: {
    Ipv6Support: "disable"
  },
  adopt: true
});
```
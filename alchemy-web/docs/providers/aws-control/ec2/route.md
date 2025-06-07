---
title: Managing AWS EC2 Routes with Alchemy
description: Learn how to create, update, and manage AWS EC2 Routes using Alchemy Cloud Control.
---

# Route

The Route resource lets you manage [AWS EC2 Routes](https://docs.aws.amazon.com/ec2/latest/userguide/) for directing traffic within your VPC network.

## Minimal Example

Create a basic route directing traffic to an internet gateway.

```ts
import AWS from "alchemy/aws/control";

const basicRoute = await AWS.EC2.Route("BasicRoute", {
  RouteTableId: "rtb-0abcde1234567890",
  DestinationCidrBlock: "0.0.0.0/0",
  GatewayId: "igw-0abcde1234567890"
});
```

## Advanced Configuration

Configure a route with an egress-only internet gateway for IPv6 traffic.

```ts
const advancedRoute = await AWS.EC2.Route("AdvancedRoute", {
  RouteTableId: "rtb-0abcde1234567890",
  DestinationIpv6CidrBlock: "::/0",
  EgressOnlyInternetGatewayId: "eigw-0abcde1234567890"
});
```

## Route to a NAT Gateway

Set up a route directing traffic to a NAT gateway for private subnet access.

```ts
const natRoute = await AWS.EC2.Route("NATRoute", {
  RouteTableId: "rtb-0abcde1234567890",
  DestinationCidrBlock: "10.0.1.0/24",
  NatGatewayId: "nat-0abcde1234567890"
});
```

## Route with VPC Peering Connection

Create a route that directs traffic to a VPC peering connection.

```ts
const vpcPeeringRoute = await AWS.EC2.Route("VpcPeeringRoute", {
  RouteTableId: "rtb-0abcde1234567890",
  DestinationCidrBlock: "10.1.0.0/16",
  VpcPeeringConnectionId: "pcx-0abcde1234567890"
});
```

## Route with Transit Gateway

Set up a route that directs traffic to a transit gateway for centralized routing.

```ts
const transitGatewayRoute = await AWS.EC2.Route("TransitGatewayRoute", {
  RouteTableId: "rtb-0abcde1234567890",
  DestinationCidrBlock: "10.2.0.0/16",
  TransitGatewayId: "tgw-0abcde1234567890"
});
```
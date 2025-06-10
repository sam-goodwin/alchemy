---
title: Route
description: Learn how to create, update, and manage AWS EC2 Routes using Alchemy Cloud Control.
---


The Route resource allows you to manage [AWS EC2 Routes](https://docs.aws.amazon.com/ec2/latest/userguide/) for directing network traffic within your Amazon Virtual Private Cloud (VPC).

## Minimal Example

Create a basic route that directs traffic for a specific CIDR block to a virtual private gateway.

```ts
import AWS from "alchemy/aws/control";

const basicRoute = await AWS.EC2.Route("basicRoute", {
  RouteTableId: "rtb-0a1b2c3d4e5f6g7h",
  DestinationCidrBlock: "10.0.0.0/16",
  GatewayId: "vgw-0a1b2c3d4e5f6g7h"
});
```

## Advanced Configuration

Configure a route that directs IPv6 traffic to a local gateway.

```ts
const ipv6Route = await AWS.EC2.Route("ipv6Route", {
  RouteTableId: "rtb-0a1b2c3d4e5f6g7h",
  DestinationIpv6CidrBlock: "2001:0db8:1234:5678::/64",
  LocalGatewayId: "lgw-0a1b2c3d4e5f6g7h"
});
```

## Route to NAT Gateway

Create a route that directs traffic through a NAT gateway for internet access from private subnets.

```ts
const natRoute = await AWS.EC2.Route("natRoute", {
  RouteTableId: "rtb-0a1b2c3d4e5f6g7h",
  DestinationCidrBlock: "0.0.0.0/0",
  NatGatewayId: "nat-0a1b2c3d4e5f6g7h"
});
```

## Route to Transit Gateway

Set up a route that directs traffic through a transit gateway.

```ts
const transitGatewayRoute = await AWS.EC2.Route("transitGatewayRoute", {
  RouteTableId: "rtb-0a1b2c3d4e5f6g7h",
  DestinationCidrBlock: "10.1.0.0/16",
  TransitGatewayId: "tgw-0a1b2c3d4e5f6g7h"
});
```

## Route to VPC Peering Connection

Create a route that sends traffic through a VPC peering connection.

```ts
const vpcPeeringRoute = await AWS.EC2.Route("vpcPeeringRoute", {
  RouteTableId: "rtb-0a1b2c3d4e5f6g7h",
  DestinationCidrBlock: "10.2.0.0/16",
  VpcPeeringConnectionId: "pcx-0a1b2c3d4e5f6g7h"
});
```

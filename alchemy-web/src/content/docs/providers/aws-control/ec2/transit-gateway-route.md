---
title: TransitGatewayRoute
description: Learn how to create, update, and manage AWS EC2 TransitGatewayRoutes using Alchemy Cloud Control.
---


The TransitGatewayRoute resource allows you to manage [AWS EC2 Transit Gateway Routes](https://docs.aws.amazon.com/ec2/latest/userguide/). This resource is essential for controlling the routing of traffic between multiple VPCs and on-premises networks via a Transit Gateway.

## Minimal Example

Create a basic Transit Gateway Route with required properties.

```ts
import AWS from "alchemy/aws/control";

const transitGatewayRoute = await AWS.EC2.TransitGatewayRoute("basicRoute", {
  TransitGatewayRouteTableId: "tgw-rtb-0a1b2c3d4e5f6g7h8",
  DestinationCidrBlock: "10.0.0.0/16",
  TransitGatewayAttachmentId: "tgw-attach-0a1b2c3d4e5f6g7h8", // Optional but common
  Blackhole: false // Default false: Route is active
});
```

## Advanced Configuration

Configure a Transit Gateway Route with additional options such as enabling blackhole routing.

```ts
const advancedRoute = await AWS.EC2.TransitGatewayRoute("advancedRoute", {
  TransitGatewayRouteTableId: "tgw-rtb-0a1b2c3d4e5f6g7h8",
  DestinationCidrBlock: "192.168.1.0/24",
  Blackhole: true, // Enable blackhole routing for traffic
  TransitGatewayAttachmentId: "tgw-attach-0a1b2c3d4e5f6g7h8"
});
```

## Adopting Existing Resources

If you want to adopt an existing Transit Gateway Route instead of creating a new one, use the `adopt` property.

```ts
const adoptedRoute = await AWS.EC2.TransitGatewayRoute("adoptedRoute", {
  TransitGatewayRouteTableId: "tgw-rtb-0a1b2c3d4e5f6g7h8",
  DestinationCidrBlock: "172.16.0.0/12",
  adopt: true // Enable adoption of existing resource
});
```

## Practical Use Case: Interconnecting VPCs

Create a route to interconnect two VPCs through a Transit Gateway.

```ts
const interconnectRoute = await AWS.EC2.TransitGatewayRoute("interconnectRoute", {
  TransitGatewayRouteTableId: "tgw-rtb-0a1b2c3d4e5f6g7h8",
  DestinationCidrBlock: "10.1.0.0/16",
  TransitGatewayAttachmentId: "tgw-attach-0a1b2c3d4e5f6g7h8"
});
```

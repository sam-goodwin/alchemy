---
title: Managing AWS EC2 TransitGatewayRoutes with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayRoutes using Alchemy Cloud Control.
---

# TransitGatewayRoute

The TransitGatewayRoute resource allows you to manage routes in an AWS EC2 Transit Gateway route table. This resource is essential for controlling network traffic between VPCs, VPNs, and on-premises networks. For more information, refer to the [AWS EC2 TransitGatewayRoutes documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic TransitGatewayRoute with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const TransitGatewayRoute = await AWS.EC2.TransitGatewayRoute("BasicRoute", {
  TransitGatewayRouteTableId: "tgw-rtb-12345678",
  DestinationCidrBlock: "10.0.1.0/24",
  TransitGatewayAttachmentId: "tgw-attach-87654321" // Optional
});
```

## Advanced Configuration

Configure a TransitGatewayRoute that includes the blackhole option to indicate that the route is not reachable.

```ts
const AdvancedTransitGatewayRoute = await AWS.EC2.TransitGatewayRoute("AdvancedRoute", {
  TransitGatewayRouteTableId: "tgw-rtb-12345678",
  DestinationCidrBlock: "10.0.2.0/24",
  Blackhole: true // Indicates that this route is not reachable
});
```

## Route Adoption

Adopt an existing TransitGatewayRoute instead of failing if it already exists.

```ts
const AdoptedTransitGatewayRoute = await AWS.EC2.TransitGatewayRoute("AdoptedRoute", {
  TransitGatewayRouteTableId: "tgw-rtb-12345678",
  DestinationCidrBlock: "10.0.3.0/24",
  adopt: true // Enables adoption of an existing resource
});
```
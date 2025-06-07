---
title: Managing AWS EC2 ClientVpnRoutes with Alchemy
description: Learn how to create, update, and manage AWS EC2 ClientVpnRoutes using Alchemy Cloud Control.
---

# ClientVpnRoute

The ClientVpnRoute resource allows you to create and manage routes for AWS Client VPN endpoints. For more information, refer to the [AWS EC2 ClientVpnRoutes documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic ClientVpnRoute with the required properties.

```ts
import AWS from "alchemy/aws/control";

const basicVpnRoute = await AWS.EC2.ClientVpnRoute("BasicVpnRoute", {
  ClientVpnEndpointId: "cvpn-endpoint-12345678",
  TargetVpcSubnetId: "subnet-abcdefgh",
  DestinationCidrBlock: "10.0.0.0/16",
  Description: "Route for accessing VPC resources"
});
```

## Advanced Configuration

Configure a ClientVpnRoute with additional optional properties such as a description.

```ts
const advancedVpnRoute = await AWS.EC2.ClientVpnRoute("AdvancedVpnRoute", {
  ClientVpnEndpointId: "cvpn-endpoint-87654321",
  TargetVpcSubnetId: "subnet-hgfedcba",
  DestinationCidrBlock: "192.168.1.0/24",
  Description: "Advanced route for secure access",
  adopt: true // Adopt existing resource if it already exists
});
```

## Specific Use Case: Multiple Routes

Create multiple routes for different CIDR blocks to facilitate access to various network segments.

```ts
const routeForPrivateSubnet = await AWS.EC2.ClientVpnRoute("RouteForPrivateSubnet", {
  ClientVpnEndpointId: "cvpn-endpoint-11112222",
  TargetVpcSubnetId: "subnet-ijklmnop",
  DestinationCidrBlock: "10.1.0.0/16",
  Description: "Route for private subnet access"
});

const routeForPublicSubnet = await AWS.EC2.ClientVpnRoute("RouteForPublicSubnet", {
  ClientVpnEndpointId: "cvpn-endpoint-11112222",
  TargetVpcSubnetId: "subnet-qrstuvwx",
  DestinationCidrBlock: "10.2.0.0/16",
  Description: "Route for public subnet access"
});
```
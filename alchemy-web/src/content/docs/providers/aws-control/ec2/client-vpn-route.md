---
title: ClientVpnRoute
description: Learn how to create, update, and manage AWS EC2 ClientVpnRoutes using Alchemy Cloud Control.
---


The ClientVpnRoute resource allows you to manage [AWS EC2 ClientVpnRoutes](https://docs.aws.amazon.com/ec2/latest/userguide/) that define the route information for a Client VPN endpoint.

## Minimal Example

Create a basic ClientVpnRoute with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicRoute = await AWS.EC2.ClientVpnRoute("basicRoute", {
  ClientVpnEndpointId: "cvpn-endpoint-12345678",
  TargetVpcSubnetId: "subnet-1234abcd",
  DestinationCidrBlock: "10.0.1.0/24",
  Description: "Route to the application subnet"
});
```

## Advanced Configuration

Configure a ClientVpnRoute with additional properties for better resource management.

```ts
const advancedRoute = await AWS.EC2.ClientVpnRoute("advancedRoute", {
  ClientVpnEndpointId: "cvpn-endpoint-87654321",
  TargetVpcSubnetId: "subnet-abcd1234",
  DestinationCidrBlock: "10.0.2.0/24",
  Description: "Advanced route for VPN clients",
  adopt: true // Adopt existing resource instead of failing
});
```

## Example with Multiple Routes

Demonstrate the creation of multiple routes for different subnets.

```ts
const routeOne = await AWS.EC2.ClientVpnRoute("routeOne", {
  ClientVpnEndpointId: "cvpn-endpoint-12345678",
  TargetVpcSubnetId: "subnet-1234abcd",
  DestinationCidrBlock: "10.0.3.0/24",
  Description: "Route to subnet 1"
});

const routeTwo = await AWS.EC2.ClientVpnRoute("routeTwo", {
  ClientVpnEndpointId: "cvpn-endpoint-12345678",
  TargetVpcSubnetId: "subnet-5678efgh",
  DestinationCidrBlock: "10.0.4.0/24",
  Description: "Route to subnet 2"
});
```

## Example for CIDR Block Adjustments

Illustrate how to adjust the CIDR blocks for specific network configurations.

```ts
const adjustedRoute = await AWS.EC2.ClientVpnRoute("adjustedRoute", {
  ClientVpnEndpointId: "cvpn-endpoint-12345678",
  TargetVpcSubnetId: "subnet-90abcdef",
  DestinationCidrBlock: "10.0.5.0/24",
  Description: "Route to adjusted CIDR block"
});
```

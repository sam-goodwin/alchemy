---
title: VPNConnectionRoute
description: Learn how to create, update, and manage AWS EC2 VPNConnectionRoutes using Alchemy Cloud Control.
---


The VPNConnectionRoute resource allows you to manage [AWS EC2 VPN Connection Routes](https://docs.aws.amazon.com/ec2/latest/userguide/) for your virtual private cloud (VPC) connections. This includes specifying the destination CIDR block and associating it with a specific VPN connection.

## Minimal Example

Create a basic VPN connection route specifying the necessary properties.

```ts
import AWS from "alchemy/aws/control";

const vpnConnectionRoute = await AWS.EC2.VPNConnectionRoute("myVpnConnectionRoute", {
  DestinationCidrBlock: "10.0.1.0/24",
  VpnConnectionId: "vpn-1a2b3c4d",
  adopt: false // Default false: Fails if the resource already exists
});
```

## Advanced Configuration

Adopt an existing VPN connection route instead of failing on creation if the route already exists.

```ts
const existingVpnConnectionRoute = await AWS.EC2.VPNConnectionRoute("existingVpnRoute", {
  DestinationCidrBlock: "10.0.2.0/24",
  VpnConnectionId: "vpn-1a2b3c4d",
  adopt: true // Adopt the existing resource
});
```

## Updating a Route

Update an existing VPN connection route to point to a new destination CIDR block.

```ts
const updatedVpnConnectionRoute = await AWS.EC2.VPNConnectionRoute("updatedVpnRoute", {
  DestinationCidrBlock: "10.0.3.0/24",
  VpnConnectionId: "vpn-1a2b3c4d",
  adopt: false // Fails if the resource already exists
});
```

## Handling Multiple Routes

Create multiple VPN connection routes for different CIDR blocks associated with the same VPN connection.

```ts
const route1 = await AWS.EC2.VPNConnectionRoute("route1", {
  DestinationCidrBlock: "10.0.4.0/24",
  VpnConnectionId: "vpn-1a2b3c4d"
});

const route2 = await AWS.EC2.VPNConnectionRoute("route2", {
  DestinationCidrBlock: "10.0.5.0/24",
  VpnConnectionId: "vpn-1a2b3c4d"
});
```

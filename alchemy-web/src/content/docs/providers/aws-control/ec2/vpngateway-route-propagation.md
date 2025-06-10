---
title: VPNGatewayRoutePropagation
description: Learn how to create, update, and manage AWS EC2 VPNGatewayRoutePropagations using Alchemy Cloud Control.
---


The VPNGatewayRoutePropagation resource allows you to manage route propagation for a virtual private network (VPN) gateway in AWS. This resource is crucial for ensuring that routes from your VPN connection are properly propagated to your route tables. For more information, see the [AWS EC2 VPNGatewayRoutePropagations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPN Gateway Route Propagation with required properties:

```ts
import AWS from "alchemy/aws/control";

const vpnGatewayRoutePropagation = await AWS.EC2.VPNGatewayRoutePropagation("myVpnRoutePropagation", {
  RouteTableIds: ["rtb-12345678", "rtb-87654321"],
  VpnGatewayId: "vgw-abcdefgh",
  adopt: true // If true, adopt existing resource instead of failing when resource already exists
});
```

## Advanced Configuration

Set up a VPN Gateway Route Propagation with additional properties and configurations:

```ts
const advancedVpnGatewayRoutePropagation = await AWS.EC2.VPNGatewayRoutePropagation("advancedVpnRoutePropagation", {
  RouteTableIds: ["rtb-12345678", "rtb-87654321"],
  VpnGatewayId: "vgw-abcdefgh",
  adopt: false // Default is false, will fail if resource already exists
});
```

## Propagation with Multiple Route Tables

You can propagate routes to multiple route tables simultaneously by specifying multiple IDs:

```ts
const multiRouteTablePropagation = await AWS.EC2.VPNGatewayRoutePropagation("multiRouteTablePropagation", {
  RouteTableIds: [
    "rtb-12345678", 
    "rtb-23456789", 
    "rtb-34567890"
  ],
  VpnGatewayId: "vgw-ijklmnop",
  adopt: true // Adopt existing resource
});
```

## Cleanup Example

Configure a cleanup process that removes the VPN Gateway Route Propagation when it's no longer needed:

```ts
const cleanupVpnGatewayRoutePropagation = await AWS.EC2.VPNGatewayRoutePropagation("cleanupVpnRoutePropagation", {
  RouteTableIds: ["rtb-12345678"],
  VpnGatewayId: "vgw-qrstuvwx",
  adopt: false // Will not adopt existing resource, will fail if it exists
});
```

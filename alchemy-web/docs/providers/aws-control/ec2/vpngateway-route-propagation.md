---
title: Managing AWS EC2 VPNGatewayRoutePropagations with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPNGatewayRoutePropagations using Alchemy Cloud Control.
---

# VPNGatewayRoutePropagation

The VPNGatewayRoutePropagation resource allows you to manage route propagation for a Virtual Private Network (VPN) Gateway in AWS. This enables automatic updates of routing tables associated with your VPN gateway. For more detailed information, refer to the [AWS EC2 VPNGatewayRoutePropagations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPNGatewayRoutePropagation with required properties.

```ts
import AWS from "alchemy/aws/control";

const VpnGatewayRoutePropagation = await AWS.EC2.VPNGatewayRoutePropagation("BasicRoutePropagation", {
  RouteTableIds: ["rtb-0abcd1234efgh5678"], // Replace with your actual route table ID
  VpnGatewayId: "vgw-0abcd1234efgh5678" // Replace with your actual VPN gateway ID
});
```

## Advanced Configuration

Configure a VPNGatewayRoutePropagation with additional options.

```ts
const AdvancedVpnGatewayRoutePropagation = await AWS.EC2.VPNGatewayRoutePropagation("AdvancedRoutePropagation", {
  RouteTableIds: ["rtb-0abcd1234efgh5678"], // Route table ID
  VpnGatewayId: "vgw-0abcd1234efgh5678", // VPN gateway ID
  adopt: true // Enable adopting existing resource
});
```

## Use Case: Multiple Route Tables

Demonstrate how to propagate routes to multiple route tables.

```ts
const MultiRouteTablePropagation = await AWS.EC2.VPNGatewayRoutePropagation("MultiRouteTablePropagation", {
  RouteTableIds: [
    "rtb-0abcd1234efgh5678", // First route table ID
    "rtb-0ijkl9012mnop3456"  // Second route table ID
  ],
  VpnGatewayId: "vgw-0abcd1234efgh5678" // VPN gateway ID
});
```

## Use Case: Route Propagation for High Availability

Set up route propagation for a high availability setup with a redundant VPN connection.

```ts
const HighAvailabilityRoutePropagation = await AWS.EC2.VPNGatewayRoutePropagation("HighAvailabilityRoutePropagation", {
  RouteTableIds: ["rtb-0abcd1234efgh5678"], // Route table ID
  VpnGatewayId: "vgw-0abcd1234efgh5678", // Primary VPN gateway ID
  adopt: false // Do not adopt existing resources
});

// Additional configuration for a redundant connection can be done here
const RedundantVpnGatewayRoutePropagation = await AWS.EC2.VPNGatewayRoutePropagation("RedundantRoutePropagation", {
  RouteTableIds: ["rtb-0ijkl9012mnop3456"], // Different route table ID for redundancy
  VpnGatewayId: "vgw-1mnop9012qrst6789", // Redundant VPN gateway ID
  adopt: false // Do not adopt existing resources
});
```
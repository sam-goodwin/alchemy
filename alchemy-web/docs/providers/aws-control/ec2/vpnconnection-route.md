---
title: Managing AWS EC2 VPNConnectionRoutes with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPNConnectionRoutes using Alchemy Cloud Control.
---

# VPNConnectionRoute

The VPNConnectionRoute resource allows you to manage routes for AWS EC2 VPN connections. This resource is essential for directing traffic through the VPN connection, ensuring that the correct network routes are established. For more information, refer to the [AWS EC2 VPNConnectionRoutes](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPN connection route with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicVPCRoute = await AWS.EC2.VPNConnectionRoute("BasicVPCRoute", {
  DestinationCidrBlock: "192.168.1.0/24",
  VpnConnectionId: "vpn-0abcd1234efgh5678",
  adopt: false // Default is false: Will fail if resource already exists
});
```

## Advanced Configuration

Configure a VPN connection route with additional properties such as adopting existing resources.

```ts
const AdvancedVPCRoute = await AWS.EC2.VPNConnectionRoute("AdvancedVPCRoute", {
  DestinationCidrBlock: "10.0.2.0/24",
  VpnConnectionId: "vpn-0abcd1234efgh5678",
  adopt: true // Set to true to adopt an existing route
});
```

## Multiple Routes for Redundancy

Create multiple VPN connection routes for different destination CIDR blocks to ensure redundancy.

```ts
const Route1 = await AWS.EC2.VPNConnectionRoute("Route1", {
  DestinationCidrBlock: "10.0.3.0/24",
  VpnConnectionId: "vpn-0abcd1234efgh5678"
});

const Route2 = await AWS.EC2.VPNConnectionRoute("Route2", {
  DestinationCidrBlock: "172.16.0.0/16",
  VpnConnectionId: "vpn-0abcd1234efgh5678"
});
```

## Updating an Existing Route

Update an existing VPN connection route by specifying the destination CIDR block and VPN connection ID.

```ts
const UpdatedVPCRoute = await AWS.EC2.VPNConnectionRoute("UpdatedVPCRoute", {
  DestinationCidrBlock: "192.168.10.0/24",
  VpnConnectionId: "vpn-0abcd1234efgh5678",
  adopt: true // Allow adoption of the existing resource
});
```
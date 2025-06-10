---
title: VPNConnection
description: Learn how to create, update, and manage AWS EC2 VPNConnections using Alchemy Cloud Control.
---


The VPNConnection resource allows you to create and manage [AWS EC2 VPNConnections](https://docs.aws.amazon.com/ec2/latest/userguide/) for establishing secure connections between your on-premises network and your AWS environment.

## Minimal Example

Create a basic VPN connection with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicVpnConnection = await AWS.EC2.VPNConnection("basicVpnConnection", {
  customerGatewayId: "cgw-12345678",
  type: "ipsec.1",
  remoteIpv4NetworkCidr: "192.168.1.0/24",
  localIpv4NetworkCidr: "10.0.0.0/16",
  tags: [
    { key: "Name", value: "BasicVPNConnection" }
  ]
});
```

## Advanced Configuration

Configure a VPN connection with advanced options, including tunnel options and static routes.

```ts
const advancedVpnConnection = await AWS.EC2.VPNConnection("advancedVpnConnection", {
  customerGatewayId: "cgw-87654321",
  type: "ipsec.1",
  remoteIpv4NetworkCidr: "172.16.0.0/12",
  localIpv4NetworkCidr: "10.1.0.0/16",
  staticRoutesOnly: true,
  vpnTunnelOptionsSpecifications: [
    {
      tunnelInsideIpVersion: "ipv4",
      preSharedKey: "my-very-secure-pre-shared-key",
      phase1LifetimeSeconds: 86400,
      phase2LifetimeSeconds: 3600,
      rekeyMarginTimeSeconds: 540,
      replayWindowSize: 2048,
      dpdTimeoutSeconds: 30,
      dpdTimeoutAction: "clear",
    }
  ],
  tags: [
    { key: "Name", value: "AdvancedVPNConnection" }
  ]
});
```

## High Availability Setup

Create a VPN connection with options for high availability and acceleration.

```ts
const highAvailabilityVpnConnection = await AWS.EC2.VPNConnection("highAvailabilityVpnConnection", {
  customerGatewayId: "cgw-11223344",
  type: "ipsec.1",
  remoteIpv4NetworkCidr: "10.2.0.0/16",
  localIpv4NetworkCidr: "10.3.0.0/16",
  enableAcceleration: true,
  outsideIpAddressType: "static",
  tags: [
    { key: "Name", value: "HighAvailabilityVPNConnection" }
  ]
});
```

## Transit Gateway Integration

Set up a VPN connection that integrates with a Transit Gateway for enhanced connectivity.

```ts
const transitGatewayVpnConnection = await AWS.EC2.VPNConnection("transitGatewayVpnConnection", {
  customerGatewayId: "cgw-55667788",
  type: "ipsec.1",
  remoteIpv4NetworkCidr: "192.168.2.0/24",
  localIpv4NetworkCidr: "10.4.0.0/16",
  transitGatewayId: "tgw-98765432",
  tags: [
    { key: "Name", value: "TransitGatewayVPNConnection" }
  ]
});
```

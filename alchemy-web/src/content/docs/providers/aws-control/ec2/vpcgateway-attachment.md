---
title: VPCGatewayAttachment
description: Learn how to create, update, and manage AWS EC2 VPCGatewayAttachments using Alchemy Cloud Control.
---


The VPCGatewayAttachment resource allows you to attach a Virtual Private Cloud (VPC) to either an Internet Gateway or a Virtual Private Network (VPN) Gateway, enabling connectivity to the internet or other networks. For more details, refer to the [AWS EC2 VPCGatewayAttachments](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPCGatewayAttachment by attaching an Internet Gateway to a VPC.

```ts
import AWS from "alchemy/aws/control";

const vpcGatewayAttachment = await AWS.EC2.VPCGatewayAttachment("myVpcGatewayAttachment", {
  InternetGatewayId: "igw-0123456789abcdef0",
  VpcId: "vpc-0123456789abcdef0"
});
```

## Advanced Configuration

Attach a VPN Gateway to a VPC while adopting an existing resource if it already exists.

```ts
const vpnGatewayAttachment = await AWS.EC2.VPCGatewayAttachment("myVpnGatewayAttachment", {
  VpnGatewayId: "vgw-0123456789abcdef0",
  VpcId: "vpc-0123456789abcdef0",
  adopt: true // Adopt existing resource
});
```

## Attaching Multiple Gateways

Create a VPCGatewayAttachment that can be switched between Internet Gateway and VPN Gateway.

```ts
const gatewayType = "internet"; // change to "vpn" for VPN Gateway

const multiGatewayAttachment = await AWS.EC2.VPCGatewayAttachment("myMultiGatewayAttachment", {
  VpcId: "vpc-0123456789abcdef0",
  ...(gatewayType === "internet" ? { InternetGatewayId: "igw-0123456789abcdef0" } : { VpnGatewayId: "vgw-0123456789abcdef0" })
});
```

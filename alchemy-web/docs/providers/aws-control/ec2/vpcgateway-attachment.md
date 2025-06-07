---
title: Managing AWS EC2 VPCGatewayAttachments with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCGatewayAttachments using Alchemy Cloud Control.
---

# VPCGatewayAttachment

The VPCGatewayAttachment resource allows you to attach a virtual private cloud (VPC) to an internet gateway or a virtual private network (VPN) gateway. This resource is essential for enabling internet access for your VPC or establishing a secure connection to your on-premises network. For more information, visit the [AWS EC2 VPCGatewayAttachments documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic VPCGatewayAttachment with the required properties.

```ts
import AWS from "alchemy/aws/control";

const VPCGatewayAttachment = await AWS.EC2.VPCGatewayAttachment("MyVPCGatewayAttachment", {
  VpcId: "vpc-12345678", // Replace with your actual VPC ID
  InternetGatewayId: "igw-87654321" // Replace with your actual Internet Gateway ID
});
```

## Advanced Configuration

In this example, we specify the VPN Gateway ID to attach a VPC to a VPN gateway instead of an internet gateway.

```ts
const VPCGatewayAttachmentWithVpn = await AWS.EC2.VPCGatewayAttachment("MyVpnGatewayAttachment", {
  VpcId: "vpc-12345678", // Replace with your actual VPC ID
  VpnGatewayId: "vgw-11223344" // Replace with your actual VPN Gateway ID
});
```

## Resource Adoption

This example shows how to adopt an existing VPCGatewayAttachment instead of failing if it already exists.

```ts
const AdoptExistingVPCGatewayAttachment = await AWS.EC2.VPCGatewayAttachment("MyAdoptedVPCGatewayAttachment", {
  VpcId: "vpc-12345678", // Replace with your actual VPC ID
  InternetGatewayId: "igw-87654321", // Replace with your actual Internet Gateway ID
  adopt: true // Set to true to adopt an existing resource
});
```
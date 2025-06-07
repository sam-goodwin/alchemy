---
title: Managing AWS EC2 VPCCidrBlocks with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCCidrBlocks using Alchemy Cloud Control.
---

# VPCCidrBlock

The VPCCidrBlock resource allows you to manage CIDR blocks in an Amazon VPC (Virtual Private Cloud). This includes allocating both IPv4 and IPv6 CIDR blocks for your VPC. For more information, visit the [AWS EC2 VPCCidrBlocks documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPCCidrBlock with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicVPCCidrBlock = await AWS.EC2.VPCCidrBlock("BasicVPCCidrBlock", {
  VpcId: "vpc-123abc45", // Replace with your actual VPC ID
  CidrBlock: "10.0.1.0/24", // Example IPv4 CIDR block
  Ipv4NetmaskLength: 24 // Optional
});
```

## Advanced Configuration

Configure a VPCCidrBlock with additional settings for IPv6 and IPAM.

```ts
const AdvancedVPCCidrBlock = await AWS.EC2.VPCCidrBlock("AdvancedVPCCidrBlock", {
  VpcId: "vpc-123abc45", // Replace with your actual VPC ID
  Ipv6CidrBlock: "2001:0db8:abcd:0012::/64", // Example IPv6 CIDR block
  Ipv6IpamPoolId: "ipam-pool-12345", // Replace with your actual IPAM pool ID
  Ipv6NetmaskLength: 64 // Optional
});
```

## Using Amazon Provided IPv6 CIDR Block

Create a VPCCidrBlock utilizing an Amazon-provided IPv6 CIDR block.

```ts
const AmazonProvidedVPCCidrBlock = await AWS.EC2.VPCCidrBlock("AmazonProvidedVPCCidrBlock", {
  VpcId: "vpc-123abc45", // Replace with your actual VPC ID
  AmazonProvidedIpv6CidrBlock: true // Use Amazon-provided IPv6 block
});
```

## Using IPAM for IPv4 CIDR Block

Allocating an IPv4 CIDR block from an IPAM pool.

```ts
const IpamVPCCidrBlock = await AWS.EC2.VPCCidrBlock("IpamVPCCidrBlock", {
  VpcId: "vpc-123abc45", // Replace with your actual VPC ID
  Ipv4IpamPoolId: "ipv4-ipam-pool-123", // Replace with your actual IPv4 IPAM pool ID
  Ipv4NetmaskLength: 24 // Optional
});
```
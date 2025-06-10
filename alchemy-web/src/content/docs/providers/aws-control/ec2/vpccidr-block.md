---
title: VPCCidrBlock
description: Learn how to create, update, and manage AWS EC2 VPCCidrBlocks using Alchemy Cloud Control.
---


The VPCCidrBlock resource lets you manage [AWS EC2 VPCCidrBlocks](https://docs.aws.amazon.com/ec2/latest/userguide/) for a specified VPC, allowing you to add IPv4 and IPv6 CIDR blocks to your Virtual Private Cloud (VPC).

## Minimal Example

Create a basic VPC CIDR block with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const vpcCidrBlock = await AWS.EC2.VPCCidrBlock("myVpcCidrBlock", {
  VpcId: "vpc-12345678",
  CidrBlock: "192.168.1.0/24",
  Ipv4NetmaskLength: 24 // Optional: Specify the netmask length for IPv4
});
```

## Advanced Configuration

Add an IPv6 CIDR block with additional properties for IPv6 configuration.

```ts
const advancedVpcCidrBlock = await AWS.EC2.VPCCidrBlock("advancedVpcCidrBlock", {
  VpcId: "vpc-12345678",
  Ipv6CidrBlock: "2001:db8::/64", // Optional: Specify the CIDR block for IPv6
  Ipv6NetmaskLength: 64, // Optional: Specify the netmask length for IPv6
  AmazonProvidedIpv6CidrBlock: true // Optional: Request an Amazon-provided IPv6 CIDR block
});
```

## Adopting Existing CIDR Block

If you want to adopt an existing resource instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const adoptVpcCidrBlock = await AWS.EC2.VPCCidrBlock("adoptVpcCidrBlock", {
  VpcId: "vpc-12345678",
  CidrBlock: "192.168.2.0/24",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Using IPAM for CIDR Blocks

Create a VPC CIDR block using an IPAM pool for better IP address management.

```ts
const ipamVpcCidrBlock = await AWS.EC2.VPCCidrBlock("ipamVpcCidrBlock", {
  VpcId: "vpc-12345678",
  Ipv4IpamPoolId: "ipam-pool-12345678", // Optional: Specify the IPAM pool ID for IPv4
  Ipv6IpamPoolId: "ipam-ipv6-pool-12345678", // Optional: Specify the IPAM pool ID for IPv6
  Ipv4NetmaskLength: 24,
  Ipv6NetmaskLength: 64
});
```

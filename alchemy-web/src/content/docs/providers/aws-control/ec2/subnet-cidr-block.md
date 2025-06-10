---
title: SubnetCidrBlock
description: Learn how to create, update, and manage AWS EC2 SubnetCidrBlocks using Alchemy Cloud Control.
---


The SubnetCidrBlock resource lets you manage [AWS EC2 Subnet CIDR Blocks](https://docs.aws.amazon.com/ec2/latest/userguide/) associated with your VPC subnets. This resource allows you to add IPv6 CIDR blocks to existing subnets for enhanced network configuration.

## Minimal Example

This example demonstrates how to create a SubnetCidrBlock with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const subnetCidrBlock = await AWS.EC2.SubnetCidrBlock("mySubnetCidrBlock", {
  SubnetId: "subnet-01a2b3c4d5e6f7g8",
  Ipv6CidrBlock: "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
});
```

## Advanced Configuration

This example shows how to create a SubnetCidrBlock with additional advanced properties, including IPv6 netmask length and IPAM pool ID.

```ts
const advancedSubnetCidrBlock = await AWS.EC2.SubnetCidrBlock("advancedSubnetCidrBlock", {
  SubnetId: "subnet-01a2b3c4d5e6f7g8",
  Ipv6CidrBlock: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
  Ipv6NetmaskLength: 64,
  Ipv6IpamPoolId: "ipam-pool-0123456789abcdef0"
});
```

## Adopting Existing Resource

This example demonstrates how to adopt an existing SubnetCidrBlock instead of failing if it already exists.

```ts
const existingSubnetCidrBlock = await AWS.EC2.SubnetCidrBlock("existingSubnetCidrBlock", {
  SubnetId: "subnet-01a2b3c4d5e6f7g8",
  Ipv6CidrBlock: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
  adopt: true
});
```

## Updating Subnet CIDR Block

This example illustrates how to update an existing SubnetCidrBlock by changing the IPv6 CIDR block.

```ts
const updatedSubnetCidrBlock = await AWS.EC2.SubnetCidrBlock("updateSubnetCidrBlock", {
  SubnetId: "subnet-01a2b3c4d5e6f7g8",
  Ipv6CidrBlock: "2001:0db8:85a3:0000:0000:8a2e:0370:1234"
});
```

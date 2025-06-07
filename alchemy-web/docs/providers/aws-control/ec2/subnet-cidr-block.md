---
title: Managing AWS EC2 SubnetCidrBlocks with Alchemy
description: Learn how to create, update, and manage AWS EC2 SubnetCidrBlocks using Alchemy Cloud Control.
---

# SubnetCidrBlock

The SubnetCidrBlock resource allows you to manage [AWS EC2 Subnet CIDR Blocks](https://docs.aws.amazon.com/ec2/latest/userguide/) for your virtual private cloud (VPC). This resource enables you to allocate and configure IPv6 CIDR blocks for your existing subnets.

## Minimal Example

Create a basic SubnetCidrBlock with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicSubnetCidrBlock = await AWS.EC2.SubnetCidrBlock("BasicSubnetCidrBlock", {
  SubnetId: "subnet-12345678",
  Ipv6CidrBlock: "2001:db8::/64",
  Ipv6NetmaskLength: 64
});
```

## Advanced Configuration

Configure a SubnetCidrBlock with additional options such as an IPAM pool ID and adoption feature.

```ts
const AdvancedSubnetCidrBlock = await AWS.EC2.SubnetCidrBlock("AdvancedSubnetCidrBlock", {
  SubnetId: "subnet-87654321",
  Ipv6CidrBlock: "2001:db8:abcd:0012::/64",
  Ipv6NetmaskLength: 64,
  Ipv6IpamPoolId: "ipam-pool-abcdefg",
  adopt: true
});
```

## Adoption of Existing Subnet CIDR Block

If you need to adopt an existing Subnet CIDR Block without failing, you can set the `adopt` property to `true`.

```ts
const AdoptExistingSubnetCidrBlock = await AWS.EC2.SubnetCidrBlock("AdoptExistingSubnetCidrBlock", {
  SubnetId: "subnet-11223344",
  Ipv6CidrBlock: "2001:db8:abcd:0013::/64",
  adopt: true
});
```

This will allow your configuration to succeed even if the CIDR block already exists.
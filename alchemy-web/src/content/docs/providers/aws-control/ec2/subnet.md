---
title: Subnet
description: Learn how to create, update, and manage AWS EC2 Subnets using Alchemy Cloud Control.
---


The Subnet resource lets you manage [AWS EC2 Subnets](https://docs.aws.amazon.com/ec2/latest/userguide/) within a Virtual Private Cloud (VPC). Subnets are a range of IP addresses in your VPC that help segment your network.

## Minimal Example

Create a basic subnet within a specified VPC with a CIDR block.

```ts
import AWS from "alchemy/aws/control";

const basicSubnet = await AWS.EC2.Subnet("basicSubnet", {
  VpcId: "vpc-0abcd1234efgh5678",
  CidrBlock: "10.0.1.0/24",
  MapPublicIpOnLaunch: true
});
```

## Advanced Configuration

Configure a subnet with additional options such as IPv6 support and DNS settings.

```ts
const advancedSubnet = await AWS.EC2.Subnet("advancedSubnet", {
  VpcId: "vpc-0abcd1234efgh5678",
  CidrBlock: "10.0.2.0/24",
  EnableDns64: true,
  AssignIpv6AddressOnCreation: true,
  Ipv6CidrBlock: "2001:db8:abcd:0012::/64"
});
```

## Subnet with Tags

Create a subnet and apply tags for better resource management.

```ts
const taggedSubnet = await AWS.EC2.Subnet("taggedSubnet", {
  VpcId: "vpc-0abcd1234efgh5678",
  CidrBlock: "10.0.3.0/24",
  Tags: [
    { Key: "Name", Value: "MyTaggedSubnet" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Subnet in a Specific Availability Zone

Create a subnet in a specific availability zone for redundancy.

```ts
const azSubnet = await AWS.EC2.Subnet("azSubnet", {
  VpcId: "vpc-0abcd1234efgh5678",
  CidrBlock: "10.0.4.0/24",
  AvailabilityZone: "us-west-2a",
  MapPublicIpOnLaunch: false
});
```

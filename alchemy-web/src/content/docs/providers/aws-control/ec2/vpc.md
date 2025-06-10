---
title: VPC
description: Learn how to create, update, and manage AWS EC2 VPCs using Alchemy Cloud Control.
---


The VPC resource lets you create and manage [AWS EC2 VPCs](https://docs.aws.amazon.com/ec2/latest/userguide/) to isolate your AWS resources in a virtual network.

## Minimal Example

Create a basic VPC with a CIDR block and enable DNS support.

```ts
import AWS from "alchemy/aws/control";

const myVPC = await AWS.EC2.VPC("my-vpc", {
  CidrBlock: "10.0.0.0/16",
  EnableDnsSupport: true,
  Tags: [
    { Key: "Name", Value: "MyVPC" }
  ]
});
```

## Advanced Configuration

Configure a VPC with instance tenancy options and a specific IPv4 netmask length.

```ts
const advancedVPC = await AWS.EC2.VPC("advanced-vpc", {
  CidrBlock: "192.168.0.0/24",
  InstanceTenancy: "dedicated",
  Ipv4NetmaskLength: 24,
  EnableDnsHostnames: true,
  Tags: [
    { Key: "Name", Value: "AdvancedVPC" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Example with IPAM Pool ID

Create a VPC that uses a specific IPv4 IPAM pool.

```ts
const ipamVPC = await AWS.EC2.VPC("ipam-vpc", {
  Ipv4IpamPoolId: "ipam-pool-12345678",
  CidrBlock: "10.1.0.0/16",
  EnableDnsSupport: true,
  Tags: [
    { Key: "Name", Value: "IPAMVPC" }
  ]
});
```

## Example with Adoption of Existing Resource

Adopt an existing VPC if it is already created instead of failing.

```ts
const existingVPC = await AWS.EC2.VPC("existing-vpc", {
  CidrBlock: "10.2.0.0/16",
  adopt: true,
  Tags: [
    { Key: "Name", Value: "ExistingVPC" }
  ]
});
```

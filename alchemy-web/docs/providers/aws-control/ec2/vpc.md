---
title: Managing AWS EC2 VPCs with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCs using Alchemy Cloud Control.
---

# VPC

The VPC (Virtual Private Cloud) resource lets you create and manage [AWS EC2 VPCs](https://docs.aws.amazon.com/ec2/latest/userguide/) for your cloud infrastructure.

## Minimal Example

Create a basic VPC with a CIDR block and DNS support enabled.

```ts
import AWS from "alchemy/aws/control";

const MyVpc = await AWS.EC2.VPC("MyVpc", {
  CidrBlock: "10.0.0.0/16",
  EnableDnsSupport: true,
  EnableDnsHostnames: true,
  Tags: [
    { Key: "Name", Value: "MyVPC" },
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a VPC with instance tenancy and an IPAM pool ID for more advanced networking.

```ts
const AdvancedVpc = await AWS.EC2.VPC("AdvancedVpc", {
  CidrBlock: "192.168.1.0/24",
  InstanceTenancy: "dedicated",
  Ipv4IpamPoolId: "ipam-pool-id-12345",
  Tags: [
    { Key: "Name", Value: "AdvancedVPC" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Custom DNS Settings

Create a VPC with customized DNS settings to support specific use cases.

```ts
const CustomDnsVpc = await AWS.EC2.VPC("CustomDnsVpc", {
  CidrBlock: "172.31.0.0/16",
  EnableDnsSupport: true,
  EnableDnsHostnames: false,
  Tags: [
    { Key: "Name", Value: "CustomDnsVPC" },
    { Key: "Environment", Value: "Testing" }
  ]
});
```

## VPC with IPAM Pool

Deploy a VPC that uses an IP Address Management (IPAM) pool for allocating IP addresses.

```ts
const IpamVpc = await AWS.EC2.VPC("IpamVpc", {
  CidrBlock: "10.1.0.0/16",
  Ipv4IpamPoolId: "ipam-pool-id-67890",
  Tags: [
    { Key: "Name", Value: "IpamVPC" },
    { Key: "Environment", Value: "Staging" }
  ]
});
```
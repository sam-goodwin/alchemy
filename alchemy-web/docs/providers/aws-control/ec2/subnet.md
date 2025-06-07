---
title: Managing AWS EC2 Subnets with Alchemy
description: Learn how to create, update, and manage AWS EC2 Subnets using Alchemy Cloud Control.
---

# Subnet

The Subnet resource lets you manage [AWS EC2 Subnets](https://docs.aws.amazon.com/ec2/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic subnet with required properties and one optional property for enabling public IP assignment on launch.

```ts
import AWS from "alchemy/aws/control";

const MySubnet = await AWS.EC2.Subnet("MyFirstSubnet", {
  VpcId: "vpc-0abcd1234efgh5678",
  CidrBlock: "10.0.1.0/24",
  MapPublicIpOnLaunch: true
});
```

## Advanced Configuration

Configure a subnet with additional options like IPv6 support and tags for better management.

```ts
const AdvancedSubnet = await AWS.EC2.Subnet("MyAdvancedSubnet", {
  VpcId: "vpc-0abcd1234efgh5678",
  CidrBlock: "10.0.2.0/24",
  AssignIpv6AddressOnCreation: true,
  Ipv6CidrBlock: "2001:0db8:1234:5678::/64",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Private Subnet Configuration

Create a private subnet that does not assign public IP addresses and has DNS settings configured.

```ts
const PrivateSubnet = await AWS.EC2.Subnet("MyPrivateSubnet", {
  VpcId: "vpc-0abcd1234efgh5678",
  CidrBlock: "10.0.3.0/24",
  MapPublicIpOnLaunch: false,
  EnableDns64: true,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Backend" }
  ]
});
```

## Subnet with IPv6 and Tags

Demonstrate how to create a subnet with both IPv4 and IPv6 configurations along with tagging.

```ts
const DualStackSubnet = await AWS.EC2.Subnet("MyDualStackSubnet", {
  VpcId: "vpc-0abcd1234efgh5678",
  CidrBlock: "10.0.4.0/24",
  AssignIpv6AddressOnCreation: true,
  Ipv6CidrBlock: "2001:0db8:1234:5679::/64",
  Tags: [
    { Key: "Purpose", Value: "Web Server" },
    { Key: "Owner", Value: "Alice" }
  ]
});
```
---
title: Managing AWS EC2 NetworkInterfaces with Alchemy
description: Learn how to create, update, and manage AWS EC2 NetworkInterfaces using Alchemy Cloud Control.
---

# NetworkInterface

The NetworkInterface resource lets you create and manage [AWS EC2 NetworkInterfaces](https://docs.aws.amazon.com/ec2/latest/userguide/) for your instances, providing flexible networking options.

## Minimal Example

Create a basic NetworkInterface with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicNetworkInterface = await AWS.EC2.NetworkInterface("BasicNetworkInterface", {
  SubnetId: "subnet-0abcd1234efgh5678",
  Description: "Primary network interface for my EC2 instance",
  PrivateIpAddress: "10.0.1.50",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Advanced Configuration

Configure a NetworkInterface with advanced settings including multiple private IP addresses and security groups.

```ts
const AdvancedNetworkInterface = await AWS.EC2.NetworkInterface("AdvancedNetworkInterface", {
  SubnetId: "subnet-0abcd1234efgh5678",
  Description: "Advanced network interface with multiple IPs",
  SecondaryPrivateIpAddressCount: 2,
  Ipv6PrefixCount: 1,
  GroupSet: ["sg-01234abcd5678efgh"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Secondary IP Addresses

Demonstrate creating a NetworkInterface with multiple secondary private IP addresses.

```ts
const MultiIpNetworkInterface = await AWS.EC2.NetworkInterface("MultiIpNetworkInterface", {
  SubnetId: "subnet-0abcd1234efgh5678",
  Description: "Network interface with multiple secondary IPs",
  PrivateIpAddresses: [
    { PrivateIpAddress: "10.0.1.51", Primary: false },
    { PrivateIpAddress: "10.0.1.52", Primary: false }
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Service", Value: "API" }
  ]
});
```

## IPv6 Configuration

Create a NetworkInterface configured with IPv6 addresses.

```ts
const Ipv6NetworkInterface = await AWS.EC2.NetworkInterface("Ipv6NetworkInterface", {
  SubnetId: "subnet-0abcd1234efgh5678",
  Description: "Network interface with IPv6 support",
  Ipv6Addresses: [
    { Ipv6Address: "2001:0db8:85a3:0000:0000:8a2e:0370:7334" }
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Networking" }
  ]
});
```
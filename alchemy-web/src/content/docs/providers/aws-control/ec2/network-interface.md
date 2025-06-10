---
title: NetworkInterface
description: Learn how to create, update, and manage AWS EC2 NetworkInterfaces using Alchemy Cloud Control.
---


The NetworkInterface resource allows you to manage [AWS EC2 NetworkInterfaces](https://docs.aws.amazon.com/ec2/latest/userguide/) that enable communication between your instances and other resources. 

## Minimal Example

Create a basic NetworkInterface with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const networkInterface = await AWS.EC2.NetworkInterface("myNetworkInterface", {
  SubnetId: "subnet-0abcd1234efgh5678",
  Description: "Primary network interface for my EC2 instance",
  PrivateIpAddress: "192.168.1.10"
});
```

## Advanced Configuration

Configure a NetworkInterface with multiple private IP addresses and a security group.

```ts
const advancedNetworkInterface = await AWS.EC2.NetworkInterface("myAdvancedNetworkInterface", {
  SubnetId: "subnet-0abcd1234efgh5678",
  Description: "Advanced network interface with multiple IPs",
  PrivateIpAddresses: [
    { Primary: true, PrivateIpAddress: "192.168.1.20" },
    { Primary: false, PrivateIpAddress: "192.168.1.21" }
  ],
  GroupSet: ["sg-0abcd1234efgh5678"]
});
```

## Secondary Private IP Addresses

Create a NetworkInterface that allocates a secondary private IP address.

```ts
const networkInterfaceWithSecondaryIP = await AWS.EC2.NetworkInterface("myNetworkInterfaceWithSecondaryIP", {
  SubnetId: "subnet-0abcd1234efgh5678",
  SecondaryPrivateIpAddressCount: 2,
  Description: "Network interface with secondary private IPs"
});
```

## IPv6 Configuration

Set up a NetworkInterface with IPv6 support.

```ts
const ipv6NetworkInterface = await AWS.EC2.NetworkInterface("myIPv6NetworkInterface", {
  SubnetId: "subnet-0abcd1234efgh5678",
  Description: "Network interface with IPv6",
  Ipv6Prefixes: [{ Ipv6Prefix: "2001:db8:abcd:0012::/64" }],
  Ipv6AddressCount: 1
});
```

## Source Destination Check

Configure a NetworkInterface with source/destination checking disabled.

```ts
const networkInterfaceWithoutCheck = await AWS.EC2.NetworkInterface("myNetworkInterfaceWithoutCheck", {
  SubnetId: "subnet-0abcd1234efgh5678",
  Description: "Network interface with source/destination check disabled",
  SourceDestCheck: false
});
```

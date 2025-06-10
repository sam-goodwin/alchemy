---
title: SecurityGroupEgress
description: Learn how to create, update, and manage AWS EC2 SecurityGroupEgresss using Alchemy Cloud Control.
---


The SecurityGroupEgress resource allows you to manage outbound rules for AWS EC2 Security Groups. For more details, refer to the [AWS EC2 SecurityGroupEgress documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic SecurityGroupEgress rule allowing outbound traffic to a specific CIDR block.

```ts
import AWS from "alchemy/aws/control";

const egressRule = await AWS.EC2.SecurityGroupEgress("egressRule", {
  GroupId: "sg-123abc45", // ID of the security group
  IpProtocol: "tcp",
  FromPort: 80, // Allow outbound traffic on port 80
  ToPort: 80,
  CidrIp: "192.168.1.0/24" // Allow outbound traffic to this CIDR block
});
```

## Advanced Configuration

Configure a SecurityGroupEgress rule to allow outbound traffic to another security group and specify a description.

```ts
const advancedEgressRule = await AWS.EC2.SecurityGroupEgress("advancedEgressRule", {
  GroupId: "sg-123abc45",
  IpProtocol: "tcp",
  FromPort: 443, // Allow outbound traffic on port 443
  ToPort: 443,
  DestinationSecurityGroupId: "sg-678def90", // Allow traffic to another security group
  Description: "Allow outbound HTTPS traffic to internal service"
});
```

## IPv6 Configuration

Create a SecurityGroupEgress rule specifically for IPv6 traffic.

```ts
const ipv6EgressRule = await AWS.EC2.SecurityGroupEgress("ipv6EgressRule", {
  GroupId: "sg-123abc45",
  IpProtocol: "tcp",
  FromPort: 22, // Allow outbound SSH traffic
  ToPort: 22,
  CidrIpv6: "2001:0db8:85a3:0000:0000:8a2e:0370:7334/128", // Allow outbound traffic to this IPv6 address
  Description: "Allow outbound SSH to specific IPv6 address"
});
```

## CIDR and Prefix List Example

Allow outgoing traffic to a specific CIDR and a prefix list.

```ts
const cidrAndPrefixEgressRule = await AWS.EC2.SecurityGroupEgress("cidrAndPrefixEgressRule", {
  GroupId: "sg-123abc45",
  IpProtocol: "udp",
  FromPort: 53, // Allow DNS queries
  ToPort: 53,
  CidrIp: "10.0.0.0/16", // Allow outbound traffic to this CIDR block
  DestinationPrefixListId: "pl-abcde123", // Reference to a prefix list
  Description: "Allow DNS outbound traffic"
});
```

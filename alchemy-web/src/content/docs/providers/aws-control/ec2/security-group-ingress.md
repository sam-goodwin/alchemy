---
title: SecurityGroupIngress
description: Learn how to create, update, and manage AWS EC2 SecurityGroupIngresss using Alchemy Cloud Control.
---


The SecurityGroupIngress resource allows you to manage inbound rules for an Amazon EC2 security group. This resource defines which traffic is allowed to reach your EC2 instances. For more information, refer to the [AWS EC2 SecurityGroupIngress documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic security group ingress rule that allows HTTP traffic from a specific CIDR block.

```ts
import AWS from "alchemy/aws/control";

const httpIngressRule = await AWS.EC2.SecurityGroupIngress("httpIngress", {
  GroupId: "sg-12345678",
  IpProtocol: "tcp",
  FromPort: 80,
  ToPort: 80,
  CidrIp: "192.168.1.0/24",
  Description: "Allow HTTP traffic from local network"
});
```

## Advanced Configuration

Configure a security group ingress rule that allows SSH traffic from a specific security group.

```ts
const sshIngressRule = await AWS.EC2.SecurityGroupIngress("sshIngress", {
  GroupId: "sg-12345678",
  IpProtocol: "tcp",
  FromPort: 22,
  ToPort: 22,
  SourceSecurityGroupId: "sg-87654321",
  Description: "Allow SSH traffic from specific security group"
});
```

## IPv6 Configuration

Create a security group ingress rule that allows ICMPv6 traffic from a specific IPv6 CIDR block.

```ts
const icmpv6IngressRule = await AWS.EC2.SecurityGroupIngress("icmpv6Ingress", {
  GroupId: "sg-12345678",
  IpProtocol: "icmpv6",
  CidrIpv6: "2001:db8::/32",
  Description: "Allow ICMPv6 traffic"
});
```

## Mixed Protocols Configuration

Configure a security group ingress rule that allows both HTTP and HTTPS traffic from anywhere.

```ts
const mixedProtocolIngressRule = await AWS.EC2.SecurityGroupIngress("mixedProtocolIngress", {
  GroupId: "sg-12345678",
  IpProtocol: "tcp",
  FromPort: 80,
  ToPort: 80,
  CidrIp: "0.0.0.0/0",
  Description: "Allow HTTP traffic from anywhere"
});

const httpsIngressRule = await AWS.EC2.SecurityGroupIngress("httpsIngress", {
  GroupId: "sg-12345678",
  IpProtocol: "tcp",
  FromPort: 443,
  ToPort: 443,
  CidrIp: "0.0.0.0/0",
  Description: "Allow HTTPS traffic from anywhere"
});
```

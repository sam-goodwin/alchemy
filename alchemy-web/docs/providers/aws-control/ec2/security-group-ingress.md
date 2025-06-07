---
title: Managing AWS EC2 SecurityGroupIngresss with Alchemy
description: Learn how to create, update, and manage AWS EC2 SecurityGroupIngresss using Alchemy Cloud Control.
---

# SecurityGroupIngress

The SecurityGroupIngress resource allows you to configure ingress rules for a security group in Amazon EC2, enabling you to control inbound traffic to your instances. For more details, visit the [AWS EC2 SecurityGroupIngress documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic ingress rule that allows SSH access from a specific IP address.

```ts
import AWS from "alchemy/aws/control";

const IngressRule = await AWS.EC2.SecurityGroupIngress("SSHAccess", {
  GroupId: "sg-0123456789abcdef0",
  CidrIp: "203.0.113.0/24",
  FromPort: 22,
  ToPort: 22,
  IpProtocol: "tcp",
  Description: "Allow SSH access from specific IP range"
});
```

## Advanced Configuration

Configure an ingress rule that allows HTTP and HTTPS access from anywhere, while also specifying a source security group.

```ts
const HttpHttpsAccess = await AWS.EC2.SecurityGroupIngress("WebAccess", {
  GroupId: "sg-0123456789abcdef0",
  IpProtocol: "tcp",
  FromPort: 80,
  ToPort: 80,
  CidrIp: "0.0.0.0/0",
  Description: "Allow HTTP access from any IP"
});

const HttpsAccess = await AWS.EC2.SecurityGroupIngress("HttpsAccess", {
  GroupId: "sg-0123456789abcdef0",
  IpProtocol: "tcp",
  FromPort: 443,
  ToPort: 443,
  CidrIp: "0.0.0.0/0",
  Description: "Allow HTTPS access from any IP"
});
```

## Source Security Group Access

Allow access from another security group, which is useful for enabling communication between services.

```ts
const DatabaseAccess = await AWS.EC2.SecurityGroupIngress("DBAccess", {
  GroupId: "sg-0123456789abcdef0",
  IpProtocol: "tcp",
  FromPort: 3306,
  ToPort: 3306,
  SourceSecurityGroupId: "sg-0987654321abcdef0",
  Description: "Allow MySQL access from the application security group"
});
```

## IPv6 Access Configuration

Configure an ingress rule that allows access over IPv6.

```ts
const Ipv6Access = await AWS.EC2.SecurityGroupIngress("Ipv6Access", {
  GroupId: "sg-0123456789abcdef0",
  CidrIpv6: "2001:db8::/32",
  FromPort: 80,
  ToPort: 80,
  IpProtocol: "tcp",
  Description: "Allow HTTP access over IPv6"
});
```
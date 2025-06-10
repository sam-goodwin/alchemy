---
title: NetworkAclEntry
description: Learn how to create, update, and manage AWS EC2 NetworkAclEntrys using Alchemy Cloud Control.
---


The NetworkAclEntry resource allows you to manage [AWS EC2 Network ACL Entries](https://docs.aws.amazon.com/ec2/latest/userguide/) for configuring firewall rules for your Virtual Private Clouds (VPC). 

## Minimal Example

Create a basic Network ACL entry allowing inbound traffic on port 80 for HTTP.

```ts
import AWS from "alchemy/aws/control";

const httpAclEntry = await AWS.EC2.NetworkAclEntry("httpAclEntry", {
  NetworkAclId: "acl-12345678",
  RuleAction: "allow",
  RuleNumber: 100,
  Protocol: 6, // TCP
  PortRange: {
    From: 80,
    To: 80
  },
  CidrBlock: "0.0.0.0/0"
});
```

## Advanced Configuration

Configure a Network ACL entry to deny all inbound ICMP traffic.

```ts
const icmpAclEntry = await AWS.EC2.NetworkAclEntry("icmpAclEntry", {
  NetworkAclId: "acl-12345678",
  RuleAction: "deny",
  RuleNumber: 200,
  Protocol: 1, // ICMP
  Icmp: {
    Type: -1, // All types
    Code: -1  // All codes
  },
  CidrBlock: "0.0.0.0/0"
});
```

## Egress Configuration

Create an egress rule to allow outbound SSH traffic.

```ts
const sshEgressAclEntry = await AWS.EC2.NetworkAclEntry("sshEgressAclEntry", {
  NetworkAclId: "acl-12345678",
  RuleAction: "allow",
  RuleNumber: 300,
  Protocol: 6, // TCP
  PortRange: {
    From: 22,
    To: 22
  },
  Egress: true,
  CidrBlock: "0.0.0.0/0"
});
```

## IPv6 Configuration

Add an entry for allowing inbound HTTPS traffic on IPv6.

```ts
const httpsIPv6AclEntry = await AWS.EC2.NetworkAclEntry("httpsIPv6AclEntry", {
  NetworkAclId: "acl-12345678",
  RuleAction: "allow",
  RuleNumber: 400,
  Protocol: 6, // TCP
  PortRange: {
    From: 443,
    To: 443
  },
  Ipv6CidrBlock: "2001:db8::/32"
});
```

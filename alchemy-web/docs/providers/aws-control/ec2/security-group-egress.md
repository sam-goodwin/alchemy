---
title: Managing AWS EC2 SecurityGroupEgresss with Alchemy
description: Learn how to create, update, and manage AWS EC2 SecurityGroupEgresss using Alchemy Cloud Control.
---

# SecurityGroupEgress

The SecurityGroupEgress resource allows you to configure outbound rules for an AWS EC2 security group. You can specify the traffic that can leave instances associated with the security group. For more details, refer to the [AWS EC2 SecurityGroupEgress documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic SecurityGroupEgress with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const MySecurityGroupEgress = await AWS.EC2.SecurityGroupEgress("MyEgressRule", {
  GroupId: "sg-0abcd1234efgh5678",
  IpProtocol: "tcp",
  FromPort: 80,
  ToPort: 80,
  CidrIp: "0.0.0.0/0"
});
```

## Advanced Configuration

Configure a SecurityGroupEgress with additional options for more specific outbound traffic control.

```ts
const AdvancedSecurityGroupEgress = await AWS.EC2.SecurityGroupEgress("AdvancedEgressRule", {
  GroupId: "sg-0abcd1234efgh5678",
  IpProtocol: "tcp",
  FromPort: 443,
  ToPort: 443,
  CidrIp: "192.168.1.0/24",
  Description: "Allow HTTPS traffic to my internal network"
});
```

## Egress with Destination Security Group

Create a SecurityGroupEgress that allows traffic to another security group.

```ts
const PeerSecurityGroupEgress = await AWS.EC2.SecurityGroupEgress("PeerEgressRule", {
  GroupId: "sg-0abcd1234efgh5678",
  IpProtocol: "tcp",
  FromPort: 22,
  ToPort: 22,
  DestinationSecurityGroupId: "sg-0ijkl9012mnop3456",
  Description: "Allow SSH traffic to another security group"
});
```

## Egress with IPv6 Configuration

Set up a SecurityGroupEgress rule that allows outbound IPv6 traffic.

```ts
const IPv6SecurityGroupEgress = await AWS.EC2.SecurityGroupEgress("IPv6EgressRule", {
  GroupId: "sg-0abcd1234efgh5678",
  IpProtocol: "icmpv6",
  CidrIpv6: "2001:0db8:85a3:0000:0000:8a2e:0370:7334/128",
  Description: "Allow ICMPv6 traffic"
});
```
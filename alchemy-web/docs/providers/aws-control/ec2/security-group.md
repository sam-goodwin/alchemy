---
title: Managing AWS EC2 SecurityGroups with Alchemy
description: Learn how to create, update, and manage AWS EC2 SecurityGroups using Alchemy Cloud Control.
---

# SecurityGroup

The SecurityGroup resource allows you to define and manage [AWS EC2 SecurityGroups](https://docs.aws.amazon.com/ec2/latest/userguide/) which control inbound and outbound traffic for your instances.

## Minimal Example

Create a basic SecurityGroup with a description and a default ingress rule allowing SSH access.

```ts
import AWS from "alchemy/aws/control";

const BasicSecurityGroup = await AWS.EC2.SecurityGroup("BasicSecurityGroup", {
  GroupDescription: "Basic security group for allowing SSH access",
  GroupName: "BasicSSHGroup",
  SecurityGroupIngress: [
    {
      IpProtocol: "tcp",
      FromPort: 22,
      ToPort: 22,
      CidrIp: "203.0.113.0/24" // Allow SSH from a specific IP range
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a SecurityGroup with both ingress and egress rules, allowing HTTP and HTTPS traffic while restricting all other outbound traffic.

```ts
const AdvancedSecurityGroup = await AWS.EC2.SecurityGroup("AdvancedSecurityGroup", {
  GroupDescription: "Advanced security group for web servers",
  SecurityGroupIngress: [
    {
      IpProtocol: "tcp",
      FromPort: 80,
      ToPort: 80,
      CidrIp: "0.0.0.0/0" // Allow HTTP from anywhere
    },
    {
      IpProtocol: "tcp",
      FromPort: 443,
      ToPort: 443,
      CidrIp: "0.0.0.0/0" // Allow HTTPS from anywhere
    }
  ],
  SecurityGroupEgress: [
    {
      IpProtocol: "-1", // Allow all outbound traffic
      FromPort: 0,
      ToPort: 0,
      CidrIp: "0.0.0.0/0"
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "WebOps" }
  ]
});
```

## Restricting Access by IP

Create a SecurityGroup that restricts access to a specific set of IP addresses for database connections.

```ts
const DatabaseSecurityGroup = await AWS.EC2.SecurityGroup("DatabaseSecurityGroup", {
  GroupDescription: "Security group for database access",
  SecurityGroupIngress: [
    {
      IpProtocol: "tcp",
      FromPort: 3306,
      ToPort: 3306,
      CidrIp: "192.0.2.0/24" // Allow MySQL access from a specific IP range
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Allowing Internal Communication

Set up a SecurityGroup that allows internal communication between instances within the same VPC.

```ts
const InternalCommunicationSecurityGroup = await AWS.EC2.SecurityGroup("InternalCommunicationSecurityGroup", {
  GroupDescription: "Security group for internal instance communication",
  SecurityGroupIngress: [
    {
      IpProtocol: "tcp",
      FromPort: 0,
      ToPort: 65535,
      SourceSecurityGroupId: "sg-12345678" // Allow traffic from another security group
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```
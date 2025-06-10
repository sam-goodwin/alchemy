---
title: SecurityGroup
description: Learn how to create, update, and manage AWS EC2 SecurityGroups using Alchemy Cloud Control.
---


The SecurityGroup resource lets you manage [AWS EC2 SecurityGroups](https://docs.aws.amazon.com/ec2/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic security group with a description and a VPC ID:

```ts
import AWS from "alchemy/aws/control";

const basicSecurityGroup = await AWS.EC2.SecurityGroup("basicSecurityGroup", {
  GroupDescription: "Allow SSH access",
  VpcId: "vpc-12345abcde",
  SecurityGroupIngress: [{
    IpProtocol: "tcp",
    FromPort: 22,
    ToPort: 22,
    CidrIp: "203.0.113.0/24"
  }]
});
```

## Advanced Configuration

Configure a security group with both ingress and egress rules for HTTP and HTTPS access:

```ts
const advancedSecurityGroup = await AWS.EC2.SecurityGroup("advancedSecurityGroup", {
  GroupDescription: "Allow HTTP and HTTPS access",
  VpcId: "vpc-12345abcde",
  SecurityGroupIngress: [
    {
      IpProtocol: "tcp",
      FromPort: 80,
      ToPort: 80,
      CidrIp: "0.0.0.0/0"
    },
    {
      IpProtocol: "tcp",
      FromPort: 443,
      ToPort: 443,
      CidrIp: "0.0.0.0/0"
    }
  ],
  SecurityGroupEgress: [{
    IpProtocol: "-1", // Allows all outbound traffic
    CidrIp: "0.0.0.0/0"
  }]
});
```

## Custom Name and Tags

Create a security group with a custom name and tags for better identification:

```ts
const taggedSecurityGroup = await AWS.EC2.SecurityGroup("taggedSecurityGroup", {
  GroupDescription: "Allow database access",
  GroupName: "db-access-sg",
  VpcId: "vpc-12345abcde",
  SecurityGroupIngress: [{
    IpProtocol: "tcp",
    FromPort: 3306,
    ToPort: 3306,
    CidrIp: "192.0.2.0/24"
  }],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Department",
      Value: "Engineering"
    }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing security group instead of creating a new one, set the `adopt` property to true:

```ts
const existingSecurityGroup = await AWS.EC2.SecurityGroup("existingSecurityGroup", {
  GroupDescription: "Adopt existing security group",
  adopt: true
});
```

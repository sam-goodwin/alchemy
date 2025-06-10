---
title: DBSecurityGroupIngress
description: Learn how to create, update, and manage AWS RDS DBSecurityGroupIngresss using Alchemy Cloud Control.
---


The DBSecurityGroupIngress resource allows you to manage inbound rules for an Amazon RDS security group, controlling access to the database instances. This resource is crucial for maintaining security and ensuring that only authorized IPs or EC2 security groups can connect to your RDS instances. For more information, visit the [AWS RDS DBSecurityGroupIngress documentation](https://docs.aws.amazon.com/rds/latest/userguide/).

## Minimal Example

Create a basic DBSecurityGroupIngress allowing access from a specific CIDR block.

```ts
import AWS from "alchemy/aws/control";

const dbSecurityGroupIngress = await AWS.RDS.DBSecurityGroupIngress("myDbSecurityGroupIngress", {
  CIDRIP: "192.168.1.0/24",
  DBSecurityGroupName: "myDatabaseSecurityGroup",
});
```

## Advanced Configuration

Configure DBSecurityGroupIngress using an EC2 security group for access.

```ts
const advancedDbSecurityGroupIngress = await AWS.RDS.DBSecurityGroupIngress("advancedDbSecurityGroupIngress", {
  EC2SecurityGroupId: "sg-0123456789abcdef0",
  DBSecurityGroupName: "myDatabaseSecurityGroup",
  EC2SecurityGroupOwnerId: "123456789012",
});
```

## Multiple Ingress Rules

Set up multiple ingress rules for a single RDS security group to allow different access sources.

```ts
const ingressRule1 = await AWS.RDS.DBSecurityGroupIngress("ingressFromCIDR", {
  CIDRIP: "203.0.113.0/24",
  DBSecurityGroupName: "myDatabaseSecurityGroup",
});

const ingressRule2 = await AWS.RDS.DBSecurityGroupIngress("ingressFromEc2", {
  EC2SecurityGroupId: "sg-abcdef1234567890",
  DBSecurityGroupName: "myDatabaseSecurityGroup",
});
```

## Adopting Existing Resources

Adopt an existing DBSecurityGroupIngress if it already exists instead of failing.

```ts
const adoptExistingIngress = await AWS.RDS.DBSecurityGroupIngress("existingIngressRule", {
  CIDRIP: "198.51.100.0/24",
  DBSecurityGroupName: "myDatabaseSecurityGroup",
  adopt: true,
});
```

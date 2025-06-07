---
title: Managing AWS RDS DBSecurityGroupIngresss with Alchemy
description: Learn how to create, update, and manage AWS RDS DBSecurityGroupIngresss using Alchemy Cloud Control.
---

# DBSecurityGroupIngress

The `DBSecurityGroupIngress` resource allows you to manage inbound rules for Amazon RDS DB Security Groups, enabling control over which resources can access your database instances. For more information, refer to the [AWS RDS DBSecurityGroupIngress documentation](https://docs.aws.amazon.com/rds/latest/userguide/).

## Minimal Example

Create a basic inbound rule allowing access from a specific CIDR block.

```ts
import AWS from "alchemy/aws/control";

const BasicIngressRule = await AWS.RDS.DBSecurityGroupIngress("BasicIngressRule", {
  DBSecurityGroupName: "MyDBSecurityGroup",
  CIDRIP: "192.168.1.0/24" // Allow access from this CIDR block
});
```

## Advanced Configuration

Configure an ingress rule that allows access from another EC2 security group.

```ts
const EC2SecurityGroupIngressRule = await AWS.RDS.DBSecurityGroupIngress("EC2SecurityGroupIngressRule", {
  DBSecurityGroupName: "MyDBSecurityGroup",
  EC2SecurityGroupId: "sg-0abcd1234efgh5678" // Allow access from this EC2 security group
});
```

## Adopt Existing Resource

Use the `adopt` property to adopt an existing resource instead of failing if it already exists.

```ts
const AdoptExistingRule = await AWS.RDS.DBSecurityGroupIngress("AdoptExistingRule", {
  DBSecurityGroupName: "MyDBSecurityGroup",
  CIDRIP: "10.0.0.0/16", // This rule may already exist
  adopt: true // Adopt existing rule if found
});
```

## Multiple Ingress Rules

Create multiple ingress rules for different CIDR blocks and EC2 security groups.

```ts
const MultiIngressRule = await AWS.RDS.DBSecurityGroupIngress("MultiIngressRule", {
  DBSecurityGroupName: "MyDBSecurityGroup",
  CIDRIP: "203.0.113.0/24", // Rule 1
  EC2SecurityGroupId: "sg-0abcd1234efgh5678", // Rule 2
  adopt: true // Adopt existing rules if they already exist
});
```
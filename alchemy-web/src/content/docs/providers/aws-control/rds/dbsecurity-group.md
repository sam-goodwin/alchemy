---
title: DBSecurityGroup
description: Learn how to create, update, and manage AWS RDS DBSecurityGroups using Alchemy Cloud Control.
---


The DBSecurityGroup resource allows you to manage [AWS RDS DBSecurityGroups](https://docs.aws.amazon.com/rds/latest/userguide/) to control access to your Amazon RDS databases.

## Minimal Example

Create a basic DBSecurityGroup with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const dbSecurityGroup = await AWS.RDS.DBSecurityGroup("myDbSecurityGroup", {
  GroupDescription: "Security group for my RDS instance",
  DBSecurityGroupIngress: [
    {
      CIDRIP: "203.0.113.0/24",
      FromPort: 3306,
      ToPort: 3306,
      IpProtocol: "tcp"
    }
  ],
  EC2VpcId: "vpc-0abcd1234efgh5678", // Optional VPC ID
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a DBSecurityGroup with multiple ingress rules for different protocols and ports.

```ts
const advancedDbSecurityGroup = await AWS.RDS.DBSecurityGroup("advancedDbSecurityGroup", {
  GroupDescription: "Advanced security group for RDS with multiple ingress rules",
  DBSecurityGroupIngress: [
    {
      CIDRIP: "192.0.2.0/24",
      FromPort: 5432,
      ToPort: 5432,
      IpProtocol: "tcp"
    },
    {
      CIDRIP: "198.51.100.0/24",
      FromPort: 3306,
      ToPort: 3306,
      IpProtocol: "tcp"
    }
  ],
  EC2VpcId: "vpc-0abcd1234efgh5678", // Optional VPC ID
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing DBSecurityGroup instead of creating a new one, you can do so like this:

```ts
const existingDbSecurityGroup = await AWS.RDS.DBSecurityGroup("existingDbSecurityGroup", {
  GroupDescription: "Existing RDS DBSecurityGroup to adopt",
  DBSecurityGroupIngress: [
    {
      CIDRIP: "203.0.113.0/24",
      FromPort: 3306,
      ToPort: 3306,
      IpProtocol: "tcp"
    }
  ],
  adopt: true // Adopt existing resource
});
```

## Tagging Example

Create a DBSecurityGroup with tags for better resource management.

```ts
const taggedDbSecurityGroup = await AWS.RDS.DBSecurityGroup("taggedDbSecurityGroup", {
  GroupDescription: "Security group with detailed tagging",
  DBSecurityGroupIngress: [
    {
      CIDRIP: "10.0.0.0/16",
      FromPort: 3306,
      ToPort: 3306,
      IpProtocol: "tcp"
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "Database Migration"
    },
    {
      Key: "Owner",
      Value: "Database Team"
    }
  ]
});
```

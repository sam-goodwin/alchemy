---
title: Managing AWS ElastiCache SecurityGroups with Alchemy
description: Learn how to create, update, and manage AWS ElastiCache SecurityGroups using Alchemy Cloud Control.
---

# SecurityGroup

The SecurityGroup resource allows you to manage [AWS ElastiCache SecurityGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) which are used to control access to ElastiCache clusters.

## Minimal Example

Create a basic ElastiCache SecurityGroup with a description and tags.

```ts
import AWS from "alchemy/aws/control";

const BasicSecurityGroup = await AWS.ElastiCache.SecurityGroup("basic-security-group", {
  Description: "Basic security group for ElastiCache",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Backend" }
  ]
});
```

## Advanced Configuration

Configure an ElastiCache SecurityGroup with optional properties, including a description and adopting an existing resource.

```ts
const AdvancedSecurityGroup = await AWS.ElastiCache.SecurityGroup("advanced-security-group", {
  Description: "Advanced security group for production ElastiCache",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Data Services" }
  ],
  adopt: true
});
```

## Security Group for Multiple Subnets

Create a SecurityGroup that allows access from a specific CIDR block for a multi-subnet setup.

```ts
const MultiSubnetSecurityGroup = await AWS.ElastiCache.SecurityGroup("multi-subnet-security-group", {
  Description: "Security group allowing access from specific CIDR blocks",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ],
  adopt: false
});

// Note: Additional configuration for inbound rules should be done in the associated VPC settings.
```

## Security Group with Specific Inbound Rules

While the SecurityGroup resource itself does not directly configure inbound rules, you can associate it with an existing VPC and configure inbound rules as required.

```ts
const SecurityGroupWithRules = await AWS.ElastiCache.SecurityGroup("security-group-with-rules", {
  Description: "Security group with specific inbound rules",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ],
  adopt: false
});

// Inbound rules for this SecurityGroup should be defined in the VPC security group settings.
```
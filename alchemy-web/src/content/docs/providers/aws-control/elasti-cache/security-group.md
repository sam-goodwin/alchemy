---
title: SecurityGroup
description: Learn how to create, update, and manage AWS ElastiCache SecurityGroups using Alchemy Cloud Control.
---


The SecurityGroup resource lets you manage [AWS ElastiCache SecurityGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) for controlling access to your ElastiCache clusters.

## Minimal Example

Create a basic ElastiCache SecurityGroup with a description and tags.

```ts
import AWS from "alchemy/aws/control";

const basicSecurityGroup = await AWS.ElastiCache.SecurityGroup("basicSecurityGroup", {
  Description: "Basic Security Group for ElastiCache",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "SampleProject" }
  ]
});
```

## Advanced Configuration

Configure a SecurityGroup with existing resource adoption.

```ts
const advancedSecurityGroup = await AWS.ElastiCache.SecurityGroup("advancedSecurityGroup", {
  Description: "Advanced Security Group for ElastiCache with adoption",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "CriticalProject" }
  ],
  adopt: true
});
```

## Security Group with Custom Properties

Create a SecurityGroup with a specific description and without tags.

```ts
const customSecurityGroup = await AWS.ElastiCache.SecurityGroup("customSecurityGroup", {
  Description: "Custom Security Group for specific use cases"
});
```

## Security Group Adoption

Demonstrate how to adopt an existing SecurityGroup.

```ts
const existingSecurityGroup = await AWS.ElastiCache.SecurityGroup("existingSecurityGroup", {
  Description: "Adopting an existing Security Group",
  adopt: true
});
```

---
title: SecurityGroupIngress
description: Learn how to create, update, and manage AWS ElastiCache SecurityGroupIngresss using Alchemy Cloud Control.
---


The SecurityGroupIngress resource allows you to manage the inbound access rules for an Amazon ElastiCache security group. This resource is essential for controlling which EC2 security groups can communicate with your ElastiCache cluster. For more information, visit the [AWS ElastiCache SecurityGroupIngress documentation](https://docs.aws.amazon.com/elasticache/latest/userguide/).

## Minimal Example

Create a basic SecurityGroupIngress with the required properties.

```ts
import AWS from "alchemy/aws/control";

const securityGroupIngress = await AWS.ElastiCache.SecurityGroupIngress("defaultIngressRule", {
  CacheSecurityGroupName: "myCacheSecurityGroup",
  EC2SecurityGroupName: "myEC2SecurityGroup"
});
```

## Advanced Configuration

You can specify the owner ID of the EC2 security group for more granular control.

```ts
const advancedSecurityGroupIngress = await AWS.ElastiCache.SecurityGroupIngress("advancedIngressRule", {
  CacheSecurityGroupName: "myCacheSecurityGroup",
  EC2SecurityGroupName: "myEC2SecurityGroup",
  EC2SecurityGroupOwnerId: "123456789012"
});
```

## Adopting Existing Resources

If you want to adopt an existing SecurityGroupIngress instead of failing if it already exists, you can set the `adopt` property to true.

```ts
const adoptSecurityGroupIngress = await AWS.ElastiCache.SecurityGroupIngress("adoptedIngressRule", {
  CacheSecurityGroupName: "myCacheSecurityGroup",
  EC2SecurityGroupName: "myEC2SecurityGroup",
  adopt: true
});
```

## Multiple Ingress Rules

You can create multiple SecurityGroupIngress resources to allow access from different EC2 security groups.

```ts
const ingressRule1 = await AWS.ElastiCache.SecurityGroupIngress("ingressRule1", {
  CacheSecurityGroupName: "myCacheSecurityGroup",
  EC2SecurityGroupName: "webServerSecurityGroup"
});

const ingressRule2 = await AWS.ElastiCache.SecurityGroupIngress("ingressRule2", {
  CacheSecurityGroupName: "myCacheSecurityGroup",
  EC2SecurityGroupName: "dbSecurityGroup"
});
```

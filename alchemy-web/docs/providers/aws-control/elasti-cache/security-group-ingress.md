---
title: Managing AWS ElastiCache SecurityGroupIngresss with Alchemy
description: Learn how to create, update, and manage AWS ElastiCache SecurityGroupIngresss using Alchemy Cloud Control.
---

# SecurityGroupIngress

The SecurityGroupIngress resource allows you to manage inbound access rules for your AWS ElastiCache Security Groups, providing the ability to control which EC2 Security Groups can access your ElastiCache clusters. For more information, refer to the [AWS ElastiCache SecurityGroupIngress documentation](https://docs.aws.amazon.com/elasticache/latest/userguide/).

## Minimal Example

Create a basic SecurityGroupIngress resource that allows access from a specified EC2 Security Group.

```ts
import AWS from "alchemy/aws/control";

const IngressRule = await AWS.ElastiCache.SecurityGroupIngress("MyIngressRule", {
  CacheSecurityGroupName: "my-elasticache-sec-group",
  EC2SecurityGroupName: "my-ec2-sec-group"
});
```

## Advanced Configuration

Specify an optional EC2 Security Group Owner ID when creating a SecurityGroupIngress resource.

```ts
const AdvancedIngressRule = await AWS.ElastiCache.SecurityGroupIngress("AdvancedIngressRule", {
  CacheSecurityGroupName: "my-elasticache-sec-group",
  EC2SecurityGroupName: "my-ec2-sec-group",
  EC2SecurityGroupOwnerId: "123456789012"
});
```

## Multiple Ingress Rules

You can create multiple ingress rules to allow different EC2 Security Groups access to your ElastiCache cluster.

```ts
const FirstIngressRule = await AWS.ElastiCache.SecurityGroupIngress("FirstIngressRule", {
  CacheSecurityGroupName: "my-elasticache-sec-group",
  EC2SecurityGroupName: "web-app-sec-group"
});

const SecondIngressRule = await AWS.ElastiCache.SecurityGroupIngress("SecondIngressRule", {
  CacheSecurityGroupName: "my-elasticache-sec-group",
  EC2SecurityGroupName: "data-processing-sec-group",
  EC2SecurityGroupOwnerId: "123456789012"
});
```

## Adopt Existing Resource

If you want to adopt an existing SecurityGroupIngress resource instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const AdoptedIngressRule = await AWS.ElastiCache.SecurityGroupIngress("AdoptedIngressRule", {
  CacheSecurityGroupName: "my-elasticache-sec-group",
  EC2SecurityGroupName: "adopted-sec-group",
  adopt: true
});
```
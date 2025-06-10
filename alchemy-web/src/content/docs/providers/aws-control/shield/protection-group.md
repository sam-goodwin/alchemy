---
title: ProtectionGroup
description: Learn how to create, update, and manage AWS Shield ProtectionGroups using Alchemy Cloud Control.
---


The ProtectionGroup resource lets you manage [AWS Shield ProtectionGroups](https://docs.aws.amazon.com/shield/latest/userguide/) for your AWS resources, providing an additional layer of protection against DDoS attacks.

## Minimal Example

Create a basic ProtectionGroup with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicProtectionGroup = await AWS.Shield.ProtectionGroup("basicProtectionGroup", {
  Aggregation: "Sum",
  Pattern: "ALL",
  ProtectionGroupId: "my-protection-group",
  ResourceType: "AWS::ElasticLoadBalancingV2::LoadBalancer"
});
```

## Advanced Configuration

Configure a ProtectionGroup with multiple members for enhanced DDoS protection.

```ts
const advancedProtectionGroup = await AWS.Shield.ProtectionGroup("advancedProtectionGroup", {
  Aggregation: "Average",
  Pattern: "APPLICATION_LOAD_BALANCER",
  ProtectionGroupId: "my-advanced-protection-group",
  Members: [
    "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-load-balancer/50dc6c495c0c9188",
    "arn:aws:ec2:us-east-1:123456789012:instance/i-1234567890abcdef0"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Using Existing Resources

Create a ProtectionGroup that adopts existing resources instead of failing if they already exist.

```ts
const adoptedProtectionGroup = await AWS.Shield.ProtectionGroup("adoptedProtectionGroup", {
  Aggregation: "Sum",
  Pattern: "CLOUDFRONT",
  ProtectionGroupId: "my-adopted-protection-group",
  adopt: true
});
```

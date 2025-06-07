---
title: Managing AWS Shield ProtectionGroups with Alchemy
description: Learn how to create, update, and manage AWS Shield ProtectionGroups using Alchemy Cloud Control.
---

# ProtectionGroup

The ProtectionGroup resource allows you to manage [AWS Shield ProtectionGroups](https://docs.aws.amazon.com/shield/latest/userguide/) for protecting your resources from DDoS attacks.

## Minimal Example

Create a basic ProtectionGroup with required properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const BasicProtectionGroup = await AWS.Shield.ProtectionGroup("BasicProtectionGroup", {
  Aggregation: "SUM",
  Pattern: "ALL",
  ProtectionGroupId: "MyProtectionGroup",
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Configure a ProtectionGroup with additional members and specify the resource type.

```ts
const AdvancedProtectionGroup = await AWS.Shield.ProtectionGroup("AdvancedProtectionGroup", {
  Aggregation: "AVG",
  Pattern: "BY_RESOURCE_TYPE",
  ProtectionGroupId: "AdvancedProtectionGroup",
  ResourceType: "AWS::ElasticLoadBalancingV2::LoadBalancer",
  Members: [
    "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/app/my-load-balancer/50dc6c495c0c9188",
    "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/net/my-network-load-balancer/1234567890abcdef"
  ],
  Tags: [{ Key: "Team", Value: "Security" }]
});
```

## Adoption of Existing Resources

Adopt an existing ProtectionGroup if it already exists by setting the adoption flag.

```ts
const AdoptExistingProtectionGroup = await AWS.Shield.ProtectionGroup("AdoptExistingProtectionGroup", {
  Aggregation: "MAX",
  Pattern: "ALL",
  ProtectionGroupId: "ExistingProtectionGroupId",
  adopt: true // This will adopt the existing resource instead of failing
});
```
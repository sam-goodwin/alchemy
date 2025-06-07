---
title: Managing AWS Application Load Balancer TargetGroups with Alchemy
description: Learn how to create, update, and manage AWS Application Load Balancer TargetGroups using Alchemy Cloud Control.
---

# TargetGroup

The TargetGroup resource lets you manage [AWS Application Load Balancer TargetGroups](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) to direct traffic to your application targets.

## Minimal Example

Create a basic TargetGroup with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicTargetGroup = await AWS.ElasticLoadBalancingV2.TargetGroup("BasicTargetGroup", {
  Name: "my-target-group",
  Port: 80,
  Protocol: "HTTP",
  VpcId: "vpc-123abc45",
  HealthCheckPath: "/health",
  HealthCheckIntervalSeconds: 30,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a TargetGroup with advanced health check settings and attributes.

```ts
const AdvancedTargetGroup = await AWS.ElasticLoadBalancingV2.TargetGroup("AdvancedTargetGroup", {
  Name: "my-advanced-target-group",
  Port: 443,
  Protocol: "HTTPS",
  VpcId: "vpc-678def90",
  HealthCheckPath: "/healthcheck",
  HealthCheckIntervalSeconds: 15,
  HealthCheckEnabled: true,
  HealthCheckProtocol: "HTTP",
  HealthCheckTimeoutSeconds: 5,
  HealthyThresholdCount: 2,
  UnhealthyThresholdCount: 3,
  TargetGroupAttributes: [
    { Key: "stickiness.enabled", Value: "true" },
    { Key: "stickiness.type", Value: "lb_cookie" }
  ]
});
```

## Register Targets Example

Register specific targets (instances) to the TargetGroup for load balancing.

```ts
const RegisterTargets = await AWS.ElasticLoadBalancingV2.TargetGroup("RegisterTargets", {
  Name: "my-target-group-register",
  Port: 80,
  Protocol: "HTTP",
  VpcId: "vpc-123abc45",
  Targets: [
    { Id: "i-0123456789abcdef0", Port: 80 },
    { Id: "i-0abcdef1234567890", Port: 80 }
  ]
});
```

## Custom IP Address Type

Create a TargetGroup with a custom IP address type.

```ts
const CustomIpAddressTypeTargetGroup = await AWS.ElasticLoadBalancingV2.TargetGroup("CustomIpAddressTypeTargetGroup", {
  Name: "my-custom-ip-target-group",
  Port: 8080,
  Protocol: "HTTP",
  VpcId: "vpc-0abcdef1234567890",
  IpAddressType: "ipv4",
  HealthCheckPath: "/healthcheck",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```
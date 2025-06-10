---
title: TargetGroup
description: Learn how to create, update, and manage AWS Application Load Balancer TargetGroups using Alchemy Cloud Control.
---


The TargetGroup resource lets you manage [AWS Application Load Balancer TargetGroups](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic TargetGroup with required properties and a couple of common optional properties.

```ts
import AWS from "alchemy/aws/control";

const targetGroup = await AWS.ElasticLoadBalancingV2.TargetGroup("myTargetGroup", {
  name: "my-app-target-group",
  port: 80,
  protocol: "HTTP",
  vpcId: "vpc-12345678",
  healthCheckEnabled: true,
  healthCheckPath: "/health",
  healthyThresholdCount: 3,
  unhealthyThresholdCount: 2
});
```

## Advanced Configuration

Configure a TargetGroup with advanced settings, including health check configurations and target type.

```ts
const advancedTargetGroup = await AWS.ElasticLoadBalancingV2.TargetGroup("advancedTargetGroup", {
  name: "my-advanced-app-target-group",
  port: 8080,
  protocol: "HTTP",
  vpcId: "vpc-12345678",
  healthCheckEnabled: true,
  healthCheckPath: "/health",
  healthCheckIntervalSeconds: 30,
  healthCheckTimeoutSeconds: 5,
  healthyThresholdCount: 5,
  unhealthyThresholdCount: 2,
  targets: [
    {
      id: "i-1234567890abcdef0",
      port: 8080
    }
  ],
  targetType: "instance"
});
```

## Using IP Address Type

Create a TargetGroup that uses IP addresses as targets.

```ts
const ipTargetGroup = await AWS.ElasticLoadBalancingV2.TargetGroup("ipTargetGroup", {
  name: "my-ip-target-group",
  port: 80,
  protocol: "HTTP",
  vpcId: "vpc-12345678",
  ipAddressType: "ipv4",
  targets: [
    {
      id: "192.0.2.1",
      port: 80
    },
    {
      id: "192.0.2.2",
      port: 80
    }
  ],
  healthCheckEnabled: true,
  healthCheckPath: "/health"
});
```

## Custom Target Group Attributes

Configure a TargetGroup with custom attributes for stickiness and deregistration delay.

```ts
const customAttributeTargetGroup = await AWS.ElasticLoadBalancingV2.TargetGroup("customAttrTargetGroup", {
  name: "my-custom-attr-target-group",
  port: 80,
  protocol: "HTTP",
  vpcId: "vpc-12345678",
  targetGroupAttributes: [
    {
      key: "stickiness.enabled",
      value: "true"
    },
    {
      key: "stickiness.lb_cookie.duration_seconds",
      value: "86400"
    },
    {
      key: "deregistration_delay.timeout_seconds",
      value: "300"
    }
  ]
});
```

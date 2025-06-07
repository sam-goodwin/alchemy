---
title: Managing AWS Lightsail LoadBalancers with Alchemy
description: Learn how to create, update, and manage AWS Lightsail LoadBalancers using Alchemy Cloud Control.
---

# LoadBalancer

The LoadBalancer resource lets you create and manage [AWS Lightsail LoadBalancers](https://docs.aws.amazon.com/lightsail/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lightsail-loadbalancer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const loadbalancer = await AWS.Lightsail.LoadBalancer("loadbalancer-example", {
  LoadBalancerName: "loadbalancer-loadbalancer",
  InstancePort: 443,
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a loadbalancer with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLoadBalancer = await AWS.Lightsail.LoadBalancer("advanced-loadbalancer", {
  LoadBalancerName: "loadbalancer-loadbalancer",
  InstancePort: 443,
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


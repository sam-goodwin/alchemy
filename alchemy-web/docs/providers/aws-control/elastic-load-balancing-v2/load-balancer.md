---
title: Managing AWS Application Load Balancer LoadBalancers with Alchemy
description: Learn how to create, update, and manage AWS Application Load Balancer LoadBalancers using Alchemy Cloud Control.
---

# LoadBalancer

The LoadBalancer resource lets you create and manage [AWS Application Load Balancer LoadBalancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-loadbalancer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const loadbalancer = await AWS.ElasticLoadBalancingV2.LoadBalancer("loadbalancer-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a loadbalancer with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLoadBalancer = await AWS.ElasticLoadBalancingV2.LoadBalancer(
  "advanced-loadbalancer",
  {
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```


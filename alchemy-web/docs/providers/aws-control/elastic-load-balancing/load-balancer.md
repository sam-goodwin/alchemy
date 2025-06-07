---
title: Managing AWS ElasticLoadBalancing LoadBalancers with Alchemy
description: Learn how to create, update, and manage AWS ElasticLoadBalancing LoadBalancers using Alchemy Cloud Control.
---

# LoadBalancer

The LoadBalancer resource lets you create and manage [AWS ElasticLoadBalancing LoadBalancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-elb.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const loadbalancer = await AWS.ElasticLoadBalancing.LoadBalancer("loadbalancer-example", {
  Listeners: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a loadbalancer with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLoadBalancer = await AWS.ElasticLoadBalancing.LoadBalancer("advanced-loadbalancer", {
  Listeners: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


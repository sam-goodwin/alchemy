---
title: Managing AWS Application Load Balancer Listeners with Alchemy
description: Learn how to create, update, and manage AWS Application Load Balancer Listeners using Alchemy Cloud Control.
---

# Listener

The Listener resource lets you create and manage [AWS Application Load Balancer Listeners](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-listener.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const listener = await AWS.ElasticLoadBalancingV2.Listener("listener-example", {
  LoadBalancerArn: "example-loadbalancerarn",
  DefaultActions: [],
});
```


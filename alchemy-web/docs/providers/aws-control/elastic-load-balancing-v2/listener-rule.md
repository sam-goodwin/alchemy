---
title: Managing AWS Application Load Balancer ListenerRules with Alchemy
description: Learn how to create, update, and manage AWS Application Load Balancer ListenerRules using Alchemy Cloud Control.
---

# ListenerRule

The ListenerRule resource lets you create and manage [AWS Application Load Balancer ListenerRules](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-listenerrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const listenerrule = await AWS.ElasticLoadBalancingV2.ListenerRule("listenerrule-example", {
  Actions: [],
  Priority: 1,
  Conditions: [],
});
```


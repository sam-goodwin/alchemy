---
title: ListenerRule
description: Learn how to create, update, and manage AWS Application Load Balancer ListenerRules using Alchemy Cloud Control.
---


The ListenerRule resource allows you to manage [AWS Application Load Balancer ListenerRules](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) that define how requests are routed to targets based on specified conditions.

## Minimal Example

Create a basic ListenerRule with required properties such as ListenerArn, Actions, Priority, and Conditions.

```ts
import AWS from "alchemy/aws/control";

const basicListenerRule = await AWS.ElasticLoadBalancingV2.ListenerRule("basicListenerRule", {
  ListenerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:listener/app/my-load-balancer/50dc6c495c0c9188",
  Actions: [{
    Type: "forward",
    TargetGroupArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-target-group/73e2d6bc24d8a067"
  }],
  Priority: 10,
  Conditions: [{
    Field: "path-pattern",
    Values: ["/images/*"]
  }]
});
```

## Advanced Configuration

Configure a ListenerRule with additional settings like multiple actions and complex conditions.

```ts
const advancedListenerRule = await AWS.ElasticLoadBalancingV2.ListenerRule("advancedListenerRule", {
  ListenerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:listener/app/my-load-balancer/50dc6c495c0c9188",
  Actions: [
    {
      Type: "forward",
      TargetGroupArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-target-group/73e2d6bc24d8a067"
    },
    {
      Type: "fixed-response",
      FixedResponseConfig: {
        ContentType: "text/plain",
        MessageBody: "Service Unavailable",
        StatusCode: "503"
      }
    }
  ],
  Priority: 20,
  Conditions: [
    {
      Field: "host-header",
      Values: ["example.com"]
    },
    {
      Field: "path-pattern",
      Values: ["/api/*"]
    }
  ]
});
```

## Redirect to HTTPS

Create a ListenerRule that redirects HTTP traffic to HTTPS.

```ts
const redirectListenerRule = await AWS.ElasticLoadBalancingV2.ListenerRule("redirectListenerRule", {
  ListenerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:listener/app/my-load-balancer/50dc6c495c0c9188",
  Actions: [{
    Type: "redirect",
    RedirectConfig: {
      Host: "#{host}",
      Path: "/#{path}",
      Port: "443",
      Protocol: "HTTPS",
      Query: "#{query}",
      StatusCode: "HTTP_301"
    }
  }],
  Priority: 30,
  Conditions: [{
    Field: "path-pattern",
    Values: ["/*"]
  }]
});
```

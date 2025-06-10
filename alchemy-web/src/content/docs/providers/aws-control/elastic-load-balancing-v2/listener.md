---
title: Listener
description: Learn how to create, update, and manage AWS Application Load Balancer Listeners using Alchemy Cloud Control.
---


The Listener resource allows you to manage [AWS Application Load Balancer Listeners](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) and their associated settings.

## Minimal Example

Create a basic listener for an Application Load Balancer with the required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const applicationLoadBalancerListener = await AWS.ElasticLoadBalancingV2.Listener("myListener", {
  LoadBalancerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/app/my-loadbalancer/50dc6c495c0c9188",
  DefaultActions: [
    {
      Type: "forward",
      TargetGroupArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-target-group/73e2d6bc24d9a0c6"
    }
  ],
  Port: 443,
  Protocol: "HTTPS",
  SslPolicy: "ELBSecurityPolicy-2016-08",
  Certificates: [
    {
      CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/12345678-abcd-1234-abcd-12345678abcd"
    }
  ]
});
```

## Advanced Configuration

Configure a listener with advanced settings such as mutual authentication and ALPN policy.

```ts
const advancedListener = await AWS.ElasticLoadBalancingV2.Listener("advancedListener", {
  LoadBalancerArn: "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-advanced-loadbalancer/50dc6c495c0c9188",
  DefaultActions: [
    {
      Type: "redirect",
      RedirectConfig: {
        Host: "#{host}",
        Path: "/newpath",
        Port: "443",
        Protocol: "HTTPS",
        Query: "#{query}",
        StatusCode: "HTTP_301"
      }
    }
  ],
  Port: 443,
  Protocol: "HTTPS",
  SslPolicy: "ELBSecurityPolicy-TLS-1-2-2017-01",
  AlpnPolicy: ["HTTP/2"],
  MutualAuthentication: {
    Truststore: {
      CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-abcd-1234-abcd-12345678abcd"
    },
    ClientAuthEnabled: true
  }
});
```

## Listener with Multiple Actions

Create a listener that handles multiple actions based on path patterns.

```ts
const multiActionListener = await AWS.ElasticLoadBalancingV2.Listener("multiActionListener", {
  LoadBalancerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/app/my-multi-action-loadbalancer/50dc6c495c0c9188",
  DefaultActions: [
    {
      Type: "forward",
      TargetGroupArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-app/73e2d6bc24d9a0c6"
    },
    {
      Type: "forward",
      TargetGroupArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-admin/73e2d6bc24d9a0c6",
      Conditions: [
        {
          Field: "path-pattern",
          Values: ["/admin/*"]
        }
      ]
    }
  ],
  Port: 80,
  Protocol: "HTTP"
});
```

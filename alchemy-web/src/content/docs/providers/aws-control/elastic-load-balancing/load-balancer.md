---
title: LoadBalancer
description: Learn how to create, update, and manage AWS ElasticLoadBalancing LoadBalancers using Alchemy Cloud Control.
---


The LoadBalancer resource lets you manage [AWS ElasticLoadBalancing LoadBalancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic load balancer with required properties and common optional settings such as access logging and security groups.

```ts
import AWS from "alchemy/aws/control";

const basicLoadBalancer = await AWS.ElasticLoadBalancing.LoadBalancer("basic-load-balancer", {
  LoadBalancerName: "my-load-balancer",
  Listeners: [{
    LoadBalancerPort: 80,
    InstancePort: 80,
    Protocol: "HTTP"
  }],
  AvailabilityZones: ["us-west-2a", "us-west-2b"],
  SecurityGroups: ["sg-0123456789abcdef0"],
  Subnets: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"]
});
```

## Advanced Configuration

Configure a load balancer with advanced settings including connection draining, health checks, and sticky sessions.

```ts
const advancedLoadBalancer = await AWS.ElasticLoadBalancing.LoadBalancer("advanced-load-balancer", {
  LoadBalancerName: "my-advanced-load-balancer",
  Listeners: [{
    LoadBalancerPort: 80,
    InstancePort: 80,
    Protocol: "HTTP"
  }],
  HealthCheck: {
    Target: "HTTP:80/",
    Interval: 30,
    Timeout: 5,
    HealthyThreshold: 2,
    UnhealthyThreshold: 2
  },
  ConnectionDrainingPolicy: {
    Enabled: true,
    Timeout: 300
  },
  AppCookieStickinessPolicy: [{
    PolicyName: "my-app-cookie-policy",
    CookieName: "app_cookie"
  }],
  AvailabilityZones: ["us-west-2a", "us-west-2b"],
  SecurityGroups: ["sg-0123456789abcdef0"],
  Subnets: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"]
});
```

## Custom Policies

Define custom policies for your load balancer for more granular control.

```ts
const customPolicyLoadBalancer = await AWS.ElasticLoadBalancing.LoadBalancer("custom-policy-load-balancer", {
  LoadBalancerName: "my-custom-policy-load-balancer",
  Listeners: [{
    LoadBalancerPort: 443,
    InstancePort: 80,
    Protocol: "HTTPS",
    SSLCertificateId: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv"
  }],
  Policies: [{
    PolicyName: "my-iam-policy",
    PolicyType: "CookieStickiness",
    PolicyAttributes: [{
      Name: "CookieName",
      Value: "my_cookie"
    }]
  }],
  AvailabilityZones: ["us-west-2a", "us-west-2b"],
  SecurityGroups: ["sg-0123456789abcdef0"],
  Subnets: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"]
});
```

## Cross-Zone Load Balancing

Create a load balancer with cross-zone load balancing enabled for better traffic distribution.

```ts
const crossZoneLoadBalancer = await AWS.ElasticLoadBalancing.LoadBalancer("cross-zone-load-balancer", {
  LoadBalancerName: "my-cross-zone-load-balancer",
  Listeners: [{
    LoadBalancerPort: 80,
    InstancePort: 80,
    Protocol: "HTTP"
  }],
  CrossZone: true,
  AvailabilityZones: ["us-west-2a", "us-west-2b"],
  SecurityGroups: ["sg-0123456789abcdef0"],
  Subnets: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"]
});
```

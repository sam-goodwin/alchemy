---
title: LoadBalancer
description: Learn how to create, update, and manage AWS Lightsail LoadBalancers using Alchemy Cloud Control.
---


The LoadBalancer resource allows you to manage [AWS Lightsail LoadBalancers](https://docs.aws.amazon.com/lightsail/latest/userguide/) for distributing traffic across multiple instances.

## Minimal Example

Create a basic LoadBalancer with required properties and a common optional property for session stickiness.

```ts
import AWS from "alchemy/aws/control";

const basicLoadBalancer = await AWS.Lightsail.LoadBalancer("basic-load-balancer", {
  LoadBalancerName: "my-load-balancer",
  InstancePort: 80,
  SessionStickinessEnabled: true,
  SessionStickinessLBCookieDurationSeconds: "300" // 5 minutes
});
```

## Advanced Configuration

Configure a LoadBalancer with additional options like health check path and attached instances.

```ts
const advancedLoadBalancer = await AWS.Lightsail.LoadBalancer("advanced-load-balancer", {
  LoadBalancerName: "my-advanced-load-balancer",
  InstancePort: 8080,
  HealthCheckPath: "/health",
  AttachedInstances: ["i-1234567890abcdef0", "i-abcdef01234567890"], // Replace with actual instance IDs
  TlsPolicyName: "TLS-1-2-2019-07" // Example TLS policy
});
```

## Custom IP Address Type

Create a LoadBalancer that uses a specific IP address type.

```ts
const ipLoadBalancer = await AWS.Lightsail.LoadBalancer("ip-load-balancer", {
  LoadBalancerName: "my-ip-load-balancer",
  InstancePort: 443,
  IpAddressType: "ipv6", // Using IPv6 address type
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## LoadBalancer with Tagging

Create a LoadBalancer with tags for better resource management.

```ts
const taggedLoadBalancer = await AWS.Lightsail.LoadBalancer("tagged-load-balancer", {
  LoadBalancerName: "my-tagged-load-balancer",
  InstancePort: 80,
  Tags: [
    { Key: "Department", Value: "IT" },
    { Key: "CostCenter", Value: "12345" }
  ]
});
```

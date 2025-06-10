---
title: LoadBalancer
description: Learn how to create, update, and manage AWS Application Load Balancer LoadBalancers using Alchemy Cloud Control.
---


The LoadBalancer resource lets you manage [AWS Application Load Balancer LoadBalancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Application Load Balancer with essential properties including security groups and subnets.

```ts
import AWS from "alchemy/aws/control";

const basicLoadBalancer = await AWS.ElasticLoadBalancingV2.LoadBalancer("basicLoadBalancer", {
  name: "my-load-balancer",
  securityGroups: ["sg-0123456789abcdef0"],
  subnets: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"],
  scheme: "internet-facing"
});
```

## Advanced Configuration

Configure a LoadBalancer with advanced features such as attributes and tags for better management.

```ts
const advancedLoadBalancer = await AWS.ElasticLoadBalancingV2.LoadBalancer("advancedLoadBalancer", {
  name: "advanced-load-balancer",
  securityGroups: ["sg-0123456789abcdef0"],
  subnets: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"],
  loadBalancerAttributes: [
    {
      key: "deletion_protection.enabled",
      value: "true"
    },
    {
      key: "access_logs.s3.enabled",
      value: "true"
    }
  ],
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Project",
      value: "MyProject"
    }
  ]
});
```

## Custom IP Address Type

Create a LoadBalancer specifying a custom IP address type to optimize for specific use cases.

```ts
const customIpTypeLoadBalancer = await AWS.ElasticLoadBalancingV2.LoadBalancer("customIpTypeLoadBalancer", {
  name: "custom-ip-type-lb",
  securityGroups: ["sg-0123456789abcdef0"],
  subnets: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"],
  ipAddressType: "dualstack", // Supports both IPv4 and IPv6
  scheme: "internet-facing"
});
```

## Load Balancer with Minimum Capacity

Define a LoadBalancer with a specified minimum capacity to ensure performance under load.

```ts
const minCapacityLoadBalancer = await AWS.ElasticLoadBalancingV2.LoadBalancer("minCapacityLoadBalancer", {
  name: "min-capacity-lb",
  securityGroups: ["sg-0123456789abcdef0"],
  subnets: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"],
  minimumLoadBalancerCapacity: {
    value: 2 // Minimum number of load balancer nodes
  }
});
```

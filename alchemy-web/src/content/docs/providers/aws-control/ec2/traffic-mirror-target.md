---
title: TrafficMirrorTarget
description: Learn how to create, update, and manage AWS EC2 TrafficMirrorTargets using Alchemy Cloud Control.
---


The TrafficMirrorTarget resource allows you to create and manage AWS EC2 Traffic Mirror Targets, which are used to specify the destination for mirrored traffic. For detailed information, refer to the [AWS EC2 TrafficMirrorTargets documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic TrafficMirrorTarget with a Network Load Balancer ARN and a description.

```ts
import AWS from "alchemy/aws/control";

const trafficMirrorTarget = await AWS.EC2.TrafficMirrorTarget("basicTrafficMirrorTarget", {
  NetworkLoadBalancerArn: "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/my-load-balancer/50dc6c495c0c9188",
  Description: "Basic Traffic Mirror Target for Load Balancer"
});
```

## Advanced Configuration

Configure a TrafficMirrorTarget with additional options, including a specific Network Interface ID and tagging.

```ts
const advancedTrafficMirrorTarget = await AWS.EC2.TrafficMirrorTarget("advancedTrafficMirrorTarget", {
  NetworkInterfaceId: "eni-1234567890abcdef0",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "TrafficMonitoring" }
  ]
});
```

## Gateway Load Balancer Endpoint Example

Create a TrafficMirrorTarget that uses a Gateway Load Balancer Endpoint.

```ts
const gwTrafficMirrorTarget = await AWS.EC2.TrafficMirrorTarget("gatewayTrafficMirrorTarget", {
  GatewayLoadBalancerEndpointId: "gwe-1234567890abcdef0",
  Description: "Traffic Mirror Target using Gateway Load Balancer Endpoint"
});
```

## Adoption of Existing Resource

Use the `adopt` property to adopt an existing TrafficMirrorTarget instead of failing if it already exists.

```ts
const adoptedTrafficMirrorTarget = await AWS.EC2.TrafficMirrorTarget("adoptedTrafficMirrorTarget", {
  NetworkLoadBalancerArn: "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/my-existing-load-balancer/50dc6c495c0c9188",
  adopt: true
});
```

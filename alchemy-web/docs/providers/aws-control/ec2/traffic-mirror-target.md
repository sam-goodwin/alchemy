---
title: Managing AWS EC2 TrafficMirrorTargets with Alchemy
description: Learn how to create, update, and manage AWS EC2 TrafficMirrorTargets using Alchemy Cloud Control.
---

# TrafficMirrorTarget

The TrafficMirrorTarget resource allows you to create and manage [AWS EC2 TrafficMirrorTargets](https://docs.aws.amazon.com/ec2/latest/userguide/) for traffic mirroring in your AWS environment. This enables you to capture and inspect network traffic for analysis or monitoring.

## Minimal Example

Create a basic TrafficMirrorTarget using a network interface ID and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicTrafficMirrorTarget = await AWS.EC2.TrafficMirrorTarget("BasicTrafficMirrorTarget", {
  NetworkInterfaceId: "eni-12345678",
  Description: "Basic Traffic Mirror Target for capturing traffic",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Network" }
  ]
});
```

## Advanced Configuration

Configure a TrafficMirrorTarget with a network load balancer ARN and gateway load balancer endpoint ID for more advanced traffic routing.

```ts
const AdvancedTrafficMirrorTarget = await AWS.EC2.TrafficMirrorTarget("AdvancedTrafficMirrorTarget", {
  NetworkLoadBalancerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/net/my-nlb/50dc6c495c0c9188",
  GatewayLoadBalancerEndpointId: "gwlbe-12345678",
  Description: "Advanced Traffic Mirror Target for enhanced traffic management",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Using Multiple Targets

Demonstrate creating multiple TrafficMirrorTargets to capture traffic from different sources.

```ts
const TrafficMirrorTarget1 = await AWS.EC2.TrafficMirrorTarget("TrafficMirrorTarget1", {
  NetworkInterfaceId: "eni-12345678",
  Description: "First Traffic Mirror Target",
  Tags: [{ Key: "Environment", Value: "production" }]
});

const TrafficMirrorTarget2 = await AWS.EC2.TrafficMirrorTarget("TrafficMirrorTarget2", {
  NetworkLoadBalancerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/net/my-nlb/50dc6c495c0c9188",
  Description: "Second Traffic Mirror Target",
  Tags: [{ Key: "Environment", Value: "staging" }]
});
```
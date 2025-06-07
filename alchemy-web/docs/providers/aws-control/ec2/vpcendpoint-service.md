---
title: Managing AWS EC2 VPCEndpointServices with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCEndpointServices using Alchemy Cloud Control.
---

# VPCEndpointService

The VPCEndpointService resource allows you to create and manage [AWS EC2 VPCEndpointServices](https://docs.aws.amazon.com/ec2/latest/userguide/), which enable you to connect your Virtual Private Cloud (VPC) to supported AWS services and VPC endpoint services.

## Minimal Example

Create a basic VPC Endpoint Service with a specified Network Load Balancer ARN:

```ts
import AWS from "alchemy/aws/control";

const VpcEndpointService = await AWS.EC2.VPCEndpointService("MyVpcEndpointService", {
  NetworkLoadBalancerArns: [
    "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/net/MyLoadBalancer/50dc6c495c0c9188"
  ],
  AcceptanceRequired: false,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Advanced Configuration

Configure a VPC Endpoint Service with additional options like Contributor Insights and Gateway Load Balancer ARNs:

```ts
const AdvancedVpcEndpointService = await AWS.EC2.VPCEndpointService("AdvancedVpcEndpointService", {
  NetworkLoadBalancerArns: [
    "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/MyAdvancedLoadBalancer/12345abcdef"
  ],
  GatewayLoadBalancerArns: [
    "arn:aws:elasticloadbalancing:us-east-1:123456789012:gateway-load-balancer/MyGatewayLoadBalancer"
  ],
  ContributorInsightsEnabled: true,
  SupportedIpAddressTypes: ["ipv4"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Custom Acceptance Required

Create a VPC Endpoint Service that requires acceptance from service consumers:

```ts
const AcceptanceRequiredVpcEndpointService = await AWS.EC2.VPCEndpointService("AcceptanceRequiredVpcEndpointService", {
  NetworkLoadBalancerArns: [
    "arn:aws:elasticloadbalancing:us-west-1:123456789012:loadbalancer/net/MyAcceptanceLoadBalancer/67890fghijk"
  ],
  AcceptanceRequired: true,
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Owner", Value: "JohnDoe" }
  ]
});
```

## Multiple Regions Support

Create a VPC Endpoint Service that supports multiple regions:

```ts
const MultiRegionVpcEndpointService = await AWS.EC2.VPCEndpointService("MultiRegionVpcEndpointService", {
  NetworkLoadBalancerArns: [
    "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/MyMultiRegionLoadBalancer/abcde12345"
  ],
  SupportedRegions: ["us-east-1", "us-west-2"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "CrossRegionService" }
  ]
});
```
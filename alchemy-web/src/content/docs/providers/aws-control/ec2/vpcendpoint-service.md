---
title: VPCEndpointService
description: Learn how to create, update, and manage AWS EC2 VPCEndpointServices using Alchemy Cloud Control.
---


The VPCEndpointService resource lets you create and manage [AWS EC2 VPCEndpointServices](https://docs.aws.amazon.com/ec2/latest/userguide/) that enable private connectivity between VPCs and services without exposing the services to the public internet.

## Minimal Example

Create a basic VPC Endpoint Service using a Network Load Balancer.

```ts
import AWS from "alchemy/aws/control";

const vpcEndpointService = await AWS.EC2.VPCEndpointService("myVpcEndpointService", {
  NetworkLoadBalancerArns: [
    "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/my-load-balancer/50dc6c495c0c9188"
  ],
  AcceptanceRequired: false
});
```

## Advanced Configuration

Configure a VPC Endpoint Service with additional options like contributor insights and tags.

```ts
const advancedVpcEndpointService = await AWS.EC2.VPCEndpointService("advancedVpcEndpointService", {
  NetworkLoadBalancerArns: [
    "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/my-load-balancer/50dc6c495c0c9188"
  ],
  ContributorInsightsEnabled: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Using Gateway Load Balancers

Create a VPC Endpoint Service that uses a Gateway Load Balancer for connecting to services.

```ts
const gatewayVpcEndpointService = await AWS.EC2.VPCEndpointService("gatewayVpcEndpointService", {
  GatewayLoadBalancerArns: [
    "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/gateway/my-gateway-lb/1234567890abcdef"
  ],
  PayerResponsibility: "ServiceOwner"
});
```

## Specifying Supported Regions

Set up a VPC Endpoint Service that specifies supported regions for the service.

```ts
const regionalVpcEndpointService = await AWS.EC2.VPCEndpointService("regionalVpcEndpointService", {
  NetworkLoadBalancerArns: [
    "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/my-load-balancer/50dc6c495c0c9188"
  ],
  SupportedRegions: [
    "us-east-1",
    "us-west-2"
  ]
});
```

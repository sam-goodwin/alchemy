---
title: Managing AWS ApiGateway VpcLinks with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway VpcLinks using Alchemy Cloud Control.
---

# VpcLink

The VpcLink resource lets you create and manage [AWS ApiGateway VpcLinks](https://docs.aws.amazon.com/apigateway/latest/userguide/) for connecting your API Gateway to resources in your VPC.

## Minimal Example

Create a basic VpcLink with a description and target ARNs.

```ts
import AWS from "alchemy/aws/control";

const BasicVpcLink = await AWS.ApiGateway.VpcLink("basicVpcLink", {
  Name: "MyVpcLink",
  Description: "A VPC link for my API Gateway",
  TargetArns: [
    "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/net/my-load-balancer/50dc6c495c0c9188"
  ],
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "API Team" }
  ]
});
```

## Advanced Configuration

Create a VpcLink with additional tags and no description for cleaner organization.

```ts
const AdvancedVpcLink = await AWS.ApiGateway.VpcLink("advancedVpcLink", {
  Name: "AdvancedVpcLink",
  TargetArns: [
    "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/net/my-other-load-balancer/50dc6c495c0c9189"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Using Existing VpcLink

If you need to adopt an existing VpcLink rather than creating a new one, set the `adopt` property to true.

```ts
const ExistingVpcLink = await AWS.ApiGateway.VpcLink("existingVpcLink", {
  Name: "ExistingVpcLink",
  TargetArns: [
    "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/net/my-legacy-load-balancer/50dc6c495c0c9190"
  ],
  adopt: true
});
```

This example demonstrates how to configure an existing VpcLink, allowing you to manage it without creating duplicates.
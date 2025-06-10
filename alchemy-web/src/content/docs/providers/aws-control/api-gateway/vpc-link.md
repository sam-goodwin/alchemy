---
title: VpcLink
description: Learn how to create, update, and manage AWS ApiGateway VpcLinks using Alchemy Cloud Control.
---


The VpcLink resource allows you to manage [AWS ApiGateway VpcLinks](https://docs.aws.amazon.com/apigateway/latest/userguide/) which enable private integration between your API Gateway and resources in your Virtual Private Cloud (VPC).

## Minimal Example

Create a basic VpcLink with required properties and one optional description:

```ts
import AWS from "alchemy/aws/control";

const vpcLink = await AWS.ApiGateway.VpcLink("myVpcLink", {
  Name: "MyVpcLink",
  TargetArns: [
    "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/my-load-balancer/50dc6c495c0c9188"
  ],
  Description: "This VpcLink connects to my private load balancer."
});
```

## Advanced Configuration

Configure a VpcLink with additional tags for better resource management:

```ts
const taggedVpcLink = await AWS.ApiGateway.VpcLink("taggedVpcLink", {
  Name: "TaggedVpcLink",
  TargetArns: [
    "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/net/my-private-lb/50dc6c495c0c9188"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Engineering" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing VpcLink instead of failing when it already exists, you can set the `adopt` property to true:

```ts
const existingVpcLink = await AWS.ApiGateway.VpcLink("existingVpcLink", {
  Name: "ExistingVpcLink",
  TargetArns: [
    "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/my-existing-lb/50dc6c495c0c9188"
  ],
  adopt: true
});
```

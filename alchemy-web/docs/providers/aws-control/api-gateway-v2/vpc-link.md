---
title: Managing AWS ApiGatewayV2 VpcLinks with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 VpcLinks using Alchemy Cloud Control.
---

# VpcLink

The VpcLink resource lets you manage [AWS ApiGatewayV2 VpcLinks](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) that enable API Gateway to connect to resources in your Amazon VPC.

## Minimal Example

Create a basic VpcLink with required properties and a common optional tag:

```ts
import AWS from "alchemy/aws/control";

const basicVpcLink = await AWS.ApiGatewayV2.VpcLink("BasicVpcLink", {
  Name: "BasicVpcLink",
  SubnetIds: ["subnet-0abcd1234efgh5678", "subnet-0abcd1234ijkl9012"],
  SecurityGroupIds: ["sg-0abcd1234mnop3456"],
  Tags: [{ Key: "Environment", Value: "development" }]
});
```

## Advanced Configuration

Configure a VpcLink with additional options such as multiple security groups and tags for better resource management:

```ts
const advancedVpcLink = await AWS.ApiGatewayV2.VpcLink("AdvancedVpcLink", {
  Name: "AdvancedVpcLink",
  SubnetIds: ["subnet-0abcd1234efgh5678", "subnet-0abcd1234ijkl9012"],
  SecurityGroupIds: ["sg-0abcd1234mnop3456", "sg-0abcd1234qrst7890"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "API Team" }
  ]
});
```

## Custom VpcLink for Multiple Subnets

Create a VpcLink that connects to multiple subnets for redundancy and availability:

```ts
const multiSubnetVpcLink = await AWS.ApiGatewayV2.VpcLink("MultiSubnetVpcLink", {
  Name: "MultiSubnetVpcLink",
  SubnetIds: [
    "subnet-0abcd1234efgh5678",
    "subnet-0abcd1234ijkl9012",
    "subnet-0abcd1234mnop3456"
  ],
  SecurityGroupIds: ["sg-0abcd1234qrst7890"],
  Tags: [{ Key: "Environment", Value: "staging" }]
});
```

## VpcLink with No Security Groups

Create a VpcLink without specifying any security groups, which can be useful in certain configurations:

```ts
const noSecurityGroupVpcLink = await AWS.ApiGatewayV2.VpcLink("NoSecurityGroupVpcLink", {
  Name: "NoSecurityGroupVpcLink",
  SubnetIds: ["subnet-0abcd1234efgh5678"]
});
```
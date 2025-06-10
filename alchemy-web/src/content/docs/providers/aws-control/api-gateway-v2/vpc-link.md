---
title: VpcLink
description: Learn how to create, update, and manage AWS ApiGatewayV2 VpcLinks using Alchemy Cloud Control.
---


The VpcLink resource allows you to create and manage [AWS ApiGatewayV2 VpcLinks](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) that enable your API Gateway to connect to resources in your Virtual Private Cloud (VPC).

## Minimal Example

Create a basic VpcLink with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicVpcLink = await AWS.ApiGatewayV2.VpcLink("myVpcLink", {
  Name: "MyVpcLink",
  SubnetIds: [
    "subnet-0a1b2c3d4e5f6g7h8",
    "subnet-1a2b3c4d5e6f7g8h9"
  ],
  SecurityGroupIds: [
    "sg-0a1b2c3d4e5f6g7h8"
  ]
});
```

## Advanced Configuration

Configure a VpcLink with additional options such as tags:

```ts
const advancedVpcLink = await AWS.ApiGatewayV2.VpcLink("advancedVpcLink", {
  Name: "AdvancedVpcLink",
  SubnetIds: [
    "subnet-0a1b2c3d4e5f6g7h8",
    "subnet-1a2b3c4d5e6f7g8h9"
  ],
  SecurityGroupIds: [
    "sg-0a1b2c3d4e5f6g7h8"
  ],
  Tags: {
    Environment: "Production",
    Project: "ApiGatewayIntegration"
  }
});
```

## Adoption of Existing Resource

Create a VpcLink that adopts an existing resource if it already exists:

```ts
const adoptVpcLink = await AWS.ApiGatewayV2.VpcLink("adoptVpcLink", {
  Name: "AdoptedVpcLink",
  SubnetIds: [
    "subnet-0a1b2c3d4e5f6g7h8",
    "subnet-1a2b3c4d5e6f7g8h9"
  ],
  SecurityGroupIds: [
    "sg-0a1b2c3d4e5f6g7h8"
  ],
  adopt: true
});
```

## Example with Multiple Subnet and Security Group IDs

Create a VpcLink that connects to multiple subnets and security groups:

```ts
const multiVpcLink = await AWS.ApiGatewayV2.VpcLink("multiVpcLink", {
  Name: "MultiSubnetVpcLink",
  SubnetIds: [
    "subnet-0a1b2c3d4e5f6g7h8",
    "subnet-1a2b3c4d5e6f7g8h9",
    "subnet-2a3b4c5d6e7f8g9h0"
  ],
  SecurityGroupIds: [
    "sg-0a1b2c3d4e5f6g7h8",
    "sg-1b2c3d4e5f6g7h8i"
  ]
});
```

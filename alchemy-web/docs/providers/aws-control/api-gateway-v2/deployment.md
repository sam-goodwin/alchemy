---
title: Managing AWS ApiGatewayV2 Deployments with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 Deployments using Alchemy Cloud Control.
---

# Deployment

The Deployment resource lets you create and manage [AWS ApiGatewayV2 Deployments](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-deployment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const deployment = await AWS.ApiGatewayV2.Deployment("deployment-example", {
  ApiId: "example-apiid",
  Description: "A deployment resource managed by Alchemy",
});
```

## Advanced Configuration

Create a deployment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDeployment = await AWS.ApiGatewayV2.Deployment("advanced-deployment", {
  ApiId: "example-apiid",
  Description: "A deployment resource managed by Alchemy",
});
```


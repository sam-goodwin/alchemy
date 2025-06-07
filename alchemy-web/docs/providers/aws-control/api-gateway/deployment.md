---
title: Managing AWS ApiGateway Deployments with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway Deployments using Alchemy Cloud Control.
---

# Deployment

The Deployment resource lets you create and manage [AWS ApiGateway Deployments](https://docs.aws.amazon.com/apigateway/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-deployment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const deployment = await AWS.ApiGateway.Deployment("deployment-example", {
  RestApiId: "example-restapiid",
  Description: "A deployment resource managed by Alchemy",
});
```

## Advanced Configuration

Create a deployment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDeployment = await AWS.ApiGateway.Deployment("advanced-deployment", {
  RestApiId: "example-restapiid",
  Description: "A deployment resource managed by Alchemy",
});
```


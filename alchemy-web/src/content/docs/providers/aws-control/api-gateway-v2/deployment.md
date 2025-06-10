---
title: Deployment
description: Learn how to create, update, and manage AWS ApiGatewayV2 Deployments using Alchemy Cloud Control.
---


The Deployment resource lets you manage [AWS ApiGatewayV2 Deployments](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) to create and deploy APIs in AWS. This resource facilitates versioning for API changes and allows you to manage your API lifecycle effectively.

## Minimal Example

Create a basic deployment for an API with a description and a stage name:

```ts
import AWS from "alchemy/aws/control";

const apiDeployment = await AWS.ApiGatewayV2.Deployment("myApiDeployment", {
  ApiId: "abc123def456",
  Description: "Initial deployment of my API",
  StageName: "prod"
});
```

## Advanced Configuration

Configure a deployment with additional properties such as adopting existing resources:

```ts
const advancedApiDeployment = await AWS.ApiGatewayV2.Deployment("myAdvancedApiDeployment", {
  ApiId: "abc123def456",
  Description: "Advanced deployment with existing resource adoption",
  StageName: "staging",
  adopt: true
});
```

## Rollback to Previous Version

Demonstrate how to rollback to a previous version of an API by creating a new deployment for the existing API:

```ts
const rollbackDeployment = await AWS.ApiGatewayV2.Deployment("myRollbackDeployment", {
  ApiId: "abc123def456",
  Description: "Rolling back to previous API version",
  StageName: "prod"
});
```

## Deployment with Monitoring

Create a deployment that includes monitoring settings for better observability:

```ts
const monitoredApiDeployment = await AWS.ApiGatewayV2.Deployment("myMonitoredApiDeployment", {
  ApiId: "abc123def456",
  Description: "Deployment with monitoring enabled",
  StageName: "prod",
  adopt: false // Not adopting existing resources for fresh deployment
});
```

---
title: Application
description: Learn how to create, update, and manage AWS RefactorSpaces Applications using Alchemy Cloud Control.
---


The Application resource allows you to manage [AWS RefactorSpaces Applications](https://docs.aws.amazon.com/refactorspaces/latest/userguide/) for microservices development and deployment. This resource provides a streamlined way to create and configure applications within the RefactorSpaces environment.

## Minimal Example

Create a basic application with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const myApplication = await AWS.RefactorSpaces.Application("my-app", {
  environmentIdentifier: "env-123456",
  vpcId: "vpc-abcde123",
  proxyType: "ApiGateway",
  name: "MyApplication",
  apiGatewayProxy: {
    apiGatewayId: "api-123456"
  },
  tags: [
    { key: "Environment", value: "Development" },
    { key: "Project", value: "MyProject" }
  ]
});
```

## Advanced Configuration

Configure an application with more detailed settings, including a specific proxy configuration.

```ts
const advancedApplication = await AWS.RefactorSpaces.Application("advanced-app", {
  environmentIdentifier: "env-654321",
  vpcId: "vpc-xyz9876",
  proxyType: "ApiGateway",
  name: "AdvancedApplication",
  apiGatewayProxy: {
    apiGatewayId: "api-654321",
    stage: "prod",
    endpointType: "regional"
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "DevOps" }
  ]
});
```

## Resource Adoption

Create an application while adopting an existing resource if it already exists.

```ts
const adoptExistingApplication = await AWS.RefactorSpaces.Application("existing-app", {
  environmentIdentifier: "env-789012",
  vpcId: "vpc-uvw456",
  proxyType: "ApiGateway",
  name: "ExistingApplication",
  adopt: true // Adopt existing resource if it already exists
});
```

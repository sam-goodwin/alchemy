---
title: Resource
description: Learn how to create, update, and manage AWS ApiGateway Resources using Alchemy Cloud Control.
---


The ApiGateway Resource allows you to manage [AWS ApiGateway Resources](https://docs.aws.amazon.com/apigateway/latest/userguide/) for creating and configuring API endpoints.

## Minimal Example

Create a basic ApiGateway Resource under a specified parent resource:

```ts
import AWS from "alchemy/aws/control";

const apiResource = await AWS.ApiGateway.Resource("apiResource", {
  ParentId: "abc123xyz", // Replace with an actual ParentId
  PathPart: "users", // The path part for the resource
  RestApiId: "xyz789abc", // Replace with an actual RestApiId
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure an ApiGateway Resource with additional settings such as enabling CORS:

```ts
import AWS from "alchemy/aws/control";

const corsApiResource = await AWS.ApiGateway.Resource("corsApiResource", {
  ParentId: "abc123xyz", // Replace with an actual ParentId
  PathPart: "products", // The path part for the resource
  RestApiId: "xyz789abc", // Replace with an actual RestApiId
  adopt: true // Adopt existing resource if it already exists
});

// Assuming the use of a separate method to configure CORS
await AWS.ApiGateway.Method("corsMethod", {
  HttpMethod: "OPTIONS",
  ResourceId: corsApiResource.id,
  RestApiId: "xyz789abc", // Replace with an actual RestApiId
  AuthorizationType: "NONE",
  MethodResponses: [{
    StatusCode: "200",
    ResponseParameters: {
      "method.response.header.Access-Control-Allow-Origin": true,
      "method.response.header.Access-Control-Allow-Headers": true,
      "method.response.header.Access-Control-Allow-Methods": true
    }
  }],
  RequestParameters: {
    "method.request.header.Origin": true
  },
  Integration: {
    Type: "MOCK",
    RequestTemplates: {
      "application/json": '{"statusCode": 200}'
    }
  }
});
```

## Creating Nested Resources

Create a nested ApiGateway Resource under an existing resource:

```ts
import AWS from "alchemy/aws/control";

const nestedResource = await AWS.ApiGateway.Resource("nestedResource", {
  ParentId: "xyz789abc", // Replace with an actual ParentId of the parent resource
  PathPart: "orders", // The path part for the nested resource
  RestApiId: "xyz789abc", // Replace with an actual RestApiId
  adopt: false // Do not adopt existing resource; fail if it exists
});
```

## Using the Resource in a Method

Demonstrate how to use an ApiGateway Resource in conjunction with a method:

```ts
import AWS from "alchemy/aws/control";

const methodApiResource = await AWS.ApiGateway.Resource("methodApiResource", {
  ParentId: "abc123xyz", // Replace with an actual ParentId
  PathPart: "login", // The path part for the resource
  RestApiId: "xyz789abc", // Replace with an actual RestApiId
  adopt: true // Adopt existing resource if it already exists
});

await AWS.ApiGateway.Method("loginMethod", {
  HttpMethod: "POST",
  ResourceId: methodApiResource.id,
  RestApiId: "xyz789abc", // Replace with an actual RestApiId
  AuthorizationType: "AWS_IAM", // Example of authorization type
  RequestModels: {
    "application/json": "LoginRequest"
  },
  MethodResponses: [{
    StatusCode: "200",
    ResponseModels: {
      "application/json": "LoginResponse"
    }
  }]
});
```

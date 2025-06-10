---
title: Method
description: Learn how to create, update, and manage AWS ApiGateway Methods using Alchemy Cloud Control.
---


The Method resource lets you create and manage [AWS ApiGateway Methods](https://docs.aws.amazon.com/apigateway/latest/userguide/) for your REST APIs, enabling you to define HTTP methods and their integrations.

## Minimal Example

Create a basic ApiGateway Method for a GET request with default settings.

```ts
import AWS from "alchemy/aws/control";

const apiGatewayMethod = await AWS.ApiGateway.Method("getUserMethod", {
  RestApiId: "myApiId",
  ResourceId: "myResourceId",
  HttpMethod: "GET",
  AuthorizationType: "NONE",
  ApiKeyRequired: false
});
```

## Advanced Configuration

Configure a Method with request models and integration settings.

```ts
import AWS from "alchemy/aws/control";

const postUserMethod = await AWS.ApiGateway.Method("postUserMethod", {
  RestApiId: "myApiId",
  ResourceId: "myResourceId",
  HttpMethod: "POST",
  AuthorizationType: "AWS_IAM",
  RequestModels: {
    "application/json": "UserModel"
  },
  Integration: {
    Type: "AWS_PROXY",
    Uri: "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction",
    HttpMethod: "POST"
  },
  MethodResponses: [
    {
      StatusCode: "200",
      ResponseModels: {
        "application/json": "UserResponseModel"
      }
    }
  ]
});
```

## Securing with Authorization Scopes

Create a Method with specific authorization scopes for enhanced security.

```ts
import AWS from "alchemy/aws/control";

const secureGetUserMethod = await AWS.ApiGateway.Method("secureGetUserMethod", {
  RestApiId: "myApiId",
  ResourceId: "myResourceId",
  HttpMethod: "GET",
  AuthorizationType: "AWS_IAM",
  AuthorizationScopes: ["scope1", "scope2"],
  ApiKeyRequired: true
});
```

## Request Validation

Configure a Method with request validation using a validator ID.

```ts
import AWS from "alchemy/aws/control";

const validatedPostUserMethod = await AWS.ApiGateway.Method("validatedPostUserMethod", {
  RestApiId: "myApiId",
  ResourceId: "myResourceId",
  HttpMethod: "POST",
  RequestValidatorId: "myRequestValidatorId",
  RequestParameters: {
    "method.request.querystring.userId": true
  },
  MethodResponses: [
    {
      StatusCode: "201",
      ResponseModels: {
        "application/json": "UserResponseModel"
      }
    }
  ]
});
```

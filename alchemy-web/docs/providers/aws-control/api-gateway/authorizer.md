---
title: Managing AWS ApiGateway Authorizers with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway Authorizers using Alchemy Cloud Control.
---

# Authorizer

The Authorizer resource lets you manage [AWS ApiGateway Authorizers](https://docs.aws.amazon.com/apigateway/latest/userguide/) for your APIs, providing authentication and authorization capabilities.

## Minimal Example

Create a basic authorizer with required properties and one common optional property.

```ts
import AWS from "alchemy/aws/control";

const SimpleAuthorizer = await AWS.ApiGateway.Authorizer("SimpleAuthorizer", {
  RestApiId: "myRestApiId",
  Name: "MySimpleAuthorizer",
  Type: "TOKEN",
  IdentitySource: "method.request.header.Authorization"
});
```

## Advanced Configuration

Configure an authorizer with additional settings including provider ARNs and a custom identity validation expression.

```ts
const AdvancedAuthorizer = await AWS.ApiGateway.Authorizer("AdvancedAuthorizer", {
  RestApiId: "myRestApiId",
  Name: "MyAdvancedAuthorizer",
  Type: "COGNITO_USER_POOLS",
  ProviderARNs: [
    "arn:aws:cognito:us-west-2:123456789012:userpool/us-west-2_aBcDeFgHi"
  ],
  IdentityValidationExpression: "^[A-Za-z0-9-_.]+$",
  AuthorizerResultTtlInSeconds: 300
});
```

## Using Lambda Authorizer

Create an authorizer that uses a Lambda function for custom authorization logic.

```ts
const LambdaAuthorizer = await AWS.ApiGateway.Authorizer("LambdaAuthorizer", {
  RestApiId: "myRestApiId",
  Name: "MyLambdaAuthorizer",
  Type: "REQUEST",
  AuthorizerUri: "arn:aws:apigateway:us-west-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction/invocations",
  AuthorizerCredentials: "arn:aws:iam::123456789012:role/myLambdaRole",
  IdentitySource: "method.request.header.Authorization"
});
```

## Token Validation Example

Create an authorizer with a specific token validation setup for enhanced security.

```ts
const TokenValidationAuthorizer = await AWS.ApiGateway.Authorizer("TokenValidationAuthorizer", {
  RestApiId: "myRestApiId",
  Name: "TokenValidationAuthorizer",
  Type: "TOKEN",
  IdentitySource: "method.request.header.Authorization",
  IdentityValidationExpression: "Bearer [A-Za-z0-9-_.]+",
  AuthorizerResultTtlInSeconds: 60
});
```
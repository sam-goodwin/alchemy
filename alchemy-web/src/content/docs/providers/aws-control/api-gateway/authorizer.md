---
title: Authorizer
description: Learn how to create, update, and manage AWS ApiGateway Authorizers using Alchemy Cloud Control.
---


The Authorizer resource allows you to manage [AWS ApiGateway Authorizers](https://docs.aws.amazon.com/apigateway/latest/userguide/) which are used to control access to your API Gateway methods.

## Minimal Example

Create a basic Authorizer with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const apiGatewayAuthorizer = await AWS.ApiGateway.Authorizer("myAuthorizer", {
  RestApiId: "myApiId",
  Name: "MyAuthorizer",
  Type: "TOKEN",
  IdentitySource: "method.request.header.Authorization"
});
```

## Advanced Configuration

Configure an Authorizer with additional options like credentials and result TTL.

```ts
const advancedAuthorizer = await AWS.ApiGateway.Authorizer("advancedAuthorizer", {
  RestApiId: "myApiId",
  Name: "AdvancedAuthorizer",
  Type: "TOKEN",
  AuthorizerUri: "arn:aws:lambda:us-west-2:123456789012:function:myAuthFunction",
  AuthorizerCredentials: "arn:aws:iam::123456789012:role/myAuthRole",
  AuthorizerResultTtlInSeconds: 300,
  IdentitySource: "method.request.header.Authorization"
});
```

## Using AWS Cognito as an Authorizer

Create an Authorizer using AWS Cognito for authentication.

```ts
const cognitoAuthorizer = await AWS.ApiGateway.Authorizer("cognitoAuthorizer", {
  RestApiId: "myApiId",
  Name: "CognitoAuthorizer",
  Type: "COGNITO_USER_POOLS",
  ProviderARNs: [
    "arn:aws:cognito:us-west-2:123456789012:userpool/us-west-2_aBcDeFgHi"
  ]
});
```

## Custom Lambda Authorizer

Set up a custom Lambda function as an Authorizer.

```ts
const lambdaAuthorizer = await AWS.ApiGateway.Authorizer("lambdaAuthorizer", {
  RestApiId: "myApiId",
  Name: "LambdaAuthorizer",
  Type: "REQUEST",
  AuthorizerUri: "arn:aws:lambda:us-west-2:123456789012:function:myCustomAuthFunction",
  AuthorizerCredentials: "arn:aws:iam::123456789012:role/myLambdaAuthRole",
  IdentitySource: "method.request.header.Authorization",
  IdentityValidationExpression: "^[A-Za-z0-9-._~+/]+=*$"
});
```

---
title: Authorizer
description: Learn how to create, update, and manage AWS ApiGatewayV2 Authorizers using Alchemy Cloud Control.
---


The Authorizer resource allows you to manage [AWS ApiGatewayV2 Authorizers](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) to control access to your API Gateway APIs.

## Minimal Example

Create a basic Authorizer that uses a Lambda function as the authorizer and defines a simple identity source.

```ts
import AWS from "alchemy/aws/control";

const basicAuthorizer = await AWS.ApiGatewayV2.Authorizer("basicAuthorizer", {
  ApiId: "myApiId",
  Name: "MyBasicAuthorizer",
  AuthorizerType: "REQUEST",
  IdentitySource: ["$request.header.Authorization"],
  AuthorizerUri: "arn:aws:lambda:us-east-1:123456789012:function:myAuthFunction"
});
```

## Advanced Configuration

Configure an Authorizer with JWT validation and a custom identity validation expression.

```ts
const jwtAuthorizer = await AWS.ApiGatewayV2.Authorizer("jwtAuthorizer", {
  ApiId: "myApiId",
  Name: "MyJWTAuthorizer",
  AuthorizerType: "JWT",
  JwtConfiguration: {
    Audience: ["my-audience"],
    Issuer: "https://my-issuer.com/"
  },
  IdentitySource: ["$request.header.Authorization"],
  AuthorizerResultTtlInSeconds: 300 // Cache results for 5 minutes
});
```

## Custom Authorizer with Credentials

Create a custom Authorizer that uses IAM roles for execution.

```ts
const customAuthorizer = await AWS.ApiGatewayV2.Authorizer("customAuthorizer", {
  ApiId: "myApiId",
  Name: "MyCustomAuthorizer",
  AuthorizerType: "REQUEST",
  AuthorizerCredentialsArn: "arn:aws:iam::123456789012:role/myAuthorizerRole",
  IdentitySource: ["$request.header.Authorization"],
  AuthorizerUri: "arn:aws:lambda:us-east-1:123456789012:function:myCustomAuthFunction",
  EnableSimpleResponses: true
});
```

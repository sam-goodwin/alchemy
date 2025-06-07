---
title: Managing AWS ApiGatewayV2 Authorizers with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 Authorizers using Alchemy Cloud Control.
---

# Authorizer

The Authorizer resource allows you to manage [AWS ApiGatewayV2 Authorizers](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) that control access to your APIs by validating incoming requests.

## Minimal Example

Create a basic Authorizer for an API using JWT validation.

```ts
import AWS from "alchemy/aws/control";

const BasicAuthorizer = await AWS.ApiGatewayV2.Authorizer("BasicJwtAuthorizer", {
  ApiId: "myApiId",
  Name: "BasicJWTAuth",
  AuthorizerType: "JWT",
  IdentitySource: ["$request.header.Authorization"],
  JwtConfiguration: {
    Audience: ["myAudience"],
    Issuer: "https://myissuer.com"
  }
});
```

## Advanced Configuration

Configure an Authorizer with a custom URI and result TTL settings.

```ts
const AdvancedAuthorizer = await AWS.ApiGatewayV2.Authorizer("AdvancedCustomUriAuthorizer", {
  ApiId: "myApiId",
  Name: "AdvancedCustomAuth",
  AuthorizerType: "REQUEST",
  AuthorizerUri: "https://custom-auth-endpoint.com/auth",
  AuthorizerCredentialsArn: "arn:aws:iam::123456789012:role/myAuthRole",
  AuthorizerResultTtlInSeconds: 300,
  IdentitySource: ["$request.header.Authorization"],
  EnableSimpleResponses: true
});
```

## Using Identity Validation Expression

This example demonstrates creating an Authorizer that uses an identity validation expression to validate incoming requests.

```ts
const ValidationExpressionAuthorizer = await AWS.ApiGatewayV2.Authorizer("ValidationExpressionAuth", {
  ApiId: "myApiId",
  Name: "ValidationExpressionAuth",
  AuthorizerType: "REQUEST",
  IdentityValidationExpression: "Bearer [A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+",
  IdentitySource: ["$request.header.Authorization"]
});
```
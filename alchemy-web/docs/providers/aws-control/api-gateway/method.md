---
title: Managing AWS ApiGateway Methods with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway Methods using Alchemy Cloud Control.
---

# Method

The Method resource lets you manage [AWS ApiGateway Methods](https://docs.aws.amazon.com/apigateway/latest/userguide/) and their configurations, enabling you to define how API requests are handled.

## Minimal Example

Create a basic ApiGateway Method with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const ApiMethod = await AWS.ApiGateway.Method("GetUserMethod", {
  RestApiId: "abcd1234", // The ID of the Rest API
  ResourceId: "xyz5678", // The ID of the resource
  HttpMethod: "GET", // The HTTP method supported by this method
  AuthorizationType: "NONE", // No authorization required
  ApiKeyRequired: false // API Key is not required
});
```

## Advanced Configuration

Configure an ApiGateway Method with integration settings and method responses for more complex use cases.

```ts
const AdvancedApiMethod = await AWS.ApiGateway.Method("PostUserMethod", {
  RestApiId: "abcd1234",
  ResourceId: "xyz5678",
  HttpMethod: "POST",
  Integration: {
    IntegrationHttpMethod: "POST",
    Type: "AWS_PROXY", // Using AWS Proxy integration
    Uri: "arn:aws:lambda:us-west-2:123456789012:function:CreateUserFunction" // Lambda function URI
  },
  MethodResponses: [
    {
      StatusCode: "200",
      ResponseModels: {
        "application/json": "Empty" // Specify the response model
      }
    },
    {
      StatusCode: "400",
      ResponseModels: {
        "application/json": "Error" // Specify the error model
      }
    }
  ]
});
```

## Secured Method with Authorization

Create a secured ApiGateway Method that requires authorization scopes.

```ts
const SecuredApiMethod = await AWS.ApiGateway.Method("SecureGetUserMethod", {
  RestApiId: "abcd1234",
  ResourceId: "xyz5678",
  HttpMethod: "GET",
  AuthorizationType: "COGNITO_USER_POOLS", // Using Cognito for authorization
  AuthorizerId: "auth1234", // Id of the authorizer
  AuthorizationScopes: ["read:user"] // Define scopes for the method
});
```

## Method with Request Validation

Define an ApiGateway Method that uses request validation with parameters.

```ts
const ValidatedApiMethod = await AWS.ApiGateway.Method("ValidateUserMethod", {
  RestApiId: "abcd1234",
  ResourceId: "xyz5678",
  HttpMethod: "PUT",
  RequestParameters: {
    "method.request.querystring.userId": true // Require userId as a query parameter
  },
  RequestValidatorId: "validator1234", // Specify the request validator
  MethodResponses: [
    {
      StatusCode: "200",
      ResponseModels: {
        "application/json": "UserResponse" // Specify the response model
      }
    }
  ]
});
```
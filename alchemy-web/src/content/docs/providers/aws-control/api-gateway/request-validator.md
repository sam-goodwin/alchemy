---
title: RequestValidator
description: Learn how to create, update, and manage AWS ApiGateway RequestValidators using Alchemy Cloud Control.
---


The RequestValidator resource allows you to manage [AWS ApiGateway RequestValidators](https://docs.aws.amazon.com/apigateway/latest/userguide/) which validate request parameters and request bodies for API requests.

## Minimal Example

Create a basic RequestValidator with required properties and one optional property to validate request parameters:

```ts
import AWS from "alchemy/aws/control";

const requestValidator = await AWS.ApiGateway.RequestValidator("basicRequestValidator", {
  RestApiId: "myApiId",
  ValidateRequestParameters: true
});
```

## Advanced Configuration

Configure a RequestValidator with additional options to validate both request parameters and the request body:

```ts
const advancedRequestValidator = await AWS.ApiGateway.RequestValidator("advancedRequestValidator", {
  RestApiId: "myApiId",
  ValidateRequestParameters: true,
  ValidateRequestBody: true,
  Name: "AdvancedValidator"
});
```

## Adoption of Existing Resource

If you want to adopt an existing RequestValidator instead of failing, you can use the adopt property:

```ts
const adoptedRequestValidator = await AWS.ApiGateway.RequestValidator("adoptedRequestValidator", {
  RestApiId: "myApiId",
  ValidateRequestParameters: true,
  adopt: true
});
```

## Using the RequestValidator with an API Method

Demonstrate how to associate a RequestValidator with an API method for validation:

```ts
import AWS from "alchemy/aws/control";

const requestValidator = await AWS.ApiGateway.RequestValidator("methodRequestValidator", {
  RestApiId: "myApiId",
  ValidateRequestParameters: true
});

const apiMethod = await AWS.ApiGateway.Method("myApiMethod", {
  RestApiId: "myApiId",
  ResourceId: "myResourceId",
  HttpMethod: "POST",
  AuthorizationType: "NONE",
  RequestValidatorId: requestValidator.Arn,
  MethodResponses: [{
    StatusCode: "200"
  }]
});
```

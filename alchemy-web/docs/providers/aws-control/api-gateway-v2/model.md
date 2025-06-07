---
title: Managing AWS ApiGatewayV2 Models with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 Models using Alchemy Cloud Control.
---

# Model

The Model resource lets you manage [AWS ApiGatewayV2 Models](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic API Gateway V2 model with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const ApiGatewayModel = await AWS.ApiGatewayV2.Model("BasicModel", {
  ApiId: "abc12345", // The ID of the API for which the model is being created
  Name: "UserModel",
  Schema: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" }
    },
    required: ["id", "name", "email"]
  },
  Description: "Model for user data"
});
```

## Advanced Configuration

Configure a model with detailed schema and content type for a more complex use case.

```ts
const AdvancedModel = await AWS.ApiGatewayV2.Model("AdvancedUserModel", {
  ApiId: "abc12345",
  Name: "AdvancedUserModel",
  Schema: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" },
      age: { type: "integer" },
      address: {
        type: "object",
        properties: {
          street: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          zip: { type: "string" }
        },
        required: ["street", "city", "state", "zip"]
      }
    },
    required: ["id", "name", "email"]
  },
  ContentType: "application/json",
  Description: "Advanced model for user data including address"
});
```

## Model Adoption

Create a model that adopts an existing resource if it already exists.

```ts
const AdoptedModel = await AWS.ApiGatewayV2.Model("AdoptedUserModel", {
  ApiId: "abc12345",
  Name: "AdoptedUserModel",
  Schema: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" }
    },
    required: ["id", "name", "email"]
  },
  adopt: true // Adopt existing resource instead of failing
});
```
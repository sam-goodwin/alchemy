---
title: Managing AWS ApiGateway Models with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway Models using Alchemy Cloud Control.
---

# Model

The Model resource lets you manage [AWS ApiGateway Models](https://docs.aws.amazon.com/apigateway/latest/userguide/) for defining the structure of request and response bodies in your APIs.

## Minimal Example

Create a basic ApiGateway Model with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicApiGatewayModel = await AWS.ApiGateway.Model("BasicApiGatewayModel", {
  RestApiId: "abc123xyz",
  Name: "UserModel",
  Description: "Model representing a User entity",
  ContentType: "application/json",
  Schema: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" }
    },
    required: ["id", "name", "email"]
  }
});
```

## Advanced Configuration

Configure an ApiGateway Model with a more complex schema and additional properties.

```ts
const advancedApiGatewayModel = await AWS.ApiGateway.Model("AdvancedApiGatewayModel", {
  RestApiId: "abc123xyz",
  Name: "ProductModel",
  Description: "Model representing a Product entity with detailed specifications",
  ContentType: "application/json",
  Schema: {
    type: "object",
    properties: {
      productId: { type: "string" },
      productName: { type: "string" },
      price: { type: "number" },
      tags: {
        type: "array",
        items: { type: "string" }
      }
    },
    required: ["productId", "productName", "price"]
  }
});
```

## Adoption of Existing Models

Create a new ApiGateway Model that adopts an existing resource instead of failing.

```ts
const adoptedApiGatewayModel = await AWS.ApiGateway.Model("AdoptedApiGatewayModel", {
  RestApiId: "abc123xyz",
  Name: "AdoptedUserModel",
  Description: "Adopt existing UserModel if it exists",
  ContentType: "application/json",
  Schema: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" }
    },
    required: ["id", "name", "email"]
  },
  adopt: true
});
```
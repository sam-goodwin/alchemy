---
title: Model
description: Learn how to create, update, and manage AWS ApiGateway Models using Alchemy Cloud Control.
---


The Model resource lets you manage [AWS ApiGateway Models](https://docs.aws.amazon.com/apigateway/latest/userguide/) that define the data structure of the API's request and response bodies.

## Minimal Example

Create a basic model with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicModel = await AWS.ApiGateway.Model("basicModel", {
  RestApiId: "abcd1234efgh5678ijkl9012mnop3456", // Replace with your actual RestApiId
  Name: "UserModel",
  Description: "Model representing a user in the system",
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

Configure a model with additional properties, including an updated schema definition:

```ts
const advancedModel = await AWS.ApiGateway.Model("advancedModel", {
  RestApiId: "abcd1234efgh5678ijkl9012mnop3456", // Replace with your actual RestApiId
  Name: "ProductModel",
  Description: "Model representing a product in the inventory",
  ContentType: "application/json",
  Schema: {
    type: "object",
    properties: {
      productId: { type: "string" },
      productName: { type: "string" },
      price: { type: "number" },
      inStock: { type: "boolean" }
    },
    required: ["productId", "productName", "price"]
  }
});
```

## Updating an Existing Model

This example demonstrates how to update an existing model's description and schema:

```ts
const updatedModel = await AWS.ApiGateway.Model("updatedModel", {
  RestApiId: "abcd1234efgh5678ijkl9012mnop3456", // Replace with your actual RestApiId
  Name: "UserModel",
  Description: "Updated model representing a user with additional fields",
  Schema: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" },
      createdAt: { type: "string", format: "date-time" }
    },
    required: ["id", "name", "email", "createdAt"]
  }
});
```

## Conditional Resource Adoption

This example shows how to adopt an existing model if it already exists:

```ts
const adoptedModel = await AWS.ApiGateway.Model("adoptedModel", {
  RestApiId: "abcd1234efgh5678ijkl9012mnop3456", // Replace with your actual RestApiId
  Name: "UserModel",
  adopt: true // Adopt existing resource instead of failing
});
```

---
title: Model
description: Learn how to create, update, and manage AWS ApiGatewayV2 Models using Alchemy Cloud Control.
---


The Model resource lets you manage [AWS ApiGatewayV2 Models](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) that define the structure of request and response payloads for your API Gateway.

## Minimal Example

Create a basic API Gateway model with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicModel = await AWS.ApiGatewayV2.Model("basicModel", {
  ApiId: "api-123456",
  Name: "BasicModel",
  Schema: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" }
    },
    required: ["id"]
  },
  Description: "A model for basic API payloads",
  ContentType: "application/json"
});
```

## Advanced Configuration

Define a more complex model with additional properties and schemas.

```ts
const advancedModel = await AWS.ApiGatewayV2.Model("advancedModel", {
  ApiId: "api-123456",
  Name: "AdvancedModel",
  Schema: {
    type: "object",
    properties: {
      userId: { type: "string" },
      title: { type: "string" },
      completed: { type: "boolean" }
    },
    required: ["userId", "title"]
  },
  Description: "An advanced model for user tasks",
  ContentType: "application/json"
});
```

## Adopt an Existing Model

Use the `adopt` property to adopt an existing model instead of failing if it already exists.

```ts
const adoptedModel = await AWS.ApiGatewayV2.Model("adoptedModel", {
  ApiId: "api-654321",
  Name: "AdoptedModel",
  Schema: {
    type: "object",
    properties: {
      taskId: { type: "string" },
      taskName: { type: "string" }
    },
    required: ["taskId"]
  },
  Description: "Model for adopting existing tasks",
  adopt: true
});
```

## Update Model Properties

Update the properties of an existing model to reflect changes.

```ts
const updatedModel = await AWS.ApiGatewayV2.Model("updatedModel", {
  ApiId: "api-123456",
  Name: "UpdatedModel",
  Schema: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      age: { type: "integer" }
    },
    required: ["id", "name"]
  },
  Description: "Updated model with age property",
  ContentType: "application/json"
});
```

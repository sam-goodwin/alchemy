---
title: ApiKey
description: Learn how to create, update, and manage AWS ApiGateway ApiKeys using Alchemy Cloud Control.
---


The ApiKey resource lets you manage [AWS ApiGateway ApiKeys](https://docs.aws.amazon.com/apigateway/latest/userguide/) to control access to your APIs. This resource enables you to create, update, and delete API keys as well as manage their stage keys and other properties.

## Minimal Example

Create a basic API key with a description and enabled status:

```ts
import AWS from "alchemy/aws/control";

const apiKey = await AWS.ApiGateway.ApiKey("myApiKey", {
  name: "MyFirstApiKey",
  description: "This is my first API key for accessing the API.",
  enabled: true
});
```

## Advanced Configuration

Configure an API key with a customer ID and distinct ID generation:

```ts
const advancedApiKey = await AWS.ApiGateway.ApiKey("myAdvancedApiKey", {
  name: "MyAdvancedApiKey",
  description: "An advanced API key configuration.",
  enabled: true,
  customerId: "customer-12345",
  generateDistinctId: true,
  tags: [
    { key: "environment", value: "production" },
    { key: "team", value: "backend" }
  ]
});
```

## Binding to Stages

Create an API key and bind it to specific stages of an API:

```ts
const stageKeys = [
  {
    restApiId: "api-123456",
    stageName: "prod"
  },
  {
    restApiId: "api-123456",
    stageName: "dev"
  }
];

const stageBoundApiKey = await AWS.ApiGateway.ApiKey("myStageBoundApiKey", {
  name: "MyStageBoundApiKey",
  description: "API key bound to specific stages.",
  enabled: true,
  stageKeys: stageKeys
});
```

## Custom Key Value

Create an API key with a specific key value:

```ts
const customValueApiKey = await AWS.ApiGateway.ApiKey("myCustomValueApiKey", {
  name: "MyCustomValueApiKey",
  description: "API key with a custom value.",
  value: "customKeyValue123",
  enabled: true
});
```

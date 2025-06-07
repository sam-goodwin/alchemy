---
title: Managing AWS ApiGateway ApiKeys with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway ApiKeys using Alchemy Cloud Control.
---

# ApiKey

The ApiKey resource allows you to manage [AWS ApiGateway ApiKeys](https://docs.aws.amazon.com/apigateway/latest/userguide/) for controlling access to your APIs.

## Minimal Example

Create a basic ApiKey with a description and enable it:

```ts
import AWS from "alchemy/aws/control";

const basicApiKey = await AWS.ApiGateway.ApiKey("BasicApiKey", {
  Name: "BasicApi",
  Description: "A basic API key for accessing the API.",
  Enabled: true
});
```

## Advanced Configuration

Configure an ApiKey with specific tags and a customer ID for better tracking:

```ts
const advancedApiKey = await AWS.ApiGateway.ApiKey("AdvancedApiKey", {
  Name: "AdvancedApi",
  Description: "An advanced API key with customer tracking.",
  Enabled: true,
  CustomerId: "1234567890",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "API Team" }
  ]
});
```

## Stage Key Configuration

Create an ApiKey linked to specific stages of an API:

```ts
const stageKeyApiKey = await AWS.ApiGateway.ApiKey("StageKeyApiKey", {
  Name: "StageKeyApi",
  Description: "An API key linked to specific stages.",
  Enabled: true,
  StageKeys: [
    {
      RestApiId: "abcdef1234",
      StageName: "prod"
    },
    {
      RestApiId: "abcdef1234",
      StageName: "dev"
    }
  ]
});
```

## Generate Distinct ID

Create an ApiKey while allowing the system to generate a distinct ID:

```ts
const generatedDistinctIdApiKey = await AWS.ApiGateway.ApiKey("GeneratedDistinctIdApiKey", {
  Name: "GeneratedDistinctIdApi",
  Description: "An API key that generates a distinct ID.",
  GenerateDistinctId: true,
  Enabled: true
});
```
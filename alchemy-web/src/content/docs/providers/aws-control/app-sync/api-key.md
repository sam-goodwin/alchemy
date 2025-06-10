---
title: ApiKey
description: Learn how to create, update, and manage AWS AppSync ApiKeys using Alchemy Cloud Control.
---


The ApiKey resource allows you to manage [AWS AppSync ApiKeys](https://docs.aws.amazon.com/appsync/latest/userguide/) for authentication of your GraphQL APIs. This resource lets you create, update, and manage API keys with various configurations for your AppSync applications.

## Minimal Example

Create a basic AppSync ApiKey with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const appSyncApiKey = await AWS.AppSync.ApiKey("myApiKey", {
  ApiId: "myAppSyncApiId", // Replace with your actual AppSync API ID
  Description: "This is my primary API key for accessing the AppSync API",
  Expires: Math.floor(Date.now() / 1000) + 3600 // Expires in 1 hour
});
```

## Advanced Configuration

Configure an ApiKey with a specific expiration time, useful for temporary access:

```ts
const temporaryApiKey = await AWS.AppSync.ApiKey("tempApiKey", {
  ApiId: "myAppSyncApiId", // Replace with your actual AppSync API ID
  Description: "Temporary API key for limited access",
  Expires: Math.floor(Date.now() / 1000) + (24 * 3600) // Expires in 24 hours
});
```

## Adoption of Existing Resource

If you want to adopt an existing ApiKey instead of failing when it already exists, you can enable the adopt option:

```ts
const existingApiKey = await AWS.AppSync.ApiKey("existingApiKey", {
  ApiId: "myAppSyncApiId", // Replace with your actual AppSync API ID
  Description: "Adopting an existing API key",
  adopt: true // Attempt to adopt the existing key
});
``` 

## Inspecting Resource Attributes

You can also retrieve additional properties such as ARN, creation time, and last update time:

```ts
const apiKeyAttributes = await AWS.AppSync.ApiKey("myApiKeyAttributes", {
  ApiId: "myAppSyncApiId", // Replace with your actual AppSync API ID
});

console.log(`API Key ARN: ${apiKeyAttributes.Arn}`);
console.log(`Created At: ${apiKeyAttributes.CreationTime}`);
console.log(`Last Updated At: ${apiKeyAttributes.LastUpdateTime}`);
```

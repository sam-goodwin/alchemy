---
title: ApiCache
description: Learn how to create, update, and manage AWS AppSync ApiCaches using Alchemy Cloud Control.
---


The ApiCache resource lets you manage [AWS AppSync ApiCaches](https://docs.aws.amazon.com/appsync/latest/userguide/) for caching responses from your GraphQL APIs, enhancing performance and reducing latency.

## Minimal Example

Create a basic ApiCache with the required properties and one optional property for transit encryption.

```ts
import AWS from "alchemy/aws/control";

const apiCache = await AWS.AppSync.ApiCache("myApiCache", {
  Type: "TWO_THOUSAND",
  TransitEncryptionEnabled: true,
  ApiId: "myApiId",
  ApiCachingBehavior: "FULL_REQUEST_CACHING",
  Ttl: 300 // Cache time-to-live in seconds
});
```

## Advanced Configuration

Configure an ApiCache with additional security settings and health metrics configuration.

```ts
const advancedApiCache = await AWS.AppSync.ApiCache("advancedApiCache", {
  Type: "TWO_THOUSAND",
  TransitEncryptionEnabled: true,
  AtRestEncryptionEnabled: true,
  HealthMetricsConfig: '{"enabled": true, "sampleRate": 0.1}',
  ApiId: "myApiId",
  ApiCachingBehavior: "FULL_REQUEST_CACHING",
  Ttl: 600 // Cache time-to-live in seconds
});
```

## Caching Behavior Variants

Create an ApiCache to use a different caching behavior that only caches GET requests.

```ts
const getRequestCache = await AWS.AppSync.ApiCache("getRequestCache", {
  Type: "TWO_THOUSAND",
  TransitEncryptionEnabled: false,
  ApiId: "myApiId",
  ApiCachingBehavior: "PER_REQUEST_CACHING",
  Ttl: 120 // Cache time-to-live in seconds
});
```

## Adoption of Existing Resource

If you want to adopt an existing ApiCache instead of failing when it already exists, use the `adopt` flag.

```ts
const adoptedApiCache = await AWS.AppSync.ApiCache("adoptedApiCache", {
  Type: "TWO_THOUSAND",
  TransitEncryptionEnabled: true,
  ApiId: "myApiId",
  ApiCachingBehavior: "FULL_REQUEST_CACHING",
  Ttl: 300,
  adopt: true // Adopt the existing resource if it exists
});
```

---
title: CachePolicy
description: Learn how to create, update, and manage AWS CloudFront CachePolicys using Alchemy Cloud Control.
---


The CachePolicy resource lets you manage [AWS CloudFront CachePolicys](https://docs.aws.amazon.com/cloudfront/latest/userguide/) which define how CloudFront caches content based on request and response headers, cookies, and query strings.

## Minimal Example

Create a basic cache policy with default settings.

```ts
import AWS from "alchemy/aws/control";

const basicCachePolicy = await AWS.CloudFront.CachePolicy("basicCachePolicy", {
  CachePolicyConfig: {
    Name: "BasicCachePolicy",
    Comment: "A basic cache policy for demonstration purposes.",
    DefaultTtl: 86400, // 1 day in seconds
    MaxTtl: 31536000,  // 1 year in seconds
    MinTtl: 0,
    ParametersInCacheKeyAndForwardedToOrigin: {
      CookiesConfig: {
        CookieBehavior: "none"
      },
      EnableAcceptEncodingGzip: true,
      EnableAcceptEncodingBrotli: false,
      HeadersConfig: {
        HeaderBehavior: "none"
      },
      QueryStringsConfig: {
        QueryStringBehavior: "none"
      }
    }
  }
});
```

## Advanced Configuration

Configure a cache policy with advanced settings including query string and header configurations.

```ts
const advancedCachePolicy = await AWS.CloudFront.CachePolicy("advancedCachePolicy", {
  CachePolicyConfig: {
    Name: "AdvancedCachePolicy",
    Comment: "An advanced cache policy with specific query string and header settings.",
    DefaultTtl: 3600, // 1 hour in seconds
    MaxTtl: 86400,    // 1 day in seconds
    MinTtl: 0,
    ParametersInCacheKeyAndForwardedToOrigin: {
      CookiesConfig: {
        CookieBehavior: "all"
      },
      EnableAcceptEncodingGzip: true,
      EnableAcceptEncodingBrotli: true,
      HeadersConfig: {
        HeaderBehavior: "whitelist",
        Headers: ["Authorization", "X-Custom-Header"]
      },
      QueryStringsConfig: {
        QueryStringBehavior: "all"
      }
    }
  }
});
```

## Caching for Dynamic Content

Create a cache policy designed for dynamic content that needs more frequent updates.

```ts
const dynamicCachePolicy = await AWS.CloudFront.CachePolicy("dynamicCachePolicy", {
  CachePolicyConfig: {
    Name: "DynamicCachePolicy",
    Comment: "A cache policy optimized for dynamic content.",
    DefaultTtl: 300,  // 5 minutes in seconds
    MaxTtl: 3600,     // 1 hour in seconds
    MinTtl: 0,
    ParametersInCacheKeyAndForwardedToOrigin: {
      CookiesConfig: {
        CookieBehavior: "all"
      },
      EnableAcceptEncodingGzip: true,
      EnableAcceptEncodingBrotli: false,
      HeadersConfig: {
        HeaderBehavior: "all"
      },
      QueryStringsConfig: {
        QueryStringBehavior: "whitelist",
        QueryStrings: ["sessionId", "userId"]
      }
    }
  }
});
```

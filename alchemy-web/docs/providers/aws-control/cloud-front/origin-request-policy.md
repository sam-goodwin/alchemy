---
title: Managing AWS CloudFront OriginRequestPolicys with Alchemy
description: Learn how to create, update, and manage AWS CloudFront OriginRequestPolicys using Alchemy Cloud Control.
---

# OriginRequestPolicy

The OriginRequestPolicy resource allows you to define [CloudFront Origin Request Policies](https://docs.aws.amazon.com/cloudfront/latest/userguide/) that control the headers, cookies, and query strings that CloudFront includes in requests it sends to your origin.

## Minimal Example

This example demonstrates how to create a basic Origin Request Policy with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicOriginRequestPolicy = await AWS.CloudFront.OriginRequestPolicy("BasicPolicy", {
  OriginRequestPolicyConfig: {
    Name: "BasicPolicy",
    Comment: "This policy forwards headers and query strings",
    HeadersConfig: {
      HeaderBehavior: "whitelist",
      Headers: ["Authorization", "Content-Type"]
    },
    CookiesConfig: {
      CookieBehavior: "none"
    },
    QueryStringsConfig: {
      QueryStringBehavior: "all"
    }
  }
});
```

## Advanced Configuration

This example illustrates how to configure an Origin Request Policy with advanced settings, including cookie forwarding and specific header behaviors.

```ts
import AWS from "alchemy/aws/control";

const AdvancedOriginRequestPolicy = await AWS.CloudFront.OriginRequestPolicy("AdvancedPolicy", {
  OriginRequestPolicyConfig: {
    Name: "AdvancedPolicy",
    Comment: "This policy forwards specific cookies and query strings",
    HeadersConfig: {
      HeaderBehavior: "whitelist",
      Headers: ["Authorization", "User-Agent"]
    },
    CookiesConfig: {
      CookieBehavior: "all"
    },
    QueryStringsConfig: {
      QueryStringBehavior: "none"
    }
  }
});
```

## Use Case: Custom Caching Behavior

In this example, we create a policy that selectively forwards headers for a custom caching strategy.

```ts
import AWS from "alchemy/aws/control";

const CachingOriginRequestPolicy = await AWS.CloudFront.OriginRequestPolicy("CachingPolicy", {
  OriginRequestPolicyConfig: {
    Name: "CachingPolicy",
    Comment: "This policy is used for custom caching by forwarding specific headers.",
    HeadersConfig: {
      HeaderBehavior: "whitelist",
      Headers: ["Accept-Language"]
    },
    CookiesConfig: {
      CookieBehavior: "none"
    },
    QueryStringsConfig: {
      QueryStringBehavior: "all"
    }
  }
});
```

## Use Case: API Gateway Integration

This example demonstrates how to create a policy that forwards headers and query strings specifically for an API Gateway integration.

```ts
import AWS from "alchemy/aws/control";

const ApiGatewayOriginRequestPolicy = await AWS.CloudFront.OriginRequestPolicy("ApiGatewayPolicy", {
  OriginRequestPolicyConfig: {
    Name: "ApiGatewayPolicy",
    Comment: "Policy for API Gateway integration, forwarding necessary headers and query strings.",
    HeadersConfig: {
      HeaderBehavior: "whitelist",
      Headers: ["x-api-key", "Authorization"]
    },
    CookiesConfig: {
      CookieBehavior: "none"
    },
    QueryStringsConfig: {
      QueryStringBehavior: "all"
    }
  }
});
```
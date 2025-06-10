---
title: OriginRequestPolicy
description: Learn how to create, update, and manage AWS CloudFront OriginRequestPolicys using Alchemy Cloud Control.
---


The OriginRequestPolicy resource allows you to manage [AWS CloudFront Origin Request Policies](https://docs.aws.amazon.com/cloudfront/latest/userguide/) to control the headers, cookies, and query strings that CloudFront includes in requests to your origin.

## Minimal Example

Create a basic Origin Request Policy with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const basicOriginRequestPolicy = await AWS.CloudFront.OriginRequestPolicy("basicOriginRequestPolicy", {
  OriginRequestPolicyConfig: {
    Name: "BasicPolicy",
    Comment: "A simple origin request policy",
    HeadersConfig: {
      HeaderBehavior: "whitelist",
      Headers: ["Authorization"]
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

Configure an Origin Request Policy with more advanced settings, including headers and cookies.

```ts
const advancedOriginRequestPolicy = await AWS.CloudFront.OriginRequestPolicy("advancedOriginRequestPolicy", {
  OriginRequestPolicyConfig: {
    Name: "AdvancedPolicy",
    Comment: "An advanced origin request policy with more settings",
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

## Including Multiple Headers and Cookies

Demonstrate an Origin Request Policy that includes multiple headers and cookies, showcasing its flexibility.

```ts
const complexOriginRequestPolicy = await AWS.CloudFront.OriginRequestPolicy("complexOriginRequestPolicy", {
  OriginRequestPolicyConfig: {
    Name: "ComplexPolicy",
    Comment: "A complex policy that includes multiple headers and cookies",
    HeadersConfig: {
      HeaderBehavior: "whitelist",
      Headers: ["Authorization", "Accept-Language", "X-Custom-Header"]
    },
    CookiesConfig: {
      CookieBehavior: "whitelist",
      Cookies: ["session_id", "user_id"]
    },
    QueryStringsConfig: {
      QueryStringBehavior: "all"
    }
  }
});
```

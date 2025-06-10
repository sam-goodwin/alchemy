---
title: ResponseHeadersPolicy
description: Learn how to create, update, and manage AWS CloudFront ResponseHeadersPolicys using Alchemy Cloud Control.
---


The ResponseHeadersPolicy resource lets you configure HTTP response headers for your CloudFront distributions. For more information, refer to the [AWS CloudFront ResponseHeadersPolicys documentation](https://docs.aws.amazon.com/cloudfront/latest/userguide/).

## Minimal Example

Create a basic ResponseHeadersPolicy with essential settings:

```ts
import AWS from "alchemy/aws/control";

const basicPolicy = await AWS.CloudFront.ResponseHeadersPolicy("basic-response-policy", {
  ResponseHeadersPolicyConfig: {
    Name: "BasicPolicy",
    Comment: "A basic response headers policy example",
    SecurityHeadersConfig: {
      ContentSecurityPolicy: {
        ContentSecurityPolicy: "default-src 'self'",
        Override: true
      },
      StrictTransportSecurity: {
        AccessControlMaxAgeSec: 31536000,
        IncludeSubdomains: true,
        Override: true
      },
      XSSProtection: {
        ModeBlock: true,
        Override: true
      }
    }
  }
});
```

## Advanced Configuration

Configure a ResponseHeadersPolicy with more advanced security settings, including CORS and custom headers:

```ts
const advancedPolicy = await AWS.CloudFront.ResponseHeadersPolicy("advanced-response-policy", {
  ResponseHeadersPolicyConfig: {
    Name: "AdvancedPolicy",
    Comment: "An advanced response headers policy example",
    SecurityHeadersConfig: {
      ContentSecurityPolicy: {
        ContentSecurityPolicy: "default-src 'self'; img-src https://*.example.com",
        Override: true
      },
      StrictTransportSecurity: {
        AccessControlMaxAgeSec: 63072000,
        IncludeSubdomains: true,
        Override: true
      },
      XSSProtection: {
        ModeBlock: true,
        Override: true
      },
      CORSConfig: {
        AccessControlAllowOrigins: ["https://example.com"],
        AccessControlAllowHeaders: ["*"],
        AccessControlAllowMethods: ["GET", "POST"],
        AccessControlExposeHeaders: ["X-My-Custom-Header"],
        AccessControlMaxAgeSec: 3000,
        Override: true
      },
      CustomHeadersConfig: {
        Headers: [
          {
            Header: "X-Custom-Header",
            Value: "CustomValue",
            Override: true
          }
        ]
      }
    }
  }
});
```

## Inherit from Existing Policy

Create a ResponseHeadersPolicy that inherits settings from an existing policy:

```ts
const inheritedPolicy = await AWS.CloudFront.ResponseHeadersPolicy("inherited-response-policy", {
  ResponseHeadersPolicyConfig: {
    Name: "InheritedPolicy",
    Comment: "A response headers policy that inherits from an existing policy",
    SecurityHeadersConfig: {
      ContentSecurityPolicy: {
        ContentSecurityPolicy: "default-src 'self';",
        Override: false // Inherit existing policy
      },
      StrictTransportSecurity: {
        AccessControlMaxAgeSec: 31536000,
        IncludeSubdomains: true,
        Override: false // Inherit existing policy
      }
    }
  },
  adopt: true // Adopt existing resource if it already exists
});
```

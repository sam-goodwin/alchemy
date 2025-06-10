---
title: ContinuousDeploymentPolicy
description: Learn how to create, update, and manage AWS CloudFront ContinuousDeploymentPolicys using Alchemy Cloud Control.
---


The ContinuousDeploymentPolicy resource allows you to manage deployment policies for AWS CloudFront distributions, enabling you to streamline your deployment process. For more information, refer to the [AWS CloudFront ContinuousDeploymentPolicys documentation](https://docs.aws.amazon.com/cloudfront/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic Continuous Deployment Policy with the required properties.

```ts
import AWS from "alchemy/aws/control";

const continuousDeploymentPolicy = await AWS.CloudFront.ContinuousDeploymentPolicy("basicPolicy", {
  ContinuousDeploymentPolicyConfig: {
    // The configuration for the continuous deployment policy
    Name: "BasicDeploymentPolicy",
    Staging: {
      // Specify the staging settings
      Origin: {
        DomainName: "staging.example.com",
        Id: "stagingOrigin"
      }
    },
    Production: {
      // Specify the production settings
      Origin: {
        DomainName: "production.example.com",
        Id: "productionOrigin"
      }
    }
  },
  adopt: true // Adopt if the resource already exists
});
```

## Advanced Configuration

This example shows how to set up a Continuous Deployment Policy with additional configurations for custom cache behavior and error responses.

```ts
const advancedPolicy = await AWS.CloudFront.ContinuousDeploymentPolicy("advancedPolicy", {
  ContinuousDeploymentPolicyConfig: {
    Name: "AdvancedDeploymentPolicy",
    Staging: {
      Origin: {
        DomainName: "staging.example.com",
        Id: "stagingOrigin"
      },
      CacheBehavior: {
        TargetOriginId: "stagingOrigin",
        ViewerProtocolPolicy: "redirect-to-https",
        AllowedMethods: ["GET", "HEAD", "OPTIONS"],
        CachedMethods: ["GET", "HEAD"],
        Compress: true
      }
    },
    Production: {
      Origin: {
        DomainName: "production.example.com",
        Id: "productionOrigin"
      },
      ErrorResponses: [
        {
          ErrorCode: 404,
          ResponsePagePath: "/404.html",
          ResponseCode: "404",
          ErrorCachingMinTTL: 60
        }
      ]
    }
  }
});
```

## Staging and Production Separation

In this example, we create a Continuous Deployment Policy that clearly separates staging and production environments with different origins.

```ts
const separatedPolicy = await AWS.CloudFront.ContinuousDeploymentPolicy("separatedPolicy", {
  ContinuousDeploymentPolicyConfig: {
    Name: "SeparatedDeploymentPolicy",
    Staging: {
      Origin: {
        DomainName: "staging.example.com",
        Id: "stagingOrigin"
      },
      CacheBehavior: {
        TargetOriginId: "stagingOrigin",
        AllowedMethods: ["GET", "HEAD"],
        CachedMethods: ["GET", "HEAD"],
        DefaultTTL: 86400,
        MaxTTL: 31536000,
        MinTTL: 0
      }
    },
    Production: {
      Origin: {
        DomainName: "production.example.com",
        Id: "productionOrigin"
      },
      CacheBehavior: {
        TargetOriginId: "productionOrigin",
        AllowedMethods: ["GET", "HEAD", "OPTIONS"],
        ViewerProtocolPolicy: "https-only"
      }
    }
  }
});
```

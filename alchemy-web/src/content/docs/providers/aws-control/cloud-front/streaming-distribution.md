---
title: StreamingDistribution
description: Learn how to create, update, and manage AWS CloudFront StreamingDistributions using Alchemy Cloud Control.
---


The StreamingDistribution resource allows you to create and manage [AWS CloudFront StreamingDistributions](https://docs.aws.amazon.com/cloudfront/latest/userguide/) for delivering streaming content to viewers.

## Minimal Example

Create a basic streaming distribution with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicStreamingDistribution = await AWS.CloudFront.StreamingDistribution("basicStreamingDist", {
  StreamingDistributionConfig: {
    Comment: "Basic Streaming Distribution for educational content",
    Enabled: true,
    Origins: [{
      DomainName: "example-origin.com",
      Id: "exampleOrigin",
      OriginPath: "/path/to/content"
    }],
    DefaultCacheBehavior: {
      TargetOriginId: "exampleOrigin",
      ViewerProtocolPolicy: "redirect-to-https",
      AllowedMethods: ["GET", "HEAD"],
      CachedMethods: ["GET", "HEAD"],
      ForwardedValues: {
        QueryString: false
      },
      MinTtl: 0,
      MaxTtl: 86400,
      DefaultTtl: 3600
    }
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "StreamingService" }
  ]
});
```

## Advanced Configuration

Configure a streaming distribution with advanced settings such as custom error responses and additional caching behaviors.

```ts
const advancedStreamingDistribution = await AWS.CloudFront.StreamingDistribution("advancedStreamingDist", {
  StreamingDistributionConfig: {
    Comment: "Advanced Streaming Distribution with custom settings",
    Enabled: true,
    Origins: [{
      DomainName: "advanced-origin.com",
      Id: "advancedOrigin",
      OriginPath: "/advanced/path"
    }],
    DefaultCacheBehavior: {
      TargetOriginId: "advancedOrigin",
      ViewerProtocolPolicy: "https-only",
      AllowedMethods: ["GET", "HEAD", "OPTIONS"],
      CachedMethods: ["GET", "HEAD"],
      ForwardedValues: {
        QueryString: true,
        Cookies: { Forward: "all" }
      },
      MinTtl: 0,
      MaxTtl: 31536000,
      DefaultTtl: 86400
    },
    CustomErrorResponses: [{
      ErrorCode: 404,
      ResponsePagePath: "/404.html",
      ResponseCode: "404",
      ErrorCachingMinTtl: 300
    }]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "StreamingApp" }
  ]
});
```

## Dynamic Content Delivery

Create a streaming distribution optimized for dynamic content delivery and enhanced security settings.

```ts
const dynamicStreamingDistribution = await AWS.CloudFront.StreamingDistribution("dynamicStreamingDist", {
  StreamingDistributionConfig: {
    Comment: "Streaming Distribution for dynamic content with security",
    Enabled: true,
    Origins: [{
      DomainName: "dynamic-origin.com",
      Id: "dynamicOrigin",
      OriginPath: "/dynamic/content"
    }],
    DefaultCacheBehavior: {
      TargetOriginId: "dynamicOrigin",
      ViewerProtocolPolicy: "redirect-to-https",
      AllowedMethods: ["GET", "HEAD"],
      CachedMethods: ["GET", "HEAD"],
      ForwardedValues: {
        QueryString: true,
        Cookies: { Forward: "none" }
      },
      MinTtl: 0,
      MaxTtl: 3600,
      DefaultTtl: 1800
    },
    ViewerCertificate: {
      CloudFrontDefaultCertificate: true
    }
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "DynamicStreaming" }
  ]
});
```

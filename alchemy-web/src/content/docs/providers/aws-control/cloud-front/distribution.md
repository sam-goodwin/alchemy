---
title: Distribution
description: Learn how to create, update, and manage AWS CloudFront Distributions using Alchemy Cloud Control.
---


The Distribution resource lets you manage [AWS CloudFront Distributions](https://docs.aws.amazon.com/cloudfront/latest/userguide/) and their configuration settings for content delivery.

## Minimal Example

Create a basic CloudFront Distribution with default settings and a sample origin.

```ts
import AWS from "alchemy/aws/control";

const cloudFrontDistribution = await AWS.CloudFront.Distribution("basicDistribution", {
  DistributionConfig: {
    Origins: {
      Items: [{
        Id: "myOrigin",
        DomainName: "example.com",
        OriginPath: "",
        CustomOriginConfig: {
          HTTPPort: 80,
          HTTPSPort: 443,
          OriginProtocolPolicy: "https-only",
          OriginSslProtocols: {
            Quantity: 1,
            Items: ["TLSv1.2"]
          }
        }
      }],
      Quantity: 1
    },
    DefaultCacheBehavior: {
      TargetOriginId: "myOrigin",
      ViewerProtocolPolicy: "redirect-to-https",
      AllowedMethods: ["GET", "HEAD"],
      CachedMethods: ["GET", "HEAD"],
      MinTtl: 0,
      DefaultTtl: 86400,
      MaxTtl: 31536000
    },
    Enabled: true,
    PriceClass: "PriceClass_All",
    ViewerCertificate: {
      CloudFrontDefaultCertificate: true
    }
  },
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Configure a CloudFront Distribution with multiple origins and advanced cache settings.

```ts
const advancedDistribution = await AWS.CloudFront.Distribution("advancedDistribution", {
  DistributionConfig: {
    Origins: {
      Items: [{
        Id: "myOrigin1",
        DomainName: "origin1.example.com",
        CustomOriginConfig: {
          HTTPPort: 80,
          HTTPSPort: 443,
          OriginProtocolPolicy: "match-viewer",
          OriginSslProtocols: {
            Quantity: 3,
            Items: ["TLSv1.2", "TLSv1.1", "TLSv1"]
          }
        }
      }, {
        Id: "myOrigin2",
        DomainName: "origin2.example.com",
        CustomOriginConfig: {
          HTTPPort: 80,
          HTTPSPort: 443,
          OriginProtocolPolicy: "http-only",
          OriginSslProtocols: {
            Quantity: 1,
            Items: ["TLSv1.2"]
          }
        }
      }],
      Quantity: 2
    },
    DefaultCacheBehavior: {
      TargetOriginId: "myOrigin1",
      ViewerProtocolPolicy: "allow-all",
      AllowedMethods: ["GET", "HEAD", "OPTIONS"],
      CachedMethods: ["GET", "HEAD"],
      MinTtl: 3600,
      DefaultTtl: 86400,
      MaxTtl: 31536000,
      Compress: true
    },
    CacheBehaviors: {
      Items: [{
        PathPattern: "/images/*",
        TargetOriginId: "myOrigin2",
        ViewerProtocolPolicy: "redirect-to-https",
        AllowedMethods: ["GET", "HEAD"],
        CachedMethods: ["GET", "HEAD"],
        MinTtl: 600,
        DefaultTtl: 86400,
        MaxTtl: 31536000,
        Compress: true
      }],
      Quantity: 1
    },
    Enabled: true,
    PriceClass: "PriceClass_200"
  }
});
```

## Custom Error Responses

Set up custom error responses for better user experience.

```ts
const customErrorResponseDistribution = await AWS.CloudFront.Distribution("customErrorResponseDistribution", {
  DistributionConfig: {
    Origins: {
      Items: [{
        Id: "myOrigin",
        DomainName: "example.com",
        CustomOriginConfig: {
          HTTPPort: 80,
          HTTPSPort: 443,
          OriginProtocolPolicy: "https-only"
        }
      }],
      Quantity: 1
    },
    DefaultCacheBehavior: {
      TargetOriginId: "myOrigin",
      ViewerProtocolPolicy: "redirect-to-https",
      AllowedMethods: ["GET", "HEAD"],
      CachedMethods: ["GET", "HEAD"],
      MinTtl: 0,
      DefaultTtl: 86400,
      MaxTtl: 31536000
    },
    CustomErrorResponses: {
      Items: [{
        ErrorCode: 404,
        ResponsePagePath: "/404.html",
        ResponseCode: "404",
        ErrorCachingMinTtl: 300
      }],
      Quantity: 1
    },
    Enabled: true
  }
});
``` 

## Distribution with Lambda@Edge

Create a CloudFront Distribution that integrates with Lambda@Edge for custom processing.

```ts
const edgeLambdaDistribution = await AWS.CloudFront.Distribution("edgeLambdaDistribution", {
  DistributionConfig: {
    Origins: {
      Items: [{
        Id: "myOrigin",
        DomainName: "example.com",
        CustomOriginConfig: {
          HTTPPort: 80,
          HTTPSPort: 443,
          OriginProtocolPolicy: "https-only"
        }
      }],
      Quantity: 1
    },
    DefaultCacheBehavior: {
      TargetOriginId: "myOrigin",
      ViewerProtocolPolicy: "redirect-to-https",
      AllowedMethods: ["GET", "HEAD", "OPTIONS"],
      CachedMethods: ["GET", "HEAD"],
      MinTtl: 0,
      DefaultTtl: 86400,
      MaxTtl: 31536000,
      LambdaFunctionAssociations: {
        Items: [{
          LambdaFunctionARN: "arn:aws:lambda:us-east-1:123456789012:function:myEdgeFunction:1",
          EventType: "viewer-request"
        }],
        Quantity: 1
      }
    },
    Enabled: true
  }
});
```

---
title: Distribution
description: Learn how to create, update, and manage AWS Lightsail Distributions using Alchemy Cloud Control.
---


The Distribution resource allows you to manage [AWS Lightsail Distributions](https://docs.aws.amazon.com/lightsail/latest/userguide/) for delivering content with low latency and high transfer speeds.

## Minimal Example

Create a basic Lightsail distribution with required properties and a few common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const minimalDistribution = await AWS.Lightsail.Distribution("myBasicDistribution", {
  Origin: {
    Name: "myOrigin",
    ProtocolPolicy: "https-only",
    Source: "http://myorigin.com"
  },
  DistributionName: "my-basic-distribution",
  BundleId: "small",
  DefaultCacheBehavior: {
    Behavior: "allow",
    CacheBehavior: {
      Caching: {
        DefaultTtl: 300,
        MaxTtl: 86400,
        MinTtl: 60
      }
    }
  },
  IsEnabled: true
});
```

## Advanced Configuration

Configure a distribution with detailed caching settings and multiple cache behaviors.

```ts
const advancedDistribution = await AWS.Lightsail.Distribution("myAdvancedDistribution", {
  Origin: {
    Name: "myAdvancedOrigin",
    ProtocolPolicy: "http-only",
    Source: "http://myadvancedorigin.com"
  },
  DistributionName: "my-advanced-distribution",
  BundleId: "medium",
  DefaultCacheBehavior: {
    Behavior: "allow",
    CacheBehavior: {
      Caching: {
        DefaultTtl: 600,
        MaxTtl: 172800,
        MinTtl: 300
      }
    }
  },
  CacheBehaviors: [
    {
      Path: "/images/*",
      Behavior: "allow",
      CacheBehavior: {
        Caching: {
          DefaultTtl: 1200,
          MaxTtl: 259200,
          MinTtl: 600
        }
      }
    }
  ],
  IsEnabled: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "LightsailApp" }
  ],
  CertificateName: "myCertificate"
});
```

## Using Cache Behavior Settings

Create a distribution that utilizes cache behavior settings to optimize content delivery.

```ts
const cacheSettingsDistribution = await AWS.Lightsail.Distribution("myCacheSettingsDistribution", {
  Origin: {
    Name: "myCacheOrigin",
    ProtocolPolicy: "https-only",
    Source: "http://mycacheorigin.com"
  },
  DistributionName: "my-cache-settings-distribution",
  BundleId: "large",
  DefaultCacheBehavior: {
    Behavior: "allow",
    CacheBehavior: {
      Caching: {
        DefaultTtl: 1200,
        MaxTtl: 604800,
        MinTtl: 300
      }
    }
  },
  CacheBehaviorSettings: {
    Caching: {
      DefaultTtl: 1800,
      MaxTtl: 86400,
      MinTtl: 300
    }
  },
  IsEnabled: true
});
```

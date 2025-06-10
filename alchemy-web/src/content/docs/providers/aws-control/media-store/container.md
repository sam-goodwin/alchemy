---
title: Container
description: Learn how to create, update, and manage AWS MediaStore Containers using Alchemy Cloud Control.
---


The Container resource allows you to manage [AWS MediaStore Containers](https://docs.aws.amazon.com/mediastore/latest/userguide/) which are used to store and retrieve media assets for streaming.

## Minimal Example

Create a simple MediaStore container with a name and basic access logging enabled.

```ts
import AWS from "alchemy/aws/control";

const mediaStoreContainer = await AWS.MediaStore.Container("myMediaStoreContainer", {
  ContainerName: "my-media-container",
  AccessLoggingEnabled: true // Enables access logging for the container
});
```

## Advanced Configuration

Configure a MediaStore container with a custom lifecycle policy and CORS rules.

```ts
const advancedMediaStoreContainer = await AWS.MediaStore.Container("advancedMediaStoreContainer", {
  ContainerName: "advanced-media-container",
  LifecyclePolicy: JSON.stringify({
    Rules: [
      {
        ExpirationInDays: 30,
        Status: "Enabled"
      }
    ]
  }),
  CorsPolicy: [
    {
      AllowedHeaders: ["*"],
      AllowedMethods: ["GET", "PUT"],
      AllowedOrigins: ["https://mywebsite.com"],
      ExposeHeaders: ["ETag"],
      MaxAgeSeconds: 3000
    }
  ]
});
```

## Custom Policy Settings

Create a MediaStore container with a detailed policy for managing access permissions.

```ts
const policyMediaStoreContainer = await AWS.MediaStore.Container("policyMediaStoreContainer", {
  ContainerName: "policy-media-container",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "mediastore:GetObject",
        Resource: "arn:aws:mediastore:us-east-1:123456789012:container/my-media-container/*"
      }
    ]
  })
});
```

## Metric Policy Configuration

Set up a MediaStore container with a metric policy for monitoring metrics.

```ts
const metricPolicyMediaStoreContainer = await AWS.MediaStore.Container("metricPolicyMediaStoreContainer", {
  ContainerName: "metric-policy-container",
  MetricPolicy: {
    ContainerLevelMetrics: "ALL",
    MetricPolicy: [
      {
        MetricName: "IncomingBytes",
        Period: 60,
        Statistics: ["Sum", "Average"]
      }
    ]
  }
});
```

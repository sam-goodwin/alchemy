---
title: Managing AWS Lambda LayerVersions with Alchemy
description: Learn how to create, update, and manage AWS Lambda LayerVersions using Alchemy Cloud Control.
---

# LayerVersion

The LayerVersion resource allows you to manage [AWS Lambda LayerVersions](https://docs.aws.amazon.com/lambda/latest/userguide/) that enable you to package and share libraries, custom runtimes, and other dependencies across multiple Lambda functions.

## Minimal Example

Create a basic Lambda LayerVersion with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicLayerVersion = await AWS.Lambda.LayerVersion("BasicLayerVersion", {
  Content: {
    S3Bucket: "my-bucket",
    S3Key: "layer-content.zip"
  },
  LayerName: "MyLambdaLayer",
  Description: "A layer for common libraries",
  CompatibleRuntimes: ["nodejs14.x", "nodejs16.x"]
});
```

## Advanced Configuration

Configure a Lambda LayerVersion with additional options such as licensing information and architecture compatibility.

```ts
const AdvancedLayerVersion = await AWS.Lambda.LayerVersion("AdvancedLayerVersion", {
  Content: {
    S3Bucket: "my-bucket",
    S3Key: "advanced-layer-content.zip"
  },
  LayerName: "AdvancedLambdaLayer",
  Description: "An advanced layer for specialized libraries",
  CompatibleRuntimes: ["python3.8", "python3.9"],
  CompatibleArchitectures: ["x86_64"],
  LicenseInfo: "MIT"
});
```

## Using with Multiple Runtimes

Create a Lambda LayerVersion that supports multiple runtimes and architectures.

```ts
const MultiRuntimeLayerVersion = await AWS.Lambda.LayerVersion("MultiRuntimeLayerVersion", {
  Content: {
    S3Bucket: "my-bucket",
    S3Key: "multi-runtime-layer.zip"
  },
  LayerName: "MultiRuntimeLambdaLayer",
  Description: "Layer for multiple runtimes",
  CompatibleRuntimes: ["nodejs14.x", "nodejs16.x", "python3.8"],
  CompatibleArchitectures: ["x86_64", "arm64"]
});
```

## Update LayerVersion

Update an existing Lambda LayerVersion with new content and description.

```ts
const UpdatedLayerVersion = await AWS.Lambda.LayerVersion("UpdatedLayerVersion", {
  Content: {
    S3Bucket: "my-bucket",
    S3Key: "updated-layer-content.zip"
  },
  LayerName: "MyLambdaLayer",
  Description: "Updated layer for common libraries",
  CompatibleRuntimes: ["nodejs14.x", "nodejs16.x"]
});
```
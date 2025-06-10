---
title: LayerVersion
description: Learn how to create, update, and manage AWS Lambda LayerVersions using Alchemy Cloud Control.
---


The LayerVersion resource allows you to manage [AWS Lambda LayerVersions](https://docs.aws.amazon.com/lambda/latest/userguide/) which provide a way to package and share libraries, custom runtimes, and other dependencies across multiple Lambda functions.

## Minimal Example

Create a basic Lambda LayerVersion with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const lambdaLayer = await AWS.Lambda.LayerVersion("myLayerVersion", {
  Content: {
    S3Bucket: "my-lambda-layers",
    S3Key: "mylayer.zip"
  },
  LayerName: "my-custom-layer",
  CompatibleRuntimes: ["nodejs14.x", "nodejs16.x"],
  LicenseInfo: "MIT"
});
```

## Advanced Configuration

Configure a Lambda LayerVersion with specific architecture compatibility and a description.

```ts
const advancedLayer = await AWS.Lambda.LayerVersion("advancedLayerVersion", {
  Content: {
    S3Bucket: "my-lambda-layers",
    S3Key: "advancedlayer.zip"
  },
  LayerName: "my-advanced-layer",
  CompatibleArchitectures: ["x86_64"],
  Description: "An advanced layer with custom dependencies"
});
```

## Versioning and Updating Layers

Create a new version of an existing Lambda LayerVersion to update its content.

```ts
const updatedLayer = await AWS.Lambda.LayerVersion("updatedLayerVersion", {
  Content: {
    S3Bucket: "my-lambda-layers",
    S3Key: "updatedlayer.zip"
  },
  LayerName: "my-custom-layer",
  CompatibleRuntimes: ["python3.8", "python3.9"],
  LicenseInfo: "Apache-2.0"
});
```

## Using LayerVersion with Lambda Functions

Bind the Lambda LayerVersion to a Lambda function.

```ts
import AWS from "alchemy/aws/control";

const myFunction = await AWS.Lambda.Function("myLambdaFunction", {
  FunctionName: "myLambdaFunction",
  Runtime: "nodejs14.x",
  Handler: "index.handler",
  Code: {
    S3Bucket: "my-lambda-functions",
    S3Key: "myfunction.zip"
  },
  Layers: [lambdaLayer.arn]
});
```

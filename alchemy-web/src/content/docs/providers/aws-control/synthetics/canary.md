---
title: Canary
description: Learn how to create, update, and manage AWS Synthetics Canarys using Alchemy Cloud Control.
---


The Canary resource allows you to create and manage [AWS Synthetics Canarys](https://docs.aws.amazon.com/synthetics/latest/userguide/) that enable you to monitor your applications by running scripts that simulate user interactions.

## Minimal Example

Create a basic Canary with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicCanary = await AWS.Synthetics.Canary("basicCanary", {
  name: "MyBasicCanary",
  runtimeVersion: "syn-nodejs-2.0",
  code: {
    handler: "index.handler",
    s3Bucket: "my-synthetics-bucket",
    s3Key: "canary-script.zip"
  },
  schedule: {
    expression: "rate(5 minutes)"
  },
  successRetentionPeriod: 30,
  failureRetentionPeriod: 30
});
```

## Advanced Configuration

Configure a Canary with advanced options like VPC settings and detailed run configurations.

```ts
const advancedCanary = await AWS.Synthetics.Canary("advancedCanary", {
  name: "MyAdvancedCanary",
  runtimeVersion: "syn-nodejs-2.0",
  code: {
    handler: "index.handler",
    s3Bucket: "my-synthetics-bucket",
    s3Key: "advanced-canary-script.zip"
  },
  schedule: {
    expression: "rate(10 minutes)"
  },
  vpcConfig: {
    vpcId: "vpc-12345678",
    subnetIds: ["subnet-12345678"],
    securityGroupIds: ["sg-12345678"]
  },
  runConfig: {
    timeoutInSeconds: 60,
    memoryInMB: 128
  },
  successRetentionPeriod: 60,
  failureRetentionPeriod: 60
});
```

## Using Visual References

Create a Canary that includes visual references for monitoring changes in UI.

```ts
const visualCanary = await AWS.Synthetics.Canary("visualCanary", {
  name: "MyVisualCanary",
  runtimeVersion: "syn-nodejs-2.0",
  code: {
    handler: "index.handler",
    s3Bucket: "my-synthetics-bucket",
    s3Key: "visual-canary-script.zip"
  },
  schedule: {
    expression: "rate(15 minutes)"
  },
  visualReference: {
    baseScreenshot: {
      s3Bucket: "my-synthetics-screenshots",
      s3Key: "reference-screenshot.png"
    }
  },
  successRetentionPeriod: 7,
  failureRetentionPeriod: 7
});
```

## Cleanup of Provisioned Resources

Configure a Canary to automatically clean up provisioned resources after execution.

```ts
const cleanupCanary = await AWS.Synthetics.Canary("cleanupCanary", {
  name: "MyCleanupCanary",
  runtimeVersion: "syn-nodejs-2.0",
  code: {
    handler: "index.handler",
    s3Bucket: "my-synthetics-bucket",
    s3Key: "cleanup-canary-script.zip"
  },
  schedule: {
    expression: "rate(30 minutes)"
  },
  provisionedResourceCleanup: "true",
  successRetentionPeriod: 14,
  failureRetentionPeriod: 14
});
``` 

This documentation provides a comprehensive guide on how to effectively use AWS Synthetics Canarys in your projects with Alchemy.

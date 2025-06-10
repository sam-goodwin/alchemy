---
title: Function
description: Learn how to create, update, and manage AWS Lambda Functions using Alchemy Cloud Control.
---


The Function resource lets you manage [AWS Lambda Functions](https://docs.aws.amazon.com/lambda/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Lambda function with required properties and a common optional property for memory size.

```ts
import AWS from "alchemy/aws/control";

const basicLambdaFunction = await AWS.Lambda.Function("basicLambda", {
  FunctionName: "basicLambdaFunction",
  Handler: "index.handler",
  Runtime: "nodejs14.x",
  Role: "arn:aws:iam::123456789012:role/execution_role",
  Code: {
    ZipFile: "exports.handler = async (event) => { return 'Hello, World!'; };"
  },
  MemorySize: 128
});
```

## Advanced Configuration

Configure a Lambda function with a VPC configuration and environment variables for enhanced security and functionality.

```ts
const advancedLambdaFunction = await AWS.Lambda.Function("advancedLambda", {
  FunctionName: "advancedLambdaFunction",
  Handler: "index.handler",
  Runtime: "nodejs14.x",
  Role: "arn:aws:iam::123456789012:role/execution_role",
  Code: {
    ZipFile: "exports.handler = async (event) => { return 'Advanced Lambda!'; };"
  },
  VpcConfig: {
    SubnetIds: ["subnet-0bb1c79de3EXAMPLE"],
    SecurityGroupIds: ["sg-0c9f7b1c8eEXAMPLE"]
  },
  Environment: {
    Variables: {
      ENVIRONMENT: "production",
      API_URL: "https://api.example.com"
    }
  },
  Timeout: 10
});
```

## Function with Dead Letter Queue

This example demonstrates how to configure a Lambda function with a dead letter queue for handling errors.

```ts
const lambdaWithDLQ = await AWS.Lambda.Function("lambdaWithDLQ", {
  FunctionName: "lambdaWithDLQFunction",
  Handler: "index.handler",
  Runtime: "nodejs14.x",
  Role: "arn:aws:iam::123456789012:role/execution_role",
  Code: {
    ZipFile: "exports.handler = async (event) => { throw new Error('Error!'); };"
  },
  DeadLetterConfig: {
    TargetArn: "arn:aws:sqs:us-west-2:123456789012:dead-letter-queue"
  },
  MemorySize: 256,
  Timeout: 15
});
```

## Function with Layers

This example shows how to add a Lambda layer for shared libraries.

```ts
const lambdaWithLayer = await AWS.Lambda.Function("lambdaWithLayer", {
  FunctionName: "lambdaWithLayerFunction",
  Handler: "index.handler",
  Runtime: "nodejs14.x",
  Role: "arn:aws:iam::123456789012:role/execution_role",
  Code: {
    ZipFile: "exports.handler = async (event) => { return 'Using layers!'; };"
  },
  Layers: [
    "arn:aws:lambda:us-west-2:123456789012:layer:my-layer:1"
  ],
  MemorySize: 128,
  Timeout: 5
});
``` 

## Function with Tracing Configuration

This example configures the Lambda function to enable AWS X-Ray tracing for monitoring.

```ts
const lambdaWithTracing = await AWS.Lambda.Function("lambdaWithTracing", {
  FunctionName: "lambdaWithTracingFunction",
  Handler: "index.handler",
  Runtime: "nodejs14.x",
  Role: "arn:aws:iam::123456789012:role/execution_role",
  Code: {
    ZipFile: "exports.handler = async (event) => { return 'Tracing enabled!'; };"
  },
  TracingConfig: {
    Mode: "Active"
  },
  MemorySize: 128,
  Timeout: 10
});
```

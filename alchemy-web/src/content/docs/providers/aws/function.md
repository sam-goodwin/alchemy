---
title: AWS Lambda Function
description: Learn how to deploy, update, and manage AWS Lambda Functions using Alchemy for serverless compute in your applications.
---


The Function resource lets you create and manage [AWS Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) with support for Node.js runtimes, environment variables, and function URLs.

## Minimal Example

Create a basic Lambda function with default settings:

```ts
import { Function } from "alchemy/aws";

const func = await Function("api", {
  functionName: "my-api",
  bundle: bundle,
  roleArn: role.arn,
  handler: "index.handler"
});
```

## With Environment Variables

Add environment variables to configure the function:

```ts
const func = await Function("api", {
  functionName: "my-api", 
  bundle: bundle,
  roleArn: role.arn,
  handler: "index.handler",
  environment: {
    TABLE_NAME: table.name,
    QUEUE_URL: queue.url,
  }
});
```

## With Function URL

Create a public HTTP endpoint for the function:

```ts
const func = await Function("api", {
  functionName: "my-api",
  bundle: bundle,
  roleArn: role.arn,
  handler: "index.handler",
  url: {
    authType: "NONE",
    cors: {
      allowOrigins: ["*"],
      allowMethods: ["GET", "POST"],
      allowHeaders: ["content-type"]
    }
  }
});
```

## With Custom Configuration

Customize memory, timeout and other settings:

```ts
const func = await Function("worker", {
  functionName: "worker",
  bundle: bundle,
  roleArn: role.arn,
  handler: "worker.process",
  runtime: "nodejs20.x",
  architecture: "arm64",
  memorySize: 512,
  timeout: 30,
  tags: {
    Environment: "production"
  }
});
```

---
title: Url
description: Learn how to create, update, and manage AWS Lambda Urls using Alchemy Cloud Control.
---


The Url resource lets you manage [AWS Lambda Urls](https://docs.aws.amazon.com/lambda/latest/userguide/) for your Lambda functions, allowing you to expose them directly over HTTP(S).

## Minimal Example

Create a basic Lambda Url for a function with essential properties:

```ts
import AWS from "alchemy/aws/control";

const lambdaUrl = await AWS.Lambda.Url("myLambdaUrl", {
  TargetFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction",
  AuthType: "AWS_IAM", // Authentication type
  InvokeMode: "BUFFERED" // Invocation mode
});
```

## Advanced Configuration

Configure a Lambda Url with additional CORS settings and a specific qualifier:

```ts
const advancedLambdaUrl = await AWS.Lambda.Url("advancedLambdaUrl", {
  TargetFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction",
  AuthType: "AWS_IAM",
  InvokeMode: "BUFFERED",
  Cors: {
    AllowOrigins: ["https://example.com"],
    AllowMethods: ["GET", "POST"],
    AllowHeaders: ["Content-Type"]
  },
  Qualifier: "$LATEST" // Specify the version of the function
});
```

## Using an Existing Resource

If you want to adopt an existing Lambda Url instead of failing when it already exists:

```ts
const existingLambdaUrl = await AWS.Lambda.Url("existingLambdaUrl", {
  TargetFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myExistingLambdaFunction",
  AuthType: "NONE", // Public access
  adopt: true // Adopt existing resource
});
```

## Custom Invocation Mode

Create a Lambda Url with a different invocation mode for specific use cases:

```ts
const customInvocationModeUrl = await AWS.Lambda.Url("customInvocationUrl", {
  TargetFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myCustomLambdaFunction",
  AuthType: "AWS_IAM",
  InvokeMode: "DIRECT" // Direct invocation mode
});
```

---
title: Version
description: Learn how to create, update, and manage AWS Lambda Versions using Alchemy Cloud Control.
---


The Version resource lets you manage [AWS Lambda Versions](https://docs.aws.amazon.com/lambda/latest/userguide/) to ensure your functions are versioned and can be easily deployed or rolled back.

## Minimal Example

Create a basic Lambda version for an existing function with minimal settings:

```ts
import AWS from "alchemy/aws/control";

const lambdaVersion = await AWS.Lambda.Version("myLambdaVersion", {
  FunctionName: "myLambdaFunction"
});
```

## Advanced Configuration

Configure a Lambda version with additional options such as a description and provisioned concurrency settings:

```ts
const advancedLambdaVersion = await AWS.Lambda.Version("myAdvancedLambdaVersion", {
  FunctionName: "myLambdaFunction",
  Description: "Version 1.0 of my Lambda function with provisioned concurrency.",
  ProvisionedConcurrencyConfig: {
    ProvisionedConcurrentExecutions: 5
  }
});
```

## Version with Runtime Policy

Create a Lambda version that includes a runtime policy for additional security:

```ts
const lambdaVersionWithPolicy = await AWS.Lambda.Version("myLambdaVersionWithPolicy", {
  FunctionName: "myLambdaFunction",
  RuntimePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "lambda:InvokeFunction",
        Resource: "*"
      }
    ]
  }
});
```

## Version with Code SHA256

Deploy a Lambda version with a specific code SHA256 for integrity verification:

```ts
const lambdaVersionWithCodeSha = await AWS.Lambda.Version("myLambdaVersionWithCodeSha", {
  FunctionName: "myLambdaFunction",
  CodeSha256: "abc123...xyz"
});
```

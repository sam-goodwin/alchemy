---
title: Managing AWS Lambda Urls with Alchemy
description: Learn how to create, update, and manage AWS Lambda Urls using Alchemy Cloud Control.
---

# Url

The Url resource lets you manage [AWS Lambda Urls](https://docs.aws.amazon.com/lambda/latest/userguide/) that provide an HTTPS endpoint to invoke your Lambda functions directly over the internet.

## Minimal Example

Create a basic Lambda Url with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const lambdaUrl = await AWS.Lambda.Url("MyLambdaUrl", {
  TargetFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyFunction",
  AuthType: "NONE", // No authentication required
  Qualifier: "v1" // Optional: Specify a version or alias
});
```

## Advanced Configuration

Configure a Lambda Url with CORS settings to allow specific origins:

```ts
const corsConfiguredUrl = await AWS.Lambda.Url("CorsConfiguredLambdaUrl", {
  TargetFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyFunction",
  AuthType: "AWS_IAM", // Using AWS IAM for authentication
  Cors: {
    AllowOrigins: ["https://example.com"], // Allow requests from this origin
    AllowMethods: ["GET", "POST"], // Allow these HTTP methods
    AllowHeaders: ["Content-Type"] // Allow this header in requests
  }
});
```

## Adoption of Existing Resource

Create a Lambda Url while adopting an existing resource instead of failing:

```ts
const existingUrl = await AWS.Lambda.Url("ExistingLambdaUrl", {
  TargetFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyFunction",
  AuthType: "NONE",
  adopt: true // Adopt existing resource if it exists
});
```

## Security with IAM Authentication

Set up a Lambda Url that uses IAM authentication with proper policies:

```ts
const securedUrl = await AWS.Lambda.Url("SecuredLambdaUrl", {
  TargetFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyFunction",
  AuthType: "AWS_IAM",
  Cors: {
    AllowOrigins: ["https://myapp.com"],
    AllowMethods: ["GET", "POST", "OPTIONS"],
    AllowHeaders: ["Authorization", "Content-Type"]
  }
});

// Example IAM Policy for invoking the URL
const iamPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: "lambda:InvokeFunction",
      Resource: "arn:aws:lambda:us-west-2:123456789012:function:MyFunction"
    }
  ]
};
```
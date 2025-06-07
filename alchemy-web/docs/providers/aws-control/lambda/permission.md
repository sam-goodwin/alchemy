---
title: Managing AWS Lambda Permissions with Alchemy
description: Learn how to create, update, and manage AWS Lambda Permissions using Alchemy Cloud Control.
---

# Permission

The Permission resource allows you to manage [AWS Lambda Permissions](https://docs.aws.amazon.com/lambda/latest/userguide/) that grant specific AWS services or accounts the ability to invoke your Lambda functions.

## Minimal Example

Create a basic permission that allows an AWS service (e.g., S3) to invoke a Lambda function.

```ts
import AWS from "alchemy/aws/control";

const LambdaPermission = await AWS.Lambda.Permission("S3InvokePermission", {
  FunctionName: "MyLambdaFunction",
  Action: "lambda:InvokeFunction",
  Principal: "s3.amazonaws.com",
  SourceArn: "arn:aws:s3:::my-bucket",
  SourceAccount: "123456789012"
});
```

## Advanced Configuration

Configure a permission with an event source token for added security, which restricts the invocation to a specific event source.

```ts
const SecureLambdaPermission = await AWS.Lambda.Permission("SecureS3InvokePermission", {
  FunctionName: "MyLambdaFunction",
  Action: "lambda:InvokeFunction",
  Principal: "s3.amazonaws.com",
  SourceArn: "arn:aws:s3:::my-bucket",
  SourceAccount: "123456789012",
  EventSourceToken: "token-value-123"
});
```

## Conditional Access

Grant access based on specific conditions using the `PrincipalOrgID` property to limit invocation to a specific AWS Organization.

```ts
const OrgRestrictedLambdaPermission = await AWS.Lambda.Permission("OrgRestrictedPermission", {
  FunctionName: "MyLambdaFunction",
  Action: "lambda:InvokeFunction",
  Principal: "events.amazonaws.com",
  PrincipalOrgID: "o-1234567890",
  SourceArn: "arn:aws:events:us-west-2:123456789012:rule/MyRule"
});
```

## Using Function URL Authentication

Create a permission that uses Function URL Authentication to allow authenticated access.

```ts
const AuthenticatedLambdaPermission = await AWS.Lambda.Permission("AuthenticatedInvokePermission", {
  FunctionName: "MyLambdaFunction",
  Action: "lambda:InvokeFunction",
  Principal: "lambda.amazonaws.com",
  FunctionUrlAuthType: "AWS_IAM",
  SourceArn: "arn:aws:lambda:us-west-2:123456789012:function:MyLambdaFunction"
});
```
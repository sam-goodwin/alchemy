---
title: Permission
description: Learn how to create, update, and manage AWS Lambda Permissions using Alchemy Cloud Control.
---


The Permission resource allows you to manage [AWS Lambda Permissions](https://docs.aws.amazon.com/lambda/latest/userguide/) that control which services or accounts can invoke your Lambda functions.

## Minimal Example

Create a basic permission for a Lambda function to allow invocation from an AWS service (e.g., API Gateway):

```ts
import AWS from "alchemy/aws/control";

const lambdaPermission = await AWS.Lambda.Permission("apiGatewayInvokePermission", {
  FunctionName: "myLambdaFunction",
  Action: "lambda:InvokeFunction",
  Principal: "apigateway.amazonaws.com",
  SourceArn: "arn:aws:execute-api:us-east-1:123456789012:myApiId/*"
});
```

## Advanced Configuration

Configure a permission with an event source token for more secure invocation:

```ts
const secureLambdaPermission = await AWS.Lambda.Permission("secureInvokePermission", {
  FunctionName: "mySecureLambdaFunction",
  Action: "lambda:InvokeFunction",
  Principal: "events.amazonaws.com",
  SourceArn: "arn:aws:events:us-east-1:123456789012:rule/myEventRule",
  EventSourceToken: "myEventSourceToken"
});
```

## Allow Invocation from a Specific Account

Create a permission that allows a specific AWS account to invoke the Lambda function:

```ts
const accountInvokePermission = await AWS.Lambda.Permission("accountInvokePermission", {
  FunctionName: "myAccountLambdaFunction",
  Action: "lambda:InvokeFunction",
  Principal: "123456789012", // The AWS Account ID
  SourceAccount: "123456789012"
});
```

## Using Function URL with Auth Type

Set up a permission for a Lambda function URL with a specific authentication type:

```ts
const functionUrlPermission = await AWS.Lambda.Permission("functionUrlPermission", {
  FunctionName: "myFunctionUrlLambda",
  Action: "lambda:InvokeFunction",
  Principal: "*",
  FunctionUrlAuthType: "AWS_IAM"
});
```

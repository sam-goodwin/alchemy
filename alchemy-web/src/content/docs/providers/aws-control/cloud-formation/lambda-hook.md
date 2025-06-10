---
title: LambdaHook
description: Learn how to create, update, and manage AWS CloudFormation LambdaHooks using Alchemy Cloud Control.
---


The LambdaHook resource lets you manage [AWS CloudFormation LambdaHooks](https://docs.aws.amazon.com/cloudformation/latest/userguide/) for controlling the lifecycle of your CloudFormation stacks via AWS Lambda functions.

## Minimal Example

Create a basic LambdaHook with required properties and one optional property for stack filters.

```ts
import AWS from "alchemy/aws/control";

const simpleLambdaHook = await AWS.CloudFormation.LambdaHook("simpleLambdaHook", {
  HookStatus: "ACTIVE",
  Alias: "myLambdaHookAlias",
  TargetOperations: ["Create", "Update"],
  LambdaFunction: "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction",
  ExecutionRole: "arn:aws:iam::123456789012:role/myExecutionRole"
});
```

## Advanced Configuration

Configure a LambdaHook with advanced settings, including target filters and a failure mode.

```ts
const advancedLambdaHook = await AWS.CloudFormation.LambdaHook("advancedLambdaHook", {
  HookStatus: "ACTIVE",
  Alias: "myAdvancedLambdaHook",
  StackFilters: {
    Region: ["us-west-2"],
    AccountId: ["123456789012"]
  },
  TargetOperations: ["Delete"],
  TargetFilters: {
    ResourceTypes: ["AWS::S3::Bucket"]
  },
  LambdaFunction: "arn:aws:lambda:us-west-2:123456789012:function:myAdvancedLambdaFunction",
  ExecutionRole: "arn:aws:iam::123456789012:role/myAdvancedExecutionRole",
  FailureMode: "ROLLBACK"
});
```

## Adoption of Existing Resource

Create a LambdaHook that adopts an existing resource if it already exists.

```ts
const adoptingLambdaHook = await AWS.CloudFormation.LambdaHook("adoptLambdaHook", {
  HookStatus: "ACTIVE",
  Alias: "myAdoptLambdaHook",
  TargetOperations: ["Update"],
  LambdaFunction: "arn:aws:lambda:us-west-2:123456789012:function:myAdoptLambdaFunction",
  ExecutionRole: "arn:aws:iam::123456789012:role/myAdoptExecutionRole",
  adopt: true // Adopt existing resource instead of failing
});
``` 

## Integration with IAM Policy

Define a LambdaHook alongside an IAM policy for execution.

```ts
const lambdaExecutionRole = await AWS.IAM.Role("lambdaExecutionRole", {
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: { Service: "lambda.amazonaws.com" },
      Action: "sts:AssumeRole"
    }]
  },
  Policies: [{
    PolicyName: "LambdaHookPolicy",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [{
        Effect: "Allow",
        Action: ["cloudformation:DescribeStacks", "cloudformation:UpdateStack"],
        Resource: "*"
      }]
    }
  }]
});

const lambdaHookWithIAM = await AWS.CloudFormation.LambdaHook("lambdaHookWithIAM", {
  HookStatus: "ACTIVE",
  Alias: "myIAMLambdaHook",
  TargetOperations: ["Create", "Update"],
  LambdaFunction: "arn:aws:lambda:us-west-2:123456789012:function:myIAMLambdaFunction",
  ExecutionRole: lambdaExecutionRole.Arn
});
```

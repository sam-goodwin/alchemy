---
title: Managing AWS CloudFormation LambdaHooks with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation LambdaHooks using Alchemy Cloud Control.
---

# LambdaHook

The LambdaHook resource lets you create and manage [AWS CloudFormation LambdaHooks](https://docs.aws.amazon.com/cloudformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudformation-lambdahook.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const lambdahook = await AWS.CloudFormation.LambdaHook("lambdahook-example", {
  HookStatus: "example-hookstatus",
  Alias: "example-alias",
  TargetOperations: ["example-targetoperations-1"],
  LambdaFunction: "example-lambdafunction",
  ExecutionRole: "example-executionrole",
  FailureMode: "example-failuremode",
});
```


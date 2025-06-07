---
title: Managing AWS CloudFormation GuardHooks with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation GuardHooks using Alchemy Cloud Control.
---

# GuardHook

The GuardHook resource lets you create and manage [AWS CloudFormation GuardHooks](https://docs.aws.amazon.com/cloudformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudformation-guardhook.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const guardhook = await AWS.CloudFormation.GuardHook("guardhook-example", {
  RuleLocation: "example-rulelocation",
  HookStatus: "example-hookstatus",
  Alias: "example-alias",
  TargetOperations: ["example-targetoperations-1"],
  ExecutionRole: "example-executionrole",
  FailureMode: "example-failuremode",
});
```


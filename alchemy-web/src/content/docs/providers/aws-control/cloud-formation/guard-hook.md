---
title: GuardHook
description: Learn how to create, update, and manage AWS CloudFormation GuardHooks using Alchemy Cloud Control.
---


The GuardHook resource allows you to manage [AWS CloudFormation GuardHooks](https://docs.aws.amazon.com/cloudformation/latest/userguide/), which enable you to define custom rules that can be applied during CloudFormation stack operations.

## Minimal Example

Create a basic GuardHook with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicGuardHook = await AWS.CloudFormation.GuardHook("BasicGuardHook", {
  Alias: "MyGuardHook",
  RuleLocation: {
    Bucket: "my-guardhook-bucket",
    Key: "rules.yaml"
  },
  HookStatus: "ACTIVE",
  TargetOperations: ["CREATE", "UPDATE"],
  ExecutionRole: "arn:aws:iam::123456789012:role/MyGuardHookRole",
  FailureMode: "FAIL",
  Options: {
    TimeoutInMinutes: 10
  }
});
```

## Advanced Configuration

Configure a GuardHook with additional properties for more complex scenarios, including stack filters and logging.

```ts
const advancedGuardHook = await AWS.CloudFormation.GuardHook("AdvancedGuardHook", {
  Alias: "AdvancedGuardHookAlias",
  RuleLocation: {
    Bucket: "my-advanced-guardhook-bucket",
    Key: "advanced-rules.yaml"
  },
  HookStatus: "ACTIVE",
  TargetOperations: ["CREATE", "UPDATE", "DELETE"],
  ExecutionRole: "arn:aws:iam::123456789012:role/MyAdvancedGuardHookRole",
  FailureMode: "CONTINUE",
  LogBucket: "my-guardhook-log-bucket",
  StackFilters: {
    Include: ["MyStack"],
    Exclude: ["TestStack"]
  },
  TargetFilters: {
    ResourceTypes: ["AWS::S3::Bucket", "AWS::Lambda::Function"]
  }
});
```

## Adoption of Existing Resources

If you want to adopt existing resources instead of failing when a resource already exists, set the `adopt` property to true.

```ts
const adoptExistingGuardHook = await AWS.CloudFormation.GuardHook("AdoptExistingGuardHook", {
  Alias: "AdoptGuardHook",
  RuleLocation: {
    Bucket: "my-adopt-guardhook-bucket",
    Key: "adopt-rules.yaml"
  },
  HookStatus: "ACTIVE",
  TargetOperations: ["CREATE", "UPDATE"],
  ExecutionRole: "arn:aws:iam::123456789012:role/MyAdoptGuardHookRole",
  FailureMode: "FAIL",
  adopt: true
});
```

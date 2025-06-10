---
title: HookVersion
description: Learn how to create, update, and manage AWS CloudFormation HookVersions using Alchemy Cloud Control.
---


The HookVersion resource allows you to manage [AWS CloudFormation HookVersions](https://docs.aws.amazon.com/cloudformation/latest/userguide/), which are used to define custom hooks that can be invoked during CloudFormation stack operations.

## Minimal Example

Create a basic HookVersion with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicHookVersion = await AWS.CloudFormation.HookVersion("basicHook", {
  TypeName: "MyCustomHook",
  SchemaHandlerPackage: "s3://my-bucket/my-custom-hook.zip",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyHookExecutionRole"
});
```

## Advanced Configuration

Configure a HookVersion with logging configuration for better debugging and monitoring.

```ts
const advancedHookVersion = await AWS.CloudFormation.HookVersion("advancedHook", {
  TypeName: "MyAdvancedCustomHook",
  SchemaHandlerPackage: "s3://my-bucket/my-advanced-hook.zip",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyAdvancedHookExecutionRole",
  LoggingConfig: {
    LogGroupName: "/aws/cloudformation/my-hooks",
    LogRoleArn: "arn:aws:iam::123456789012:role/MyLoggingRole"
  }
});
```

## Resource Adoption

Create a HookVersion that adopts an existing resource instead of failing on creation.

```ts
const adoptExistingHookVersion = await AWS.CloudFormation.HookVersion("adoptHook", {
  TypeName: "MyAdoptHook",
  SchemaHandlerPackage: "s3://my-bucket/my-adopt-hook.zip",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyAdoptHookExecutionRole",
  adopt: true
});
```

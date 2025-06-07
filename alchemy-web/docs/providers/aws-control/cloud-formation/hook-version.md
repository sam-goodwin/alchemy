---
title: Managing AWS CloudFormation HookVersions with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation HookVersions using Alchemy Cloud Control.
---

# HookVersion

The HookVersion resource lets you manage [AWS CloudFormation HookVersions](https://docs.aws.amazon.com/cloudformation/latest/userguide/) and their configurations, enabling custom resource types that can be executed during stack operations.

## Minimal Example

Create a basic HookVersion with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicHookVersion = await AWS.CloudFormation.HookVersion("BasicHookVersion", {
  TypeName: "MyCustomHookType",
  SchemaHandlerPackage: "s3://my-bucket/my-hook.zip",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyHookExecutionRole"
});
```

## Advanced Configuration

Configure a HookVersion with advanced settings including logging configuration.

```ts
const AdvancedHookVersion = await AWS.CloudFormation.HookVersion("AdvancedHookVersion", {
  TypeName: "AdvancedCustomHookType",
  SchemaHandlerPackage: "s3://my-bucket/advanced-hook.zip",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/AdvancedHookExecutionRole",
  LoggingConfig: {
    LogGroupName: "my-hook-logs",
    LogRoleArn: "arn:aws:iam::123456789012:role/LoggingRole"
  }
});
```

## Adoption of Existing Resources

Demonstrate how to adopt an existing HookVersion instead of failing if the resource already exists.

```ts
const AdoptExistingHookVersion = await AWS.CloudFormation.HookVersion("AdoptExistingHookVersion", {
  TypeName: "ExistingCustomHookType",
  SchemaHandlerPackage: "s3://my-bucket/existing-hook.zip",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/ExistingHookExecutionRole",
  adopt: true
});
```
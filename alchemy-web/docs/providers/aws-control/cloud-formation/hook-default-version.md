---
title: Managing AWS CloudFormation HookDefaultVersions with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation HookDefaultVersions using Alchemy Cloud Control.
---

# HookDefaultVersion

The HookDefaultVersion resource allows you to define the default version of a CloudFormation hook in your AWS account. This is useful for managing custom hooks that can be associated with your CloudFormation stacks. For more details, refer to the [AWS CloudFormation HookDefaultVersions documentation](https://docs.aws.amazon.com/cloudformation/latest/userguide/).

## Minimal Example

Create a basic hook default version with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const DefaultHookVersion = await AWS.CloudFormation.HookDefaultVersion("MyDefaultHookVersion", {
  TypeName: "MyCustomHook",
  VersionId: "v1.0.0"
});
```

## Advanced Configuration

Configure a hook default version with additional optional properties such as `TypeVersionArn`.

```ts
const AdvancedHookVersion = await AWS.CloudFormation.HookDefaultVersion("AdvancedHookVersion", {
  TypeName: "MyAdvancedHook",
  VersionId: "v1.0.1",
  TypeVersionArn: "arn:aws:cloudformation:us-west-2:123456789012:type/MyAdvancedHook/v1.0.1"
});
```

## Adoption of Existing Resource

Set the `adopt` property to true to adopt an existing hook default version instead of failing if it already exists.

```ts
const AdoptedHookVersion = await AWS.CloudFormation.HookDefaultVersion("AdoptedHookVersion", {
  TypeName: "MyAdoptedHook",
  VersionId: "v1.0.0",
  adopt: true
});
```

## Complete Configuration Example

This example demonstrates a complete configuration with all properties, including optional metadata.

```ts
const CompleteHookVersion = await AWS.CloudFormation.HookDefaultVersion("CompleteHookVersion", {
  TypeName: "MyCompleteHook",
  VersionId: "v1.0.2",
  TypeVersionArn: "arn:aws:cloudformation:us-east-1:123456789012:type/MyCompleteHook/v1.0.2",
  adopt: false // Default is false
});
```
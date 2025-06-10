---
title: HookDefaultVersion
description: Learn how to create, update, and manage AWS CloudFormation HookDefaultVersions using Alchemy Cloud Control.
---


The HookDefaultVersion resource allows you to manage the default version of a CloudFormation hook, which can be used for custom resource types. This resource enables you to specify the hook's type name, version ID, and ARN. For more detailed information, visit the [AWS CloudFormation HookDefaultVersions documentation](https://docs.aws.amazon.com/cloudformation/latest/userguide/).

## Minimal Example

Create a basic HookDefaultVersion with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const hookDefaultVersion = await AWS.CloudFormation.HookDefaultVersion("MyHookDefaultVersion", {
  TypeName: "MyCustomHook",
  VersionId: "v1.0.0"
});
```

## Advanced Configuration

Here’s an example that includes additional optional properties like `TypeVersionArn` and `adopt`.

```ts
const advancedHookDefaultVersion = await AWS.CloudFormation.HookDefaultVersion("AdvancedHookDefaultVersion", {
  TypeName: "MyAdvancedCustomHook",
  VersionId: "v2.0.0",
  TypeVersionArn: "arn:aws:cloudformation:us-west-2:123456789012:type/MyAdvancedCustomHook/v2.0.0",
  adopt: true // Adopt existing resource if it already exists
});
```

## Adoption Scenario

This example shows how to adopt an existing hook default version instead of failing when it already exists.

```ts
const adoptHookDefaultVersion = await AWS.CloudFormation.HookDefaultVersion("AdoptExistingHook", {
  TypeName: "MyExistingCustomHook",
  VersionId: "v1.0.0",
  adopt: true // Set to true to adopt the existing resource
});
```

## Complete Hook Configuration

In this example, we set up a complete hook configuration with all relevant properties.

```ts
const completeHookDefaultVersion = await AWS.CloudFormation.HookDefaultVersion("CompleteHook", {
  TypeName: "MyCompleteCustomHook",
  VersionId: "v1.0.0",
  TypeVersionArn: "arn:aws:cloudformation:us-west-2:123456789012:type/MyCompleteCustomHook/v1.0.0",
  adopt: false // Set to false to fail if the resource exists
});
```

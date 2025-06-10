---
title: HookTypeConfig
description: Learn how to create, update, and manage AWS CloudFormation HookTypeConfigs using Alchemy Cloud Control.
---


The HookTypeConfig resource allows you to create and manage AWS CloudFormation Hook Type configurations. This resource is essential for defining custom hooks that can be invoked during stack operations. For more detailed information, refer to the [AWS CloudFormation HookTypeConfigs documentation](https://docs.aws.amazon.com/cloudformation/latest/userguide/).

## Minimal Example

Create a basic HookTypeConfig with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicHookTypeConfig = await AWS.CloudFormation.HookTypeConfig("BasicHookConfig", {
  TypeName: "MyCustomHookType",
  Configuration: JSON.stringify({
    key: "value"
  }),
  ConfigurationAlias: "MyHookAlias"
});
```

## Advanced Configuration

Configure a HookTypeConfig with additional optional properties for more advanced use cases.

```ts
const advancedHookTypeConfig = await AWS.CloudFormation.HookTypeConfig("AdvancedHookConfig", {
  TypeName: "MyAdvancedCustomHookType",
  Configuration: JSON.stringify({
    key: "value",
    timeout: 300
  }),
  TypeArn: "arn:aws:cloudformation:us-east-1:123456789012:hook/MyAdvancedCustomHookType",
  ConfigurationAlias: "MyAdvancedHookAlias",
  adopt: true // Allows adoption of an existing resource
});
```

## Adoption of Existing Resources

This example demonstrates how to configure the HookTypeConfig to adopt an existing resource instead of failing.

```ts
const adoptHookTypeConfig = await AWS.CloudFormation.HookTypeConfig("AdoptHookConfig", {
  TypeName: "AdoptableHookType",
  Configuration: JSON.stringify({
    key: "adoptValue"
  }),
  adopt: true // Enables adoption of the resource
});
```

## Configuration with Type ARN

Set up a HookTypeConfig while specifying the Type ARN for integration with other AWS services.

```ts
const hookWithTypeArn = await AWS.CloudFormation.HookTypeConfig("HookWithTypeArn", {
  TypeName: "MyHookWithArn",
  Configuration: JSON.stringify({
    key: "valueWithArn"
  }),
  TypeArn: "arn:aws:cloudformation:us-west-2:123456789012:hook/MyHookWithArn"
});
```

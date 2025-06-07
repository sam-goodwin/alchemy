---
title: Managing AWS CloudFormation TypeActivations with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation TypeActivations using Alchemy Cloud Control.
---

# TypeActivation

The TypeActivation resource lets you manage [AWS CloudFormation TypeActivations](https://docs.aws.amazon.com/cloudformation/latest/userguide/) to enable the use of custom resource types in your CloudFormation stacks.

## Minimal Example

Create a basic TypeActivation with essential properties.

```ts
import AWS from "alchemy/aws/control";

const BasicTypeActivation = await AWS.CloudFormation.TypeActivation("BasicTypeActivation", {
  TypeName: "MyCustomResource",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyCustomRole",
  MajorVersion: "1.0"
});
```

## Advanced Configuration

Configure a TypeActivation with additional settings such as logging and auto-update features.

```ts
const AdvancedTypeActivation = await AWS.CloudFormation.TypeActivation("AdvancedTypeActivation", {
  TypeName: "MyAdvancedCustomResource",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyAdvancedCustomRole",
  MajorVersion: "1.1",
  AutoUpdate: true,
  LoggingConfig: {
    LogGroupName: "MyCustomResourceLogs",
    LogRoleArn: "arn:aws:iam::123456789012:role/MyLoggingRole"
  }
});
```

## Adoption of Existing Resource

Adopt an existing TypeActivation instead of failing if it already exists.

```ts
const AdoptExistingTypeActivation = await AWS.CloudFormation.TypeActivation("AdoptExistingTypeActivation", {
  TypeName: "MyExistingResource",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyExistingRole",
  MajorVersion: "1.0",
  adopt: true
});
```

## Type Name Alias

Create a TypeActivation that includes a type name alias for better management.

```ts
const AliasTypeActivation = await AWS.CloudFormation.TypeActivation("AliasTypeActivation", {
  TypeName: "MyAliasResource",
  TypeNameAlias: "MyAliasForResource",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/MyAliasRole",
  MajorVersion: "1.2"
});
```
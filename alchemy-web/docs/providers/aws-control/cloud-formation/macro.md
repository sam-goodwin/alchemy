---
title: Managing AWS CloudFormation Macros with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation Macros using Alchemy Cloud Control.
---

# Macro

The Macro resource lets you define [AWS CloudFormation Macros](https://docs.aws.amazon.com/cloudformation/latest/userguide/) to perform custom processing on CloudFormation templates. Macros enable you to extend CloudFormation's functionality by transforming the template content before it is processed.

## Minimal Example

Create a basic CloudFormation Macro with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const BasicMacro = await AWS.CloudFormation.Macro("BasicMacroId", {
  Name: "MySampleMacro",
  FunctionName: "MyLambdaFunction",
  Description: "This macro processes CloudFormation templates to add custom resources."
});
```

## Advanced Configuration

Configure a Macro with logging enabled to monitor its execution:

```ts
const AdvancedMacro = await AWS.CloudFormation.Macro("AdvancedMacroId", {
  Name: "AdvancedSampleMacro",
  FunctionName: "MyAdvancedLambdaFunction",
  Description: "This macro enhances templates with additional resources and features.",
  LogGroupName: "/aws/cloudformation/macros",
  LogRoleARN: "arn:aws:iam::123456789012:role/MyMacroLoggingRole"
});
```

## Adoption of Existing Resources

Create a Macro that adopts an existing resource if it already exists:

```ts
const AdoptedMacro = await AWS.CloudFormation.Macro("AdoptedMacroId", {
  Name: "AdoptedMacro",
  FunctionName: "MyAdoptedFunction",
  adopt: true, // This will adopt the existing Macro resource if it exists
  Description: "This macro will adopt any pre-existing resources."
});
```

## Custom Logging Configuration

Set up a Macro with a specific logging configuration to capture detailed logs:

```ts
const LoggingMacro = await AWS.CloudFormation.Macro("LoggingMacroId", {
  Name: "LoggingMacro",
  FunctionName: "MyLoggingLambdaFunction",
  Description: "This macro logs all transformations for audit purposes.",
  LogGroupName: "/aws/cloudformation/custom-macro-logs",
  LogRoleARN: "arn:aws:iam::123456789012:role/LoggingRole"
});
```
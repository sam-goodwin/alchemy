---
title: Macro
description: Learn how to create, update, and manage AWS CloudFormation Macros using Alchemy Cloud Control.
---


The Macro resource lets you create and manage [AWS CloudFormation Macros](https://docs.aws.amazon.com/cloudformation/latest/userguide/) that enable you to perform custom processing on CloudFormation templates. Macros can be used to transform templates before they are processed into stacks.

## Minimal Example

Create a basic macro with a function name and a log group name.

```ts
import AWS from "alchemy/aws/control";

const cloudFormationMacro = await AWS.CloudFormation.Macro("MyMacro", {
  Name: "MyCustomMacro",
  FunctionName: "arn:aws:lambda:us-west-2:123456789012:function:MyLambdaFunction",
  LogGroupName: "/aws/lambda/MyCustomMacroLogs",
  Description: "This macro performs custom transformations on CloudFormation templates."
});
```

## Advanced Configuration

Configure a macro with additional logging role ARN and adoption property.

```ts
const advancedCloudFormationMacro = await AWS.CloudFormation.Macro("AdvancedMacro", {
  Name: "AdvancedCustomMacro",
  FunctionName: "arn:aws:lambda:us-west-2:123456789012:function:AdvancedLambdaFunction",
  LogGroupName: "/aws/lambda/AdvancedCustomMacroLogs",
  LogRoleARN: "arn:aws:iam::123456789012:role/MyLoggingRole",
  Description: "An advanced macro with specific logging configurations.",
  adopt: true // Allow adoption of existing resources
});
```

## Using with Existing Resources

Create a macro that adopts existing resources without failing if they already exist.

```ts
const adoptiveCloudFormationMacro = await AWS.CloudFormation.Macro("AdoptiveMacro", {
  Name: "AdoptiveCustomMacro",
  FunctionName: "arn:aws:lambda:us-west-2:123456789012:function:AdoptiveLambdaFunction",
  Description: "This macro adopts existing resources.",
  adopt: true
});
```

## Detailed Logging Configuration

Set up a macro with detailed logging configurations for better visibility.

```ts
const detailedLoggingMacro = await AWS.CloudFormation.Macro("LoggingMacro", {
  Name: "DetailedLoggingCustomMacro",
  FunctionName: "arn:aws:lambda:us-west-2:123456789012:function:LoggingLambdaFunction",
  LogGroupName: "/aws/lambda/DetailedLoggingMacroLogs",
  LogRoleARN: "arn:aws:iam::123456789012:role/LoggingRole",
  Description: "This macro provides detailed logging for transformations."
});
```

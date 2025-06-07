---
title: Managing AWS Lambda Aliass with Alchemy
description: Learn how to create, update, and manage AWS Lambda Aliass using Alchemy Cloud Control.
---

# Alias

The Alias resource lets you create and manage [AWS Lambda Aliass](https://docs.aws.amazon.com/lambda/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-alias.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const alias = await AWS.Lambda.Alias("alias-example", {
  FunctionName: "alias-function",
  FunctionVersion: "example-functionversion",
  Name: "alias-",
  Description: "A alias resource managed by Alchemy",
});
```

## Advanced Configuration

Create a alias with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAlias = await AWS.Lambda.Alias("advanced-alias", {
  FunctionName: "alias-function",
  FunctionVersion: "example-functionversion",
  Name: "alias-",
  Description: "A alias resource managed by Alchemy",
});
```


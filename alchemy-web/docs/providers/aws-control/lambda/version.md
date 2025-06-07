---
title: Managing AWS Lambda Versions with Alchemy
description: Learn how to create, update, and manage AWS Lambda Versions using Alchemy Cloud Control.
---

# Version

The Version resource lets you create and manage [AWS Lambda Versions](https://docs.aws.amazon.com/lambda/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-version.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const version = await AWS.Lambda.Version("version-example", {
  FunctionName: "version-function",
  Description: "A version resource managed by Alchemy",
});
```

## Advanced Configuration

Create a version with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVersion = await AWS.Lambda.Version("advanced-version", {
  FunctionName: "version-function",
  Description: "A version resource managed by Alchemy",
});
```


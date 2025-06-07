---
title: Managing AWS CodeBuild SourceCredentials with Alchemy
description: Learn how to create, update, and manage AWS CodeBuild SourceCredentials using Alchemy Cloud Control.
---

# SourceCredential

The SourceCredential resource lets you create and manage [AWS CodeBuild SourceCredentials](https://docs.aws.amazon.com/codebuild/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codebuild-sourcecredential.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const sourcecredential = await AWS.CodeBuild.SourceCredential("sourcecredential-example", {
  ServerType: "example-servertype",
  Token: "example-token",
  AuthType: "example-authtype",
});
```


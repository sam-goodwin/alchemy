---
title: Managing AWS OpenSearchServerless SecurityConfigs with Alchemy
description: Learn how to create, update, and manage AWS OpenSearchServerless SecurityConfigs using Alchemy Cloud Control.
---

# SecurityConfig

The SecurityConfig resource lets you create and manage [AWS OpenSearchServerless SecurityConfigs](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opensearchserverless-securityconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const securityconfig = await AWS.OpenSearchServerless.SecurityConfig("securityconfig-example", {
  Description: "A securityconfig resource managed by Alchemy",
});
```

## Advanced Configuration

Create a securityconfig with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSecurityConfig = await AWS.OpenSearchServerless.SecurityConfig(
  "advanced-securityconfig",
  { Description: "A securityconfig resource managed by Alchemy" }
);
```


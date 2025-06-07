---
title: Managing AWS OpenSearchServerless SecurityPolicys with Alchemy
description: Learn how to create, update, and manage AWS OpenSearchServerless SecurityPolicys using Alchemy Cloud Control.
---

# SecurityPolicy

The SecurityPolicy resource lets you create and manage [AWS OpenSearchServerless SecurityPolicys](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opensearchserverless-securitypolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const securitypolicy = await AWS.OpenSearchServerless.SecurityPolicy("securitypolicy-example", {
  Policy: "example-policy",
  Type: "example-type",
  Name: "securitypolicy-",
  Description: "A securitypolicy resource managed by Alchemy",
});
```

## Advanced Configuration

Create a securitypolicy with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSecurityPolicy = await AWS.OpenSearchServerless.SecurityPolicy(
  "advanced-securitypolicy",
  {
    Policy: "example-policy",
    Type: "example-type",
    Name: "securitypolicy-",
    Description: "A securitypolicy resource managed by Alchemy",
  }
);
```


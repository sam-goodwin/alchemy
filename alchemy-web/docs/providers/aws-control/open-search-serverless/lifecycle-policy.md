---
title: Managing AWS OpenSearchServerless LifecyclePolicys with Alchemy
description: Learn how to create, update, and manage AWS OpenSearchServerless LifecyclePolicys using Alchemy Cloud Control.
---

# LifecyclePolicy

The LifecyclePolicy resource lets you create and manage [AWS OpenSearchServerless LifecyclePolicys](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opensearchserverless-lifecyclepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const lifecyclepolicy = await AWS.OpenSearchServerless.LifecyclePolicy("lifecyclepolicy-example", {
  Policy: "example-policy",
  Type: "example-type",
  Name: "lifecyclepolicy-",
  Description: "A lifecyclepolicy resource managed by Alchemy",
});
```

## Advanced Configuration

Create a lifecyclepolicy with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLifecyclePolicy = await AWS.OpenSearchServerless.LifecyclePolicy(
  "advanced-lifecyclepolicy",
  {
    Policy: "example-policy",
    Type: "example-type",
    Name: "lifecyclepolicy-",
    Description: "A lifecyclepolicy resource managed by Alchemy",
  }
);
```


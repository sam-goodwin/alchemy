---
title: Managing AWS OpenSearchServerless AccessPolicys with Alchemy
description: Learn how to create, update, and manage AWS OpenSearchServerless AccessPolicys using Alchemy Cloud Control.
---

# AccessPolicy

The AccessPolicy resource lets you create and manage [AWS OpenSearchServerless AccessPolicys](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opensearchserverless-accesspolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accesspolicy = await AWS.OpenSearchServerless.AccessPolicy("accesspolicy-example", {
  Policy: "example-policy",
  Type: "example-type",
  Name: "accesspolicy-",
  Description: "A accesspolicy resource managed by Alchemy",
});
```

## Advanced Configuration

Create a accesspolicy with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAccessPolicy = await AWS.OpenSearchServerless.AccessPolicy("advanced-accesspolicy", {
  Policy: "example-policy",
  Type: "example-type",
  Name: "accesspolicy-",
  Description: "A accesspolicy resource managed by Alchemy",
});
```


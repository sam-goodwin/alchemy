---
title: Managing AWS Logs ResourcePolicys with Alchemy
description: Learn how to create, update, and manage AWS Logs ResourcePolicys using Alchemy Cloud Control.
---

# ResourcePolicy

The ResourcePolicy resource lets you create and manage [AWS Logs ResourcePolicys](https://docs.aws.amazon.com/logs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-resourcepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourcepolicy = await AWS.Logs.ResourcePolicy("resourcepolicy-example", {
  PolicyName: "resourcepolicy-policy",
  PolicyDocument: "example-policydocument",
});
```


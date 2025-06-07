---
title: Managing AWS Lex ResourcePolicys with Alchemy
description: Learn how to create, update, and manage AWS Lex ResourcePolicys using Alchemy Cloud Control.
---

# ResourcePolicy

The ResourcePolicy resource lets you create and manage [AWS Lex ResourcePolicys](https://docs.aws.amazon.com/lex/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lex-resourcepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourcepolicy = await AWS.Lex.ResourcePolicy("resourcepolicy-example", {
  Policy: {},
  ResourceArn: "example-resourcearn",
});
```


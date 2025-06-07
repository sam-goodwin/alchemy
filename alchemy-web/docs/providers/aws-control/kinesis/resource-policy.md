---
title: Managing AWS Kinesis ResourcePolicys with Alchemy
description: Learn how to create, update, and manage AWS Kinesis ResourcePolicys using Alchemy Cloud Control.
---

# ResourcePolicy

The ResourcePolicy resource lets you create and manage [AWS Kinesis ResourcePolicys](https://docs.aws.amazon.com/kinesis/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesis-resourcepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourcepolicy = await AWS.Kinesis.ResourcePolicy("resourcepolicy-example", {
  ResourceArn: "example-resourcearn",
  ResourcePolicy: {},
});
```


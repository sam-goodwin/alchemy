---
title: Managing AWS IAM Groups with Alchemy
description: Learn how to create, update, and manage AWS IAM Groups using Alchemy Cloud Control.
---

# Group

The Group resource lets you create and manage [AWS IAM Groups](https://docs.aws.amazon.com/iam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-group.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const group = await AWS.IAM.Group("group-example", {});
```


---
title: Managing AWS IAM AccessKeys with Alchemy
description: Learn how to create, update, and manage AWS IAM AccessKeys using Alchemy Cloud Control.
---

# AccessKey

The AccessKey resource lets you create and manage [AWS IAM AccessKeys](https://docs.aws.amazon.com/iam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accesskey = await AWS.IAM.AccessKey("accesskey-example", { UserName: "accesskey-user" });
```


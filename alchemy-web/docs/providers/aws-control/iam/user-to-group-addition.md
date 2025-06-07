---
title: Managing AWS IAM UserToGroupAdditions with Alchemy
description: Learn how to create, update, and manage AWS IAM UserToGroupAdditions using Alchemy Cloud Control.
---

# UserToGroupAddition

The UserToGroupAddition resource lets you create and manage [AWS IAM UserToGroupAdditions](https://docs.aws.amazon.com/iam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-addusertogroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const usertogroupaddition = await AWS.IAM.UserToGroupAddition("usertogroupaddition-example", {
  GroupName: "usertogroupaddition-group",
  Users: ["example-users-1"],
});
```


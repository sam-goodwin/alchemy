---
title: Managing AWS IAM InstanceProfiles with Alchemy
description: Learn how to create, update, and manage AWS IAM InstanceProfiles using Alchemy Cloud Control.
---

# InstanceProfile

The InstanceProfile resource lets you create and manage [AWS IAM InstanceProfiles](https://docs.aws.amazon.com/iam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-instanceprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const instanceprofile = await AWS.IAM.InstanceProfile("instanceprofile-example", {
  Roles: ["example-roles-1"],
});
```


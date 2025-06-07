---
title: Managing AWS OpsWorks UserProfiles with Alchemy
description: Learn how to create, update, and manage AWS OpsWorks UserProfiles using Alchemy Cloud Control.
---

# UserProfile

The UserProfile resource lets you create and manage [AWS OpsWorks UserProfiles](https://docs.aws.amazon.com/opsworks/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opsworks-userprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const userprofile = await AWS.OpsWorks.UserProfile("userprofile-example", {
  IamUserArn: "example-iamuserarn",
});
```


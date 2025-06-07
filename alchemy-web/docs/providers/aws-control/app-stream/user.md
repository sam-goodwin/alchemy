---
title: Managing AWS AppStream Users with Alchemy
description: Learn how to create, update, and manage AWS AppStream Users using Alchemy Cloud Control.
---

# User

The User resource lets you create and manage [AWS AppStream Users](https://docs.aws.amazon.com/appstream/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const user = await AWS.AppStream.User("user-example", {
  UserName: "user-user",
  AuthenticationType: "example-authenticationtype",
});
```


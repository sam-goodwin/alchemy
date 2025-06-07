---
title: Managing AWS Cognito UserPoolGroups with Alchemy
description: Learn how to create, update, and manage AWS Cognito UserPoolGroups using Alchemy Cloud Control.
---

# UserPoolGroup

The UserPoolGroup resource lets you create and manage [AWS Cognito UserPoolGroups](https://docs.aws.amazon.com/cognito/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolgroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const userpoolgroup = await AWS.Cognito.UserPoolGroup("userpoolgroup-example", {
  UserPoolId: "example-userpoolid",
  Description: "A userpoolgroup resource managed by Alchemy",
});
```

## Advanced Configuration

Create a userpoolgroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedUserPoolGroup = await AWS.Cognito.UserPoolGroup("advanced-userpoolgroup", {
  UserPoolId: "example-userpoolid",
  Description: "A userpoolgroup resource managed by Alchemy",
});
```


---
title: Managing AWS Cognito UserPoolResourceServers with Alchemy
description: Learn how to create, update, and manage AWS Cognito UserPoolResourceServers using Alchemy Cloud Control.
---

# UserPoolResourceServer

The UserPoolResourceServer resource lets you create and manage [AWS Cognito UserPoolResourceServers](https://docs.aws.amazon.com/cognito/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolresourceserver.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const userpoolresourceserver = await AWS.Cognito.UserPoolResourceServer(
  "userpoolresourceserver-example",
  {
    UserPoolId: "example-userpoolid",
    Identifier: "example-identifier",
    Name: "userpoolresourceserver-",
  }
);
```


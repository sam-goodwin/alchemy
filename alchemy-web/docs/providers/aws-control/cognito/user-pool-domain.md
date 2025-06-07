---
title: Managing AWS Cognito UserPoolDomains with Alchemy
description: Learn how to create, update, and manage AWS Cognito UserPoolDomains using Alchemy Cloud Control.
---

# UserPoolDomain

The UserPoolDomain resource lets you create and manage [AWS Cognito UserPoolDomains](https://docs.aws.amazon.com/cognito/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooldomain.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const userpooldomain = await AWS.Cognito.UserPoolDomain("userpooldomain-example", {
  UserPoolId: "example-userpoolid",
  Domain: "example-domain",
});
```


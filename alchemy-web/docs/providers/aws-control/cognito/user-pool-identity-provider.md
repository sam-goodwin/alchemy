---
title: Managing AWS Cognito UserPoolIdentityProviders with Alchemy
description: Learn how to create, update, and manage AWS Cognito UserPoolIdentityProviders using Alchemy Cloud Control.
---

# UserPoolIdentityProvider

The UserPoolIdentityProvider resource lets you create and manage [AWS Cognito UserPoolIdentityProviders](https://docs.aws.amazon.com/cognito/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolidentityprovider.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const userpoolidentityprovider = await AWS.Cognito.UserPoolIdentityProvider(
  "userpoolidentityprovider-example",
  {
    ProviderName: "userpoolidentityprovider-provider",
    UserPoolId: "example-userpoolid",
    ProviderDetails: {},
    ProviderType: "example-providertype",
  }
);
```


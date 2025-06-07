---
title: Managing AWS Cognito UserPoolUsers with Alchemy
description: Learn how to create, update, and manage AWS Cognito UserPoolUsers using Alchemy Cloud Control.
---

# UserPoolUser

The UserPoolUser resource lets you manage [AWS Cognito UserPoolUsers](https://docs.aws.amazon.com/cognito/latest/userguide/) for user authentication and management within your applications.

## Minimal Example

Create a basic Cognito UserPoolUser with required properties and one common optional property.

```ts
import AWS from "alchemy/aws/control";

const NewUser = await AWS.Cognito.UserPoolUser("NewUser", {
  UserPoolId: "us-west-2_aBcDeFgHi",
  Username: "johndoe",
  UserAttributes: [
    {
      Name: "email",
      Value: "johndoe@example.com"
    },
    {
      Name: "phone_number",
      Value: "+11234567890"
    }
  ],
  ValidationData: [
    {
      Name: "custom:company",
      Value: "ExampleCorp"
    }
  ]
});
```

## Advanced Configuration

Configure a UserPoolUser with additional settings like message action and client metadata.

```ts
const AdvancedUser = await AWS.Cognito.UserPoolUser("AdvancedUser", {
  UserPoolId: "us-east-1_xYzAbCdEf",
  Username: "janedoe",
  UserAttributes: [
    {
      Name: "email",
      Value: "janedoe@example.com"
    }
  ],
  MessageAction: "SUPPRESS", // Suppresses sending the welcome message
  ClientMetadata: {
    source: "mobile_app",
    version: "1.0"
  }
});
```

## Creating User with Alias

Create a UserPoolUser while allowing for alias creation.

```ts
const UserWithAlias = await AWS.Cognito.UserPoolUser("UserWithAlias", {
  UserPoolId: "us-west-2_aBcDeFgHi",
  Username: "aliasuser",
  UserAttributes: [
    {
      Name: "email",
      Value: "aliasuser@example.com"
    },
    {
      Name: "preferred_username",
      Value: "aliasuser123"
    }
  ],
  ForceAliasCreation: true // Forces the creation of an alias
});
```
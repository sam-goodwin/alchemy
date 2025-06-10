---
title: UserPoolUser
description: Learn how to create, update, and manage AWS Cognito UserPoolUsers using Alchemy Cloud Control.
---


The UserPoolUser resource allows you to manage [AWS Cognito UserPoolUsers](https://docs.aws.amazon.com/cognito/latest/userguide/) that represent individual users in your Cognito User Pool.

## Minimal Example

Create a basic UserPoolUser with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const userPoolUser = await AWS.Cognito.UserPoolUser("newUser", {
  UserPoolId: "us-east-1_examplepool",
  Username: "john.doe@example.com",
  UserAttributes: [
    { Name: "email", Value: "john.doe@example.com" },
    { Name: "phone_number", Value: "+15555551234" }
  ]
});
```

## Advanced Configuration

Create a UserPoolUser with additional configurations including validation data and message action:

```ts
const advancedUserPoolUser = await AWS.Cognito.UserPoolUser("advancedUser", {
  UserPoolId: "us-east-1_examplepool",
  Username: "jane.doe@example.com",
  UserAttributes: [
    { Name: "email", Value: "jane.doe@example.com" },
    { Name: "name", Value: "Jane Doe" }
  ],
  ValidationData: [
    { Name: "custom:role", Value: "admin" }
  ],
  MessageAction: "SUPPRESS" // Suppresses the welcome message
});
```

## User with Alias Creation

Create a UserPoolUser with alias creation enabled for seamless sign-in:

```ts
const aliasUser = await AWS.Cognito.UserPoolUser("aliasUser", {
  UserPoolId: "us-east-1_examplepool",
  Username: "alias@example.com",
  UserAttributes: [
    { Name: "email", Value: "alias@example.com" },
    { Name: "preferred_username", Value: "aliasUser" }
  ],
  ForceAliasCreation: true // Forces alias creation for the user
});
```

## User with Custom Client Metadata

Create a UserPoolUser while passing client metadata for custom handling in your application:

```ts
const metadataUser = await AWS.Cognito.UserPoolUser("metadataUser", {
  UserPoolId: "us-east-1_examplepool",
  Username: "metadata@example.com",
  UserAttributes: [
    { Name: "email", Value: "metadata@example.com" }
  ],
  ClientMetadata: {
    source: "signupForm",
    referralCode: "REF123"
  }
});
```

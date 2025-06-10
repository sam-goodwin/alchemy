---
title: UserPool
description: Learn how to create, update, and manage AWS Cognito UserPools using Alchemy Cloud Control.
---


The UserPool resource lets you manage [AWS Cognito UserPools](https://docs.aws.amazon.com/cognito/latest/userguide/) for user authentication and management in your applications.

## Minimal Example

Create a basic UserPool with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const userPool = await AWS.Cognito.UserPool("myUserPool", {
  UserPoolName: "MyUserPool",
  Policies: {
    PasswordPolicy: {
      MinimumLength: 8,
      RequireUppercase: true,
      RequireLowercase: true,
      RequireNumbers: true,
      RequireSymbols: true
    }
  },
  UserPoolTags: {
    Environment: "Development",
    Purpose: "User Authentication"
  }
});
```

## Advanced Configuration

Configure a UserPool with advanced settings, including multi-factor authentication (MFA) and email configurations.

```ts
const advancedUserPool = await AWS.Cognito.UserPool("advancedUserPool", {
  UserPoolName: "AdvancedUserPool",
  MfaConfiguration: "ON",
  SmsConfiguration: {
    SnsCallerArn: "arn:aws:iam::123456789012:role/SMSRole",
    ExternalId: "MyExternalId"
  },
  EmailConfiguration: {
    EmailSendingAccount: "DEVELOPER",
    From: "no-reply@mydomain.com",
    ReplyToEmailAddress: "support@mydomain.com",
    SourceArn: "arn:aws:ses:us-west-2:123456789012:identity/mydomain.com"
  },
  UserPoolTags: {
    Environment: "Production"
  }
});
```

## Custom User Attributes

Add custom user attributes to the UserPool schema.

```ts
const customAttributeUserPool = await AWS.Cognito.UserPool("customAttrUserPool", {
  UserPoolName: "CustomAttributeUserPool",
  Schema: [
    {
      Name: "custom:favorite_color",
      AttributeDataType: "String",
      Mutable: true,
      Required: false
    },
    {
      Name: "custom:birthdate",
      AttributeDataType: "String",
      Mutable: true,
      Required: false
    }
  ],
  UserPoolTags: {
    Purpose: "User Management"
  }
});
```

## User Sign-Up Configuration

Set up a UserPool with configurations for user sign-up and account recovery.

```ts
const signUpConfigUserPool = await AWS.Cognito.UserPool("signUpConfigUserPool", {
  UserPoolName: "SignUpConfigUserPool",
  AdminCreateUserConfig: {
    AllowAdminCreateUserOnly: false,
    UnusedAccountValidityDays: 7
  },
  AccountRecoverySetting: {
    RecoveryMechanisms: [
      {
        Name: "verified_email",
        Priority: 1
      },
      {
        Name: "verified_phone_number",
        Priority: 2
      }
    ]
  },
  UserPoolTags: {
    Purpose: "User Authentication"
  }
});
```

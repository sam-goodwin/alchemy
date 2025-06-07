---
title: Managing AWS Cognito UserPools with Alchemy
description: Learn how to create, update, and manage AWS Cognito UserPools using Alchemy Cloud Control.
---

# UserPool

The UserPool resource lets you manage [AWS Cognito UserPools](https://docs.aws.amazon.com/cognito/latest/userguide/) for user authentication and management within your applications.

## Minimal Example

Create a basic UserPool with default settings and tags.

```ts
import AWS from "alchemy/aws/control";

const BasicUserPool = await AWS.Cognito.UserPool("BasicUserPool", {
  UserPoolName: "BasicUserPool",
  UserPoolTags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "UserManagement" }
  ],
  MfaConfiguration: "OFF"
});
```

## Advanced Configuration

Configure a UserPool with custom policies and email settings.

```ts
const AdvancedUserPool = await AWS.Cognito.UserPool("AdvancedUserPool", {
  UserPoolName: "AdvancedUserPool",
  Policies: {
    PasswordPolicy: {
      MinimumLength: 8,
      RequireUppercase: true,
      RequireLowercase: true,
      RequireNumbers: true,
      RequireSymbols: true
    }
  },
  EmailConfiguration: {
    EmailSendingAccount: "DEVELOPER",
    From: "no-reply@myapp.com",
    SourceArn: "arn:aws:ses:us-east-1:123456789012:identity/myapp.com"
  },
  SmsConfiguration: {
    SnsCallerArn: "arn:aws:iam::123456789012:role/sns-caller-role",
    ExternalId: "my-external-id"
  }
});
```

## User Attributes Configuration

Create a UserPool with specific user attributes and verification settings.

```ts
const UserAttributesUserPool = await AWS.Cognito.UserPool("UserAttributesUserPool", {
  UserPoolName: "UserAttributesUserPool",
  Schema: [
    { Name: "email", Required: true, Mutable: true },
    { Name: "phone_number", Required: true, Mutable: false }
  ],
  VerificationMessageTemplate: {
    EmailMessage: "Your verification code is {####}",
    EmailSubject: "Verify your email address",
    SmsMessage: "Your verification code is {####}"
  }
});
```

## Multi-Factor Authentication (MFA) Configuration

Set up a UserPool with MFA enabled.

```ts
const MfaUserPool = await AWS.Cognito.UserPool("MfaUserPool", {
  UserPoolName: "MfaUserPool",
  MfaConfiguration: "ON",
  SmsConfiguration: {
    SnsCallerArn: "arn:aws:iam::123456789012:role/sns-caller-role",
    ExternalId: "my-external-id"
  },
  AdminCreateUserConfig: {
    AllowAdminCreateUserOnly: true,
    UnusedAccountValidityDays: 7
  }
});
```
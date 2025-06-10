---
title: UserPoolClient
description: Learn how to create, update, and manage AWS Cognito UserPoolClients using Alchemy Cloud Control.
---


The UserPoolClient resource lets you manage [AWS Cognito UserPoolClients](https://docs.aws.amazon.com/cognito/latest/userguide/) for your applications, allowing for user authentication and management.

## Minimal Example

Create a basic UserPoolClient with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const userPoolClient = await AWS.Cognito.UserPoolClient("basicUserPoolClient", {
  UserPoolId: "us-east-1_examplePoolId",
  ClientName: "exampleAppClient",
  GenerateSecret: true,
  CallbackURLs: ["https://example.com/callback"],
  LogoutURLs: ["https://example.com/logout"],
  AllowedOAuthFlows: ["code", "implicit"],
  AllowedOAuthScopes: ["openid", "email"]
});
```

## Advanced Configuration

Configure a UserPoolClient with advanced token validity settings and additional attributes.

```ts
const advancedUserPoolClient = await AWS.Cognito.UserPoolClient("advancedUserPoolClient", {
  UserPoolId: "us-east-1_examplePoolId",
  ClientName: "advancedAppClient",
  AccessTokenValidity: 60, // in minutes
  IdTokenValidity: 60, // in minutes
  RefreshTokenValidity: 30, // in days
  TokenValidityUnits: {
    AccessToken: "minutes",
    IdToken: "minutes",
    RefreshToken: "days"
  },
  ReadAttributes: ["email", "phone_number"],
  WriteAttributes: ["email", "name"]
});
```

## Custom Authentication Flows

Set up a UserPoolClient to support explicit authentication flows.

```ts
const customAuthUserPoolClient = await AWS.Cognito.UserPoolClient("customAuthUserPoolClient", {
  UserPoolId: "us-east-1_examplePoolId",
  ClientName: "customAuthClient",
  ExplicitAuthFlows: ["ALLOW_ADMIN_USER_PASSWORD_AUTH", "ALLOW_USER_PASSWORD_AUTH"],
  EnablePropagateAdditionalUserContextData: true,
  PreventUserExistenceErrors: "ENABLED"
});
```

## Analytics Configuration

Enable analytics for the UserPoolClient to track user sign-in activities.

```ts
const analyticsUserPoolClient = await AWS.Cognito.UserPoolClient("analyticsUserPoolClient", {
  UserPoolId: "us-east-1_examplePoolId",
  ClientName: "analyticsClient",
  AnalyticsConfiguration: {
    ApplicationId: "1234567890",
    RoleArn: "arn:aws:iam::123456789012:role/CognitoAnalyticsRole",
    ExternalId: "exampleExternalId",
    UserDataShared: true
  }
});
``` 

These examples demonstrate how to define different configurations for AWS Cognito UserPoolClients using Alchemy, catering to various application needs.

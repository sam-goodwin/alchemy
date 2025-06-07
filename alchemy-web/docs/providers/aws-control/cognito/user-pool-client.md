---
title: Managing AWS Cognito UserPoolClients with Alchemy
description: Learn how to create, update, and manage AWS Cognito UserPoolClients using Alchemy Cloud Control.
---

# UserPoolClient

The UserPoolClient resource allows you to manage [AWS Cognito UserPoolClients](https://docs.aws.amazon.com/cognito/latest/userguide/) for handling user authentication and access management in your applications.

## Minimal Example

This example demonstrates how to create a basic UserPoolClient with required properties and a couple of common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const BasicUserPoolClient = await AWS.Cognito.UserPoolClient("BasicUserPoolClient", {
  UserPoolId: "us-east-1_examplePool",
  ClientName: "BasicClient",
  GenerateSecret: true,
  CallbackURLs: ["https://example.com/callback"],
  LogoutURLs: ["https://example.com/logout"],
  AllowedOAuthFlows: ["code", "implicit"],
  AllowedOAuthScopes: ["email", "openid"]
});
```

## Advanced Configuration

In this example, we demonstrate how to configure advanced settings such as token validity and analytics configuration for the UserPoolClient.

```ts
const AdvancedUserPoolClient = await AWS.Cognito.UserPoolClient("AdvancedUserPoolClient", {
  UserPoolId: "us-east-1_examplePool",
  ClientName: "AdvancedClient",
  IdTokenValidity: 60, // Token valid for 60 minutes
  AccessTokenValidity: 30, // Access token valid for 30 minutes
  RefreshTokenValidity: 30, // Refresh token valid for 30 days
  TokenValidityUnits: {
    IdToken: "minutes",
    AccessToken: "minutes",
    RefreshToken: "days"
  },
  AnalyticsConfiguration: {
    ApplicationId: "example-analytics-app-id",
    RoleArn: "arn:aws:iam::123456789012:role/service-role/Cognito_Analytics_Role",
    ExternalId: "example-external-id",
    UserDataShared: true
  }
});
```

## Custom Auth Flows

This example illustrates how to set up custom authentication flows by enabling explicit authentication flows and specifying attributes that can be read and written.

```ts
const CustomAuthUserPoolClient = await AWS.Cognito.UserPoolClient("CustomAuthUserPoolClient", {
  UserPoolId: "us-east-1_examplePool",
  ClientName: "CustomAuthClient",
  ExplicitAuthFlows: ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"],
  ReadAttributes: ["email", "phone_number"],
  WriteAttributes: ["email", "phone_number"]
});
```

## Propagate User Context Data

In this example, we configure the UserPoolClient to propagate additional user context data for enhanced security and user tracking.

```ts
const ContextDataUserPoolClient = await AWS.Cognito.UserPoolClient("ContextDataUserPoolClient", {
  UserPoolId: "us-east-1_examplePool",
  ClientName: "ContextDataClient",
  EnablePropagateAdditionalUserContextData: true,
  AllowedOAuthFlowsUserPoolClient: true
});
```
---
title: UserPoolIdentityProvider
description: Learn how to create, update, and manage AWS Cognito UserPoolIdentityProviders using Alchemy Cloud Control.
---


The UserPoolIdentityProvider resource lets you manage [AWS Cognito UserPool Identity Providers](https://docs.aws.amazon.com/cognito/latest/userguide/) for authentication within your applications.

## Minimal Example

Create a basic Cognito UserPool Identity Provider with required properties and one optional attribute mapping.

```ts
import AWS from "alchemy/aws/control";

const identityProvider = await AWS.Cognito.UserPoolIdentityProvider("myIdentityProvider", {
  ProviderName: "myProvider",
  UserPoolId: "us-east-1_123456789",
  AttributeMapping: {
    email: "email",
    name: "name"
  },
  ProviderDetails: {
    authorizationEndpoint: "https://auth.example.com/oauth2/authorize",
    tokenEndpoint: "https://auth.example.com/oauth2/token",
    // Additional provider details as needed
  },
  ProviderType: "OAuth2"
});
```

## Advanced Configuration

Configure the identity provider with additional details and identifiers for enhanced functionality.

```ts
const advancedIdentityProvider = await AWS.Cognito.UserPoolIdentityProvider("advancedIdentityProvider", {
  ProviderName: "advancedProvider",
  UserPoolId: "us-east-1_987654321",
  AttributeMapping: {
    email: "email",
    username: "username"
  },
  ProviderDetails: {
    authorizationEndpoint: "https://advanced.auth.example.com/oauth2/authorize",
    tokenEndpoint: "https://advanced.auth.example.com/oauth2/token",
    // Additional provider details as needed
    scopes: "openid profile email"
  },
  ProviderType: "OAuth2",
  IdpIdentifiers: ["advancedProviderId"]
});
```

## Using with Existing Identity Provider

Adopt an existing identity provider instead of creating a new one.

```ts
const existingIdentityProvider = await AWS.Cognito.UserPoolIdentityProvider("existingIdentityProvider", {
  ProviderName: "existingProvider",
  UserPoolId: "us-east-1_existing",
  ProviderDetails: {
    authorizationEndpoint: "https://existing.auth.example.com/oauth2/authorize",
    tokenEndpoint: "https://existing.auth.example.com/oauth2/token",
  },
  ProviderType: "OAuth2",
  adopt: true
});
```

## Custom Attribute Mapping

Create an identity provider with a custom attribute mapping for more flexible user data management.

```ts
const customAttributeIdentityProvider = await AWS.Cognito.UserPoolIdentityProvider("customAttributeProvider", {
  ProviderName: "customAttributesProvider",
  UserPoolId: "us-east-1_custom",
  AttributeMapping: {
    email: "user_email",
    phoneNumber: "user_phone"
  },
  ProviderDetails: {
    authorizationEndpoint: "https://custom.auth.example.com/oauth2/authorize",
    tokenEndpoint: "https://custom.auth.example.com/oauth2/token",
  },
  ProviderType: "OAuth2"
});
```

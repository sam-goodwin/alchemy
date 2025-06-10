---
title: IdentityProvider
description: Learn how to create, update, and manage AWS WorkSpacesWeb IdentityProviders using Alchemy Cloud Control.
---


The IdentityProvider resource lets you manage [AWS WorkSpacesWeb IdentityProviders](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) for user authentication in your applications.

## Minimal Example

Create a basic IdentityProvider with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const identityProvider = await AWS.WorkSpacesWeb.IdentityProvider("myIdentityProvider", {
  IdentityProviderDetails: {
    issuer: "https://my-issuer.com",
    authorizationEndpoint: "https://my-issuer.com/oauth2/authorize",
    tokenEndpoint: "https://my-issuer.com/oauth2/token",
    userInfoEndpoint: "https://my-issuer.com/oauth2/userinfo"
  },
  IdentityProviderName: "MyIdentityProvider",
  IdentityProviderType: "OIDC",
  PortalArn: "arn:aws:workspaces-web:us-east-1:123456789012:portal/myPortal"
});
```

## Advanced Configuration

Configure an IdentityProvider with tags for better resource management.

```ts
const advancedIdentityProvider = await AWS.WorkSpacesWeb.IdentityProvider("advancedIdentityProvider", {
  IdentityProviderDetails: {
    issuer: "https://advanced-issuer.com",
    authorizationEndpoint: "https://advanced-issuer.com/oauth2/authorize",
    tokenEndpoint: "https://advanced-issuer.com/oauth2/token",
    userInfoEndpoint: "https://advanced-issuer.com/oauth2/userinfo"
  },
  IdentityProviderName: "AdvancedIdentityProvider",
  IdentityProviderType: "OIDC",
  PortalArn: "arn:aws:workspaces-web:us-east-1:123456789012:portal/myAdvancedPortal",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Setting Up a SAML Identity Provider

Here’s how to set up an IdentityProvider using SAML for authentication.

```ts
const samlIdentityProvider = await AWS.WorkSpacesWeb.IdentityProvider("samlIdentityProvider", {
  IdentityProviderDetails: {
    issuer: "https://my-saml-issuer.com",
    authorizationEndpoint: "https://my-saml-issuer.com/saml/authorize",
    tokenEndpoint: "https://my-saml-issuer.com/saml/token",
    userInfoEndpoint: "https://my-saml-issuer.com/saml/userinfo"
  },
  IdentityProviderName: "SAMLIdentityProvider",
  IdentityProviderType: "SAML",
  PortalArn: "arn:aws:workspaces-web:us-east-1:123456789012:portal/mySamlPortal"
});
```

## Customizing Provider Details

This example demonstrates how to customize the details for an IdentityProvider, including additional claims.

```ts
const customIdentityProvider = await AWS.WorkSpacesWeb.IdentityProvider("customIdentityProvider", {
  IdentityProviderDetails: {
    issuer: "https://custom-issuer.com",
    authorizationEndpoint: "https://custom-issuer.com/oauth2/authorize",
    tokenEndpoint: "https://custom-issuer.com/oauth2/token",
    userInfoEndpoint: "https://custom-issuer.com/oauth2/userinfo",
    additionalClaims: {
      email: true,
      name: true
    }
  },
  IdentityProviderName: "CustomIdentityProvider",
  IdentityProviderType: "OIDC",
  Tags: [
    { Key: "UseCase", Value: "CustomAuthentication" }
  ]
});
```

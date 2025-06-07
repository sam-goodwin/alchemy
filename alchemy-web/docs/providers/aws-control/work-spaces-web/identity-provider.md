---
title: Managing AWS WorkSpacesWeb IdentityProviders with Alchemy
description: Learn how to create, update, and manage AWS WorkSpacesWeb IdentityProviders using Alchemy Cloud Control.
---

# IdentityProvider

The IdentityProvider resource allows you to manage [AWS WorkSpacesWeb IdentityProviders](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) for authentication and user management in AWS WorkSpacesWeb. This resource enables you to configure various identity provider types and their associated details.

## Minimal Example

Create a basic IdentityProvider with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const BasicIdentityProvider = await AWS.WorkSpacesWeb.IdentityProvider("BasicIdentityProvider", {
  IdentityProviderDetails: {
    Metadata: {
      AuthorizationEndpoint: "https://auth.example.com/oauth2/authorize",
      TokenEndpoint: "https://auth.example.com/oauth2/token",
      UserInfoEndpoint: "https://auth.example.com/oauth2/userinfo"
    },
    Oidc: {
      ClientId: "your-client-id",
      ClientSecret: "your-client-secret",
      Scope: "openid email profile"
    }
  },
  IdentityProviderName: "ExampleOIDCProvider",
  IdentityProviderType: "OIDC"
});
```

## Advanced Configuration

Configure an IdentityProvider with additional properties such as tags and a portal ARN:

```ts
const AdvancedIdentityProvider = await AWS.WorkSpacesWeb.IdentityProvider("AdvancedIdentityProvider", {
  IdentityProviderDetails: {
    Metadata: {
      AuthorizationEndpoint: "https://auth.example.com/oauth2/authorize",
      TokenEndpoint: "https://auth.example.com/oauth2/token",
      UserInfoEndpoint: "https://auth.example.com/oauth2/userinfo"
    },
    Oidc: {
      ClientId: "your-client-id",
      ClientSecret: "your-client-secret",
      Scope: "openid email profile"
    }
  },
  PortalArn: "arn:aws:workspacesweb:us-west-2:123456789012:portal/your-portal-id",
  IdentityProviderName: "AdvancedOIDCProvider",
  IdentityProviderType: "OIDC",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adding a SAML Identity Provider

Create a SAML IdentityProvider configuration, demonstrating a different identity provider type:

```ts
const SamlIdentityProvider = await AWS.WorkSpacesWeb.IdentityProvider("SamlIdentityProvider", {
  IdentityProviderDetails: {
    Metadata: {
      AuthorizationEndpoint: "https://saml.example.com/authorize",
      TokenEndpoint: "https://saml.example.com/token",
      UserInfoEndpoint: "https://saml.example.com/userinfo"
    },
    Saml: {
      MetadataDocument: "<SAML Metadata Document Here>"
    }
  },
  IdentityProviderName: "ExampleSAMLProvider",
  IdentityProviderType: "SAML"
});
```

This example shows how to configure a SAML IdentityProvider, highlighting the flexibility of the AWS WorkSpacesWeb IdentityProvider resource.
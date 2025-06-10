---
title: IdentityProviderConfig
description: Learn how to create, update, and manage AWS EKS IdentityProviderConfigs using Alchemy Cloud Control.
---


The IdentityProviderConfig resource lets you manage [AWS EKS IdentityProviderConfigs](https://docs.aws.amazon.com/eks/latest/userguide/) for integrating identity providers with your Amazon EKS cluster.

## Minimal Example

Create a basic IdentityProviderConfig with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const identityProviderConfig = await AWS.EKS.IdentityProviderConfig("myIdentityProviderConfig", {
  Type: "oidc", // The type of identity provider
  ClusterName: "myEKSCluster", // The name of the EKS cluster
  Oidc: {
    IssuerUrl: "https://oidc.example.com", // OIDC issuer URL
    ClientId: "myClientId",
    UsernameClaim: "sub",
    GroupsClaim: "groups",
    RequiredClaims: {
      "claim1": "value1",
      "claim2": "value2"
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure an IdentityProviderConfig with additional options and tags for better management.

```ts
const advancedIdentityProviderConfig = await AWS.EKS.IdentityProviderConfig("advancedIdentityProviderConfig", {
  Type: "oidc",
  ClusterName: "myAdvancedEKSCluster",
  Oidc: {
    IssuerUrl: "https://advanced-oidc.example.com",
    ClientId: "myAdvancedClientId",
    UsernameClaim: "email",
    GroupsClaim: "roles",
    RequiredClaims: {
      "role": "admin"
    }
  },
  Tags: [
    {
      Key: "Project",
      Value: "MyProject"
    },
    {
      Key: "Owner",
      Value: "TeamA"
    }
  ],
  IdentityProviderConfigName: "AdvancedOIDCConfig" // Optional name for the identity provider config
});
```

## Using an Existing Identity Provider

Adopt an existing identity provider configuration if it already exists in the specified cluster.

```ts
const existingIdentityProviderConfig = await AWS.EKS.IdentityProviderConfig("existingIdentityProviderConfig", {
  Type: "oidc",
  ClusterName: "myEKSCluster",
  Oidc: {
    IssuerUrl: "https://existing-oidc.example.com",
    ClientId: "existingClientId",
    UsernameClaim: "sub",
    GroupsClaim: "groups"
  },
  adopt: true // Adopt existing resource
});
```

## Configuring Multiple Identity Providers

Set up multiple identity provider configurations for an EKS cluster by creating different instances.

```ts
const oidcIdentityProviderConfig = await AWS.EKS.IdentityProviderConfig("oidcIdentityProviderConfig", {
  Type: "oidc",
  ClusterName: "myCluster",
  Oidc: {
    IssuerUrl: "https://oidc-provider.com",
    ClientId: "oidcClientId"
  }
});

const samlIdentityProviderConfig = await AWS.EKS.IdentityProviderConfig("samlIdentityProviderConfig", {
  Type: "saml",
  ClusterName: "myCluster",
  Tags: [
    {
      Key: "Type",
      Value: "SAML"
    }
  ]
});
```

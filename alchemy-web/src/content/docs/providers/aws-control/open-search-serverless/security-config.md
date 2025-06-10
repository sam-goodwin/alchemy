---
title: SecurityConfig
description: Learn how to create, update, and manage AWS OpenSearchServerless SecurityConfigs using Alchemy Cloud Control.
---


The SecurityConfig resource lets you manage [AWS OpenSearchServerless SecurityConfigs](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) for securing your OpenSearchServerless applications.

## Minimal Example

Create a basic SecurityConfig with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicSecurityConfig = await AWS.OpenSearchServerless.SecurityConfig("basicSecurityConfig", {
  Type: "default",
  Description: "Basic security configuration for OpenSearchServerless",
  Name: "BasicSecurityConfig"
});
```

## Advanced Configuration

Configure a SecurityConfig with SAML options for enhanced security.

```ts
const advancedSecurityConfig = await AWS.OpenSearchServerless.SecurityConfig("advancedSecurityConfig", {
  Type: "SAML",
  Description: "Advanced security configuration with SAML options",
  Name: "AdvancedSecurityConfig",
  SamlOptions: {
    Idp: "https://idp.example.com",
    Audience: "https://opensearch.example.com",
    Certificate: "-----BEGIN CERTIFICATE-----\nMIID...==\n-----END CERTIFICATE-----"
  }
});
```

## IAM Identity Center Options

This example demonstrates how to configure IAM Identity Center options in a SecurityConfig.

```ts
const iamIdentityCenterConfig = await AWS.OpenSearchServerless.SecurityConfig("iamIdentityCenterConfig", {
  Type: "IAM",
  Description: "Security configuration with IAM Identity Center",
  Name: "IAMIdentityCenterConfig",
  IamIdentityCenterOptions: {
    IdentityStoreId: "identity-store-id",
    UserPoolId: "user-pool-id",
    ClientId: "client-id"
  }
});
```

## Adoption of Existing Resources

This example illustrates how to adopt an existing SecurityConfig instead of failing if it already exists.

```ts
const adoptExistingSecurityConfig = await AWS.OpenSearchServerless.SecurityConfig("adoptExistingSecurityConfig", {
  Type: "default",
  Description: "Adopting existing security configuration",
  Name: "AdoptedSecurityConfig",
  adopt: true
});
```

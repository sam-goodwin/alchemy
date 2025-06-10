---
title: SAMLProvider
description: Learn how to create, update, and manage AWS IAM SAMLProviders using Alchemy Cloud Control.
---


The SAMLProvider resource allows you to manage [AWS IAM SAMLProviders](https://docs.aws.amazon.com/iam/latest/userguide/) for enabling single sign-on (SSO) authentication in AWS environments.

## Minimal Example

Create a basic SAMLProvider with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const samlProvider = await AWS.IAM.SAMLProvider("mySAMLProvider", {
  SamlMetadataDocument: "<SAML_METADATA_DOCUMENT>",
  AssertionEncryptionMode: "ENCRYPTED"
});
```

## Advanced Configuration

Configure a SAMLProvider with multiple private keys and tags for better management:

```ts
const advancedSamlProvider = await AWS.IAM.SAMLProvider("advancedSAMLProvider", {
  SamlMetadataDocument: "<SAML_METADATA_DOCUMENT>",
  PrivateKeyList: [
    { Key: "<PRIVATE_KEY_1>" },
    { Key: "<PRIVATE_KEY_2>" }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Engineering" }
  ]
});
```

## Adding and Removing Private Keys

Demonstrate how to update a SAMLProvider by adding and removing private keys:

```ts
const updateSamlProvider = await AWS.IAM.SAMLProvider("updateSAMLProvider", {
  SamlMetadataDocument: "<SAML_METADATA_DOCUMENT>",
  AddPrivateKey: "<NEW_PRIVATE_KEY>",
  RemovePrivateKey: "<EXISTING_PRIVATE_KEY>"
});
```

## Resource Adoption

Show how to adopt an existing SAMLProvider without failing if it already exists:

```ts
const adoptSamlProvider = await AWS.IAM.SAMLProvider("adoptSAMLProvider", {
  SamlMetadataDocument: "<SAML_METADATA_DOCUMENT>",
  adopt: true
});
```

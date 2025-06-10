---
title: DirectoryConfig
description: Learn how to create, update, and manage AWS AppStream DirectoryConfigs using Alchemy Cloud Control.
---


The DirectoryConfig resource lets you manage [AWS AppStream DirectoryConfigs](https://docs.aws.amazon.com/appstream/latest/userguide/) for integrating your directory service with AppStream 2.0.

## Minimal Example

Create a basic DirectoryConfig with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const directoryConfig = await AWS.AppStream.DirectoryConfig("myDirectoryConfig", {
  DirectoryName: "MyActiveDirectory",
  OrganizationalUnitDistinguishedNames: [
    "OU=Users,DC=example,DC=com"
  ],
  ServiceAccountCredentials: {
    AccountName: "service-account",
    AccountPassword: alchemy.secret(process.env.SERVICE_ACCOUNT_PASSWORD!)
  }
});
```

## Advanced Configuration

Configure a DirectoryConfig with certificate-based authentication properties.

```ts
const advancedDirectoryConfig = await AWS.AppStream.DirectoryConfig("advancedDirectoryConfig", {
  DirectoryName: "MyActiveDirectory",
  OrganizationalUnitDistinguishedNames: [
    "OU=Users,DC=example,DC=com"
  ],
  ServiceAccountCredentials: {
    AccountName: "service-account",
    AccountPassword: alchemy.secret(process.env.SERVICE_ACCOUNT_PASSWORD!)
  },
  CertificateBasedAuthProperties: {
    Certificate: alchemy.secret(process.env.CERTIFICATE!),
    Validity: 365
  }
});
```

## Adoption of Existing Resource

Adopt an existing DirectoryConfig without failing if it already exists.

```ts
const adoptExistingDirectoryConfig = await AWS.AppStream.DirectoryConfig("existingDirectoryConfig", {
  DirectoryName: "MyExistingActiveDirectory",
  OrganizationalUnitDistinguishedNames: [
    "OU=Users,DC=example,DC=com"
  ],
  ServiceAccountCredentials: {
    AccountName: "service-account",
    AccountPassword: alchemy.secret(process.env.SERVICE_ACCOUNT_PASSWORD!)
  },
  adopt: true
});
```

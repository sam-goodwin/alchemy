---
title: Managing AWS DMS Certificates with Alchemy
description: Learn how to create, update, and manage AWS DMS Certificates using Alchemy Cloud Control.
---

# Certificate

The Certificate resource allows you to manage [AWS DMS Certificates](https://docs.aws.amazon.com/dms/latest/userguide/) for secure database migration. This resource is essential for ensuring that data transfers between databases are encrypted using SSL.

## Minimal Example

Create a basic AWS DMS Certificate with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const DmsCertificate = await AWS.DMS.Certificate("MyDmsCertificate", {
  CertificateIdentifier: "dms-cert-01",
  CertificatePem: "-----BEGIN CERTIFICATE-----\nMIID....\n-----END CERTIFICATE-----"
});
```

## Advanced Configuration

Configure an AWS DMS Certificate with additional options, such as providing a certificate wallet:

```ts
const AdvancedDmsCertificate = await AWS.DMS.Certificate("AdvancedDmsCertificate", {
  CertificateIdentifier: "dms-cert-advanced",
  CertificatePem: "-----BEGIN CERTIFICATE-----\nMIID....\n-----END CERTIFICATE-----",
  CertificateWallet: "wallet.zip"
});
```

## Using Existing Certificate

Adopt an existing AWS DMS Certificate without failing if it already exists:

```ts
const ExistingDmsCertificate = await AWS.DMS.Certificate("ExistingDmsCertificate", {
  CertificateIdentifier: "existing-cert-id",
  adopt: true
});
```

## Handling Certificate Wallets

Create a certificate using a certificate wallet:

```ts
const WalletDmsCertificate = await AWS.DMS.Certificate("WalletDmsCertificate", {
  CertificateIdentifier: "dms-cert-wallet",
  CertificateWallet: "path/to/certificate-wallet.zip"
});
```

These examples illustrate the versatility of the AWS DMS Certificate resource, allowing you to configure certificates for secure database migrations effectively.
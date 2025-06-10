---
title: Certificate
description: Learn how to create, update, and manage AWS DMS Certificates using Alchemy Cloud Control.
---


The Certificate resource lets you manage [AWS DMS Certificates](https://docs.aws.amazon.com/dms/latest/userguide/) used for SSL/TLS encryption in AWS Database Migration Service (DMS).

## Minimal Example

Create a basic DMS Certificate with essential properties.

```ts
import AWS from "alchemy/aws/control";

const dmsCertificate = await AWS.DMS.Certificate("myDmsCertificate", {
  CertificateIdentifier: "my-dms-cert",
  CertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...YourCertData...\n-----END CERTIFICATE-----",
  adopt: false
});
```

## Advanced Configuration

Configure a DMS Certificate with a wallet for enhanced security.

```ts
const secureDmsCertificate = await AWS.DMS.Certificate("secureDmsCertificate", {
  CertificateIdentifier: "secure-dms-cert",
  CertificateWallet: "s3://my-bucket/wallets/my-wallet.zip",
  adopt: false
});
```

## Using Existing Certificates

Adopt an existing DMS Certificate instead of creating a new one.

```ts
const existingDmsCertificate = await AWS.DMS.Certificate("adoptExistingCertificate", {
  CertificateIdentifier: "existing-cert-id",
  adopt: true
});
```

## Retrieving Certificate Details

Create a DMS Certificate and retrieve its ARN and creation time.

```ts
const detailedDmsCertificate = await AWS.DMS.Certificate("detailedDmsCertificate", {
  CertificateIdentifier: "detailed-cert",
  CertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...YourCertData...\n-----END CERTIFICATE-----",
  adopt: false
});

// Accessing properties after creation
console.log(`ARN: ${detailedDmsCertificate.Arn}`);
console.log(`Created At: ${detailedDmsCertificate.CreationTime}`);
```

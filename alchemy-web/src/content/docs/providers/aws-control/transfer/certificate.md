---
title: Certificate
description: Learn how to create, update, and manage AWS Transfer Certificates using Alchemy Cloud Control.
---


The Certificate resource allows you to manage [AWS Transfer Certificates](https://docs.aws.amazon.com/transfer/latest/userguide/) for secure data transfer. This resource supports the creation and management of SSL/TLS certificates for AWS Transfer Family.

## Minimal Example

Create a basic AWS Transfer Certificate with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const transferCertificate = await AWS.Transfer.Certificate("myTransferCertificate", {
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...AB\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvA...IDAQAB\n-----END PRIVATE KEY-----",
  Usage: "ENCRYPTION", // Common usage type
});
```

## Advanced Configuration

Configure an AWS Transfer Certificate with additional properties such as description and tags.

```ts
const advancedTransferCertificate = await AWS.Transfer.Certificate("advancedTransferCertificate", {
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...AB\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvA...IDAQAB\n-----END PRIVATE KEY-----",
  Usage: "ENCRYPTION",
  Description: "This is a certificate for secure data transfer.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Data Transfer" }
  ],
});
```

## Inactive Certificate

Create an AWS Transfer Certificate that specifies an inactive date.

```ts
const inactiveTransferCertificate = await AWS.Transfer.Certificate("inactiveTransferCertificate", {
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...AB\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvA...IDAQAB\n-----END PRIVATE KEY-----",
  Usage: "ENCRYPTION",
  InactiveDate: "2023-12-31T23:59:59Z", // Example inactive date
});
```

## Certificate Chain

Create an AWS Transfer Certificate with a certificate chain for enhanced security.

```ts
const certificateChainTransferCertificate = await AWS.Transfer.Certificate("certificateChainTransferCertificate", {
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...AB\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvA...IDAQAB\n-----END PRIVATE KEY-----",
  Usage: "ENCRYPTION",
  CertificateChain: "-----BEGIN CERTIFICATE-----\nMIID...AB\n-----END CERTIFICATE-----", // Example certificate chain
});
```

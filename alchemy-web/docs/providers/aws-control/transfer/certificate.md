---
title: Managing AWS Transfer Certificates with Alchemy
description: Learn how to create, update, and manage AWS Transfer Certificates using Alchemy Cloud Control.
---

# Certificate

The Certificate resource allows you to create and manage [AWS Transfer Certificates](https://docs.aws.amazon.com/transfer/latest/userguide/) for secure data transmission. This resource is essential for ensuring secure communications in AWS Transfer Family services.

## Minimal Example

Create a basic transfer certificate with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const TransferCertificate = await AWS.Transfer.Certificate("MyTransferCertificate", {
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...YourCertificate...\n-----END CERTIFICATE-----",
  Usage: "ENCRYPTION",
  ActiveDate: new Date().toISOString(),
  Description: "My transfer certificate for secure file transfers",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a transfer certificate with additional optional properties for enhanced management.

```ts
const AdvancedTransferCertificate = await AWS.Transfer.Certificate("AdvancedTransferCertificate", {
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...YourCertificate...\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\nMIIE...YourPrivateKey...\n-----END PRIVATE KEY-----",
  Usage: "ENCRYPTION",
  ActiveDate: new Date().toISOString(),
  InactiveDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // Valid for 1 year
  Description: "Advanced transfer certificate with private key",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Certificate Chain Example

Demonstrate how to create a transfer certificate with a certificate chain.

```ts
const CertificateChainExample = await AWS.Transfer.Certificate("CertificateChainExample", {
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...YourCertificate...\n-----END CERTIFICATE-----",
  CertificateChain: "-----BEGIN CERTIFICATE-----\nMIID...YourIntermediateCertificate...\n-----END CERTIFICATE-----",
  Usage: "ENCRYPTION",
  ActiveDate: new Date().toISOString(),
  Description: "Transfer certificate with certificate chain for validation",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Compliance", Value: "PCI-DSS" }
  ]
});
```
---
title: Managing AWS IoT Certificates with Alchemy
description: Learn how to create, update, and manage AWS IoT Certificates using Alchemy Cloud Control.
---

# Certificate

The Certificate resource allows you to manage [AWS IoT Certificates](https://docs.aws.amazon.com/iot/latest/userguide/) for securing communications between devices and the AWS IoT Core. 

## Minimal Example

Create a basic IoT certificate with required and common optional properties.

```ts
import AWS from "alchemy/aws/control";

const BasicCertificate = await AWS.IoT.Certificate("BasicCertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...YourCACert...\n-----END CERTIFICATE-----",
  CertificateMode: "SNI_ONLY"
});
```

## Advanced Configuration

Configure an IoT certificate with additional properties for enhanced feature usage.

```ts
const AdvancedCertificate = await AWS.IoT.Certificate("AdvancedCertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...YourCACert...\n-----END CERTIFICATE-----",
  CertificateMode: "SNI_ONLY",
  CertificateSigningRequest: "-----BEGIN CERTIFICATE REQUEST-----\nMIIC...YourCSR...\n-----END CERTIFICATE REQUEST-----",
  CertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...YourCert...\n-----END CERTIFICATE-----"
});
```

## Adoption of Existing Resource

Adopt an existing IoT certificate instead of failing when a resource already exists.

```ts
const ExistingCertificate = await AWS.IoT.Certificate("ExistingCertificate", {
  Status: "ACTIVE",
  adopt: true
});
```
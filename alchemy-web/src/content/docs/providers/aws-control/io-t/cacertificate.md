---
title: CACertificate
description: Learn how to create, update, and manage AWS IoT CACertificates using Alchemy Cloud Control.
---


The CACertificate resource allows you to manage [AWS IoT CACertificates](https://docs.aws.amazon.com/iot/latest/userguide/), which are used to authenticate devices connecting to AWS IoT.

## Minimal Example

Create a basic CACertificate with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const caCertificate = await AWS.IoT.CACertificate("myCACertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...YourCert...IDAQAB\n-----END CERTIFICATE-----",
  CertificateMode: "DEFAULT" // Optional: can also be "SNI_ONLY"
});
```

## Advanced Configuration

Configure a CACertificate with additional options like auto registration status and tags.

```ts
const advancedCACertificate = await AWS.IoT.CACertificate("advancedCACertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...YourCert...IDAQAB\n-----END CERTIFICATE-----",
  CertificateMode: "DEFAULT",
  AutoRegistrationStatus: "ENABLE", // Optional: can also be "DISABLE"
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "IoTDevice" }
  ]
});
```

## Removing Auto Registration

Create a CACertificate and specify that auto registration should be removed.

```ts
const noAutoRegistrationCACertificate = await AWS.IoT.CACertificate("noAutoRegCACertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...YourCert...IDAQAB\n-----END CERTIFICATE-----",
  RemoveAutoRegistration: true // Optional: set to true to prevent auto registration
});
```

## Verification Certificate

Create a CACertificate that includes a verification certificate.

```ts
const verificationCACertificate = await AWS.IoT.CACertificate("verificationCACertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...YourCert...IDAQAB\n-----END CERTIFICATE-----",
  VerificationCertificatePem: "-----BEGIN CERTIFICATE-----\nMIID...YourVerificationCert...IDAQAB\n-----END CERTIFICATE-----"
});
```

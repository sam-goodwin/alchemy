---
title: Certificate
description: Learn how to create, update, and manage AWS IoT Certificates using Alchemy Cloud Control.
---


The Certificate resource allows you to manage [AWS IoT Certificates](https://docs.aws.amazon.com/iot/latest/userguide/) used for secure communication with AWS IoT services.

## Minimal Example

Create a basic IoT certificate with the required status property and an optional CA certificate PEM.

```ts
import AWS from "alchemy/aws/control";

const iotCertificate = await AWS.IoT.Certificate("iotCertificate", {
  Status: "ACTIVE",
  CACertificatePem: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
});
```

## Advanced Configuration

Configure an IoT certificate with a certificate signing request and a specific certificate mode.

```ts
const advancedCertificate = await AWS.IoT.Certificate("advancedCertificate", {
  Status: "ACTIVE",
  CertificateSigningRequest: "-----BEGIN CERTIFICATE REQUEST-----\n...\n-----END CERTIFICATE REQUEST-----",
  CertificateMode: "SNI_ONLY"
});
```

## Adopt Existing Certificate

If you want to adopt an existing certificate instead of failing when it already exists, you can set the adopt property to true.

```ts
const existingCertificate = await AWS.IoT.Certificate("existingCertificate", {
  Status: "ACTIVE",
  adopt: true
});
```

## Update Certificate Status

You can also update an existing certificate’s status by referencing its ARN.

```ts
const updateCertificate = await AWS.IoT.Certificate("updateCertificate", {
  Status: "INACTIVE",
  Arn: "arn:aws:iot:us-west-2:123456789012:cert/abcd1234-efgh-5678-ijkl-mnopqrstuv"
});
```

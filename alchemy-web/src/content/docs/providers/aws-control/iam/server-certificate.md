---
title: ServerCertificate
description: Learn how to create, update, and manage AWS IAM ServerCertificates using Alchemy Cloud Control.
---


The ServerCertificate resource lets you manage [AWS IAM ServerCertificates](https://docs.aws.amazon.com/iam/latest/userguide/) for securely managing SSL/TLS certificates for your AWS resources.

## Minimal Example

Create a basic server certificate with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const serverCertificate = await AWS.IAM.ServerCertificate("myServerCertificate", {
  ServerCertificateName: "my-website-cert",
  CertificateBody: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
});
```

## Advanced Configuration

Configure a server certificate with an optional certificate chain and tagging.

```ts
const advancedServerCertificate = await AWS.IAM.ServerCertificate("advancedServerCertificate", {
  ServerCertificateName: "my-advanced-website-cert",
  CertificateBody: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
  CertificateChain: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ]
});
```

## Importing an Existing Certificate

If you have an existing server certificate, you can adopt it using the `adopt` property.

```ts
const existingServerCertificate = await AWS.IAM.ServerCertificate("existingServerCertificate", {
  ServerCertificateName: "existing-cert-name",
  adopt: true // This will adopt the existing resource instead of failing
});
```

## Updating an Existing Certificate

You can update an existing server certificate with new properties like the certificate body or tags.

```ts
const updatedServerCertificate = await AWS.IAM.ServerCertificate("updateServerCertificate", {
  ServerCertificateName: "my-website-cert",
  CertificateBody: "-----BEGIN NEW CERTIFICATE-----\n...\n-----END NEW CERTIFICATE-----",
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```

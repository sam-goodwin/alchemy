---
title: Certificate
description: Learn how to create, update, and manage AWS ACMPCA Certificates using Alchemy Cloud Control.
---


The Certificate resource allows you to create and manage [AWS ACMPCA Certificates](https://docs.aws.amazon.com/acmpca/latest/userguide/) for issuing and managing your public and private certificates.

## Minimal Example

Create a basic ACMPCA Certificate using required properties with one optional property.

```ts
import AWS from "alchemy/aws/control";

const certificate = await AWS.ACMPCA.Certificate("myCertificate", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/abcd1234-5678-90ab-cdef-EXAMPLE11111",
  Validity: {
    Type: "DAYS",
    Value: 365
  },
  CertificateSigningRequest: "-----BEGIN CERTIFICATE REQUEST-----\n...\n-----END CERTIFICATE REQUEST-----",
  SigningAlgorithm: "SHA256WITHRSA",
  TemplateArn: "arn:aws:acm-pca:us-east-1:123456789012:template/MyTemplate"
});
```

## Advanced Configuration

Configure an ACMPCA Certificate with additional parameters for enhanced security and validity settings.

```ts
const advancedCertificate = await AWS.ACMPCA.Certificate("advancedCertificate", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/abcd1234-5678-90ab-cdef-EXAMPLE22222",
  Validity: {
    Type: "YEARS",
    Value: 2
  },
  CertificateSigningRequest: "-----BEGIN CERTIFICATE REQUEST-----\n...\n-----END CERTIFICATE REQUEST-----",
  SigningAlgorithm: "SHA384WITHRSA",
  ValidityNotBefore: {
    Type: "DAYS",
    Value: 1
  }
});
```

## Using API Passthrough

Create a certificate with API passthrough for additional settings.

```ts
const certificateWithApiPassthrough = await AWS.ACMPCA.Certificate("certWithApiPassthrough", {
  CertificateAuthorityArn: "arn:aws:acm-pca:eu-west-1:123456789012:certificate-authority/abcd1234-5678-90ab-cdef-EXAMPLE33333",
  Validity: {
    Type: "DAYS",
    Value: 30
  },
  CertificateSigningRequest: "-----BEGIN CERTIFICATE REQUEST-----\n...\n-----END CERTIFICATE REQUEST-----",
  SigningAlgorithm: "SHA256WITHRSA",
  ApiPassthrough: {
    KeyUsage: {
      DigitalSignature: true,
      KeyEncipherment: true
    },
    ExtendedKeyUsage: ["TLSWebServerAuthentication", "TLSWebClientAuthentication"]
  }
});
```

## Adopting Existing Resources

Adopt an existing ACMPCA certificate instead of failing if it already exists.

```ts
const adoptExistingCertificate = await AWS.ACMPCA.Certificate("existingCert", {
  CertificateAuthorityArn: "arn:aws:acm-pca:ap-south-1:123456789012:certificate-authority/abcd1234-5678-90ab-cdef-EXAMPLE44444",
  Validity: {
    Type: "DAYS",
    Value: 90
  },
  CertificateSigningRequest: "-----BEGIN CERTIFICATE REQUEST-----\n...\n-----END CERTIFICATE REQUEST-----",
  SigningAlgorithm: "SHA256WITHRSA",
  adopt: true
});
```

---
title: CertificateAuthority
description: Learn how to create, update, and manage AWS ACMPCA CertificateAuthoritys using Alchemy Cloud Control.
---


The CertificateAuthority resource lets you create and manage [AWS ACMPCA CertificateAuthoritys](https://docs.aws.amazon.com/acmpca/latest/userguide/) for issuing and managing digital certificates.

## Minimal Example

Create a basic certificate authority with required properties and a common optional property for revocation configuration.

```ts
import AWS from "alchemy/aws/control";

const basicCertificateAuthority = await AWS.ACMPCA.CertificateAuthority("basicCA", {
  Type: "SUBORDINATE",
  SigningAlgorithm: "SHA256WITHRSA",
  KeyAlgorithm: "RSA_2048",
  Subject: {
    Country: "US",
    Organization: "My Organization",
    OrganizationalUnit: "IT",
    CommonName: "myca.example.com"
  },
  RevocationConfiguration: {
    CrlConfiguration: {
      Enabled: true,
      ExpirationInDays: 7,
      S3BucketName: "my-certificate-revocation-list",
      CustomCname: "crl.myca.example.com"
    }
  },
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Configure a certificate authority with additional options such as CSR extensions and key storage security standards.

```ts
const advancedCertificateAuthority = await AWS.ACMPCA.CertificateAuthority("advancedCA", {
  Type: "ROOT",
  SigningAlgorithm: "SHA256WITHRSA",
  KeyAlgorithm: "RSA_4096",
  Subject: {
    Country: "US",
    Organization: "Advanced Organization",
    OrganizationalUnit: "Security",
    CommonName: "advancedca.example.com"
  },
  CsrExtensions: {
    KeyUsage: ["DIGITAL_SIGNATURE", "KEY_ENCIPHERMENT"],
    ExtendedKeyUsage: ["SERVER_AUTH", "CLIENT_AUTH"]
  },
  KeyStorageSecurityStandard: "FIPS_140_2_LEVEL_3",
  Tags: [{ Key: "Project", Value: "SecureApp" }]
});
```

## Adoption of Existing Certificate Authority

If you need to adopt an existing certificate authority instead of creating a new one, use the `adopt` property.

```ts
const existingCertificateAuthority = await AWS.ACMPCA.CertificateAuthority("existingCA", {
  Type: "SUBORDINATE",
  SigningAlgorithm: "SHA256WITHRSA",
  KeyAlgorithm: "RSA_2048",
  Subject: {
    Country: "US",
    Organization: "Existing Organization",
    OrganizationalUnit: "Compliance",
    CommonName: "existingca.example.com"
  },
  adopt: true // Adopt existing resource
});
```

## Example with Usage Mode

Create a certificate authority with a specific usage mode, which defines how the certificates can be used.

```ts
const usageModeCertificateAuthority = await AWS.ACMPCA.CertificateAuthority("usageModeCA", {
  Type: "ROOT",
  SigningAlgorithm: "SHA256WITHRSA",
  KeyAlgorithm: "RSA_2048",
  Subject: {
    Country: "US",
    Organization: "Usage Mode Org",
    OrganizationalUnit: "Development",
    CommonName: "usagemodeca.example.com"
  },
  UsageMode: "DEFAULT", // Specify usage mode
  Tags: [{ Key: "Department", Value: "R&D" }]
});
```

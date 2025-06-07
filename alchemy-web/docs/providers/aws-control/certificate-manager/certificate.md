---
title: Managing AWS CertificateManager Certificates with Alchemy
description: Learn how to create, update, and manage AWS CertificateManager Certificates using Alchemy Cloud Control.
---

# Certificate

The Certificate resource allows you to manage [AWS CertificateManager Certificates](https://docs.aws.amazon.com/certificatemanager/latest/userguide/) for provisioning SSL/TLS certificates. 

## Minimal Example

Create a basic SSL certificate with the required domain name and a tag.

```ts
import AWS from "alchemy/aws/control";

const BasicCertificate = await AWS.CertificateManager.Certificate("BasicCertificate", {
  DomainName: "example.com",
  Tags: [
    { Key: "Environment", Value: "production" }
  ],
  ValidationMethod: "DNS"
});
```

## Advanced Configuration

Configure a certificate with domain validation options and subject alternative names.

```ts
const AdvancedCertificate = await AWS.CertificateManager.Certificate("AdvancedCertificate", {
  DomainName: "example.com",
  SubjectAlternativeNames: ["www.example.com", "api.example.com"],
  DomainValidationOptions: [
    {
      DomainName: "example.com",
      ValidationDomain: "example.com"
    }
  ],
  ValidationMethod: "DNS",
  CertificateTransparencyLoggingPreference: "ENABLED"
});
```

## Enhanced Security Settings

Create a certificate with a specific key algorithm for enhanced security.

```ts
const SecureCertificate = await AWS.CertificateManager.Certificate("SecureCertificate", {
  DomainName: "secure.example.com",
  KeyAlgorithm: "RSA_2048",
  Tags: [
    { Key: "Team", Value: "Security" }
  ],
  ValidationMethod: "EMAIL"
});
```

## Adoption of Existing Certificates

If you need to adopt an existing certificate instead of creating a new one.

```ts
const AdoptedCertificate = await AWS.CertificateManager.Certificate("AdoptedCertificate", {
  DomainName: "existing.example.com",
  adopt: true
});
```
---
title: Certificate
description: Learn how to create, update, and manage AWS CertificateManager Certificates using Alchemy Cloud Control.
---


The Certificate resource allows you to manage [AWS CertificateManager Certificates](https://docs.aws.amazon.com/certificatemanager/latest/userguide/) for simplifying the process of obtaining, deploying, and managing SSL/TLS certificates.

## Minimal Example

Create a basic SSL certificate for a specified domain:

```ts
import AWS from "alchemy/aws/control";

const sslCertificate = await AWS.CertificateManager.Certificate("mySSLCertificate", {
  DomainName: "mywebsite.com",
  ValidationMethod: "DNS",
  SubjectAlternativeNames: ["www.mywebsite.com"], // Additional domains
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a certificate with additional options such as key algorithm and domain validation options:

```ts
const advancedCertificate = await AWS.CertificateManager.Certificate("advancedSSLCertificate", {
  DomainName: "secure.mywebsite.com",
  ValidationMethod: "EMAIL",
  KeyAlgorithm: "RSA-2048",
  DomainValidationOptions: [
    {
      DomainName: "secure.mywebsite.com",
      ValidationDomain: "mywebsite.com"
    }
  ],
  CertificateTransparencyLoggingPreference: "ENABLED",
  Tags: [
    {
      Key: "Project",
      Value: "WebsiteSecurity"
    }
  ]
});
```

## Custom Certificate Authority

Create a certificate using a custom certificate authority:

```ts
const customCaCertificate = await AWS.CertificateManager.Certificate("customCACertificate", {
  DomainName: "custom-ca.mywebsite.com",
  CertificateAuthorityArn: "arn:aws:acm:us-east-1:123456789012:certificate-authority/abcdefg-1234-5678-90ab-cdef12345678",
  ValidationMethod: "DNS",
  Tags: [
    {
      Key: "Type",
      Value: "CustomCA"
    }
  ]
});
```

## Logging Preferences

Create a certificate with specific logging preferences to enhance security auditing:

```ts
const loggingPreferenceCertificate = await AWS.CertificateManager.Certificate("loggingPreferenceCertificate", {
  DomainName: "logs.mywebsite.com",
  ValidationMethod: "DNS",
  CertificateTransparencyLoggingPreference: "DISABLED", // Disable logging for this certificate
  Tags: [
    {
      Key: "Compliance",
      Value: "GDPR"
    }
  ]
});
```

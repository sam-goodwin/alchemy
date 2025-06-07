---
title: Managing AWS Lightsail Certificates with Alchemy
description: Learn how to create, update, and manage AWS Lightsail Certificates using Alchemy Cloud Control.
---

# Certificate

The Certificate resource lets you manage [AWS Lightsail Certificates](https://docs.aws.amazon.com/lightsail/latest/userguide/) for securing your domains with SSL/TLS encryption.

## Minimal Example

Create a basic Lightsail certificate with required properties.

```ts
import AWS from "alchemy/aws/control";

const lightsailCertificate = await AWS.Lightsail.Certificate("MyCertificate", {
  DomainName: "mywebsite.com",
  CertificateName: "MyWebsiteCertificate",
  SubjectAlternativeNames: ["www.mywebsite.com"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a certificate with additional tags to help manage resources effectively.

```ts
const advancedCertificate = await AWS.Lightsail.Certificate("AdvancedCertificate", {
  DomainName: "secure.mywebsite.com",
  CertificateName: "SecureMyWebsiteCertificate",
  SubjectAlternativeNames: ["api.mywebsite.com", "blog.mywebsite.com"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Project", Value: "WebsiteSecurity" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Managing Multiple Domains

Create a certificate that supports multiple subdomains.

```ts
const multiDomainCertificate = await AWS.Lightsail.Certificate("MultiDomainCertificate", {
  DomainName: "example.com",
  CertificateName: "ExampleCertificate",
  SubjectAlternativeNames: [
    "www.example.com",
    "shop.example.com",
    "blog.example.com"
  ],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "WebTeam" }
  ]
});
```

## Updating an Existing Certificate

Example of updating an existing certificate to add new subject alternative names.

```ts
const updatedCertificate = await AWS.Lightsail.Certificate("UpdatedCertificate", {
  DomainName: "mywebsite.com",
  CertificateName: "MyWebsiteCertificate",
  SubjectAlternativeNames: ["www.mywebsite.com", "new.mywebsite.com"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```
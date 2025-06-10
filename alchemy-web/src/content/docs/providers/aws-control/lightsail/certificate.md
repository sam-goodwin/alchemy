---
title: Certificate
description: Learn how to create, update, and manage AWS Lightsail Certificates using Alchemy Cloud Control.
---


The Certificate resource allows you to create and manage [AWS Lightsail Certificates](https://docs.aws.amazon.com/lightsail/latest/userguide/) for your domains, enabling secure HTTPS connections.

## Minimal Example

Create a basic Lightsail Certificate with required properties and a common optional property for subject alternative names.

```ts
import AWS from "alchemy/aws/control";

const certificate = await AWS.Lightsail.Certificate("myCertificate", {
  DomainName: "mywebsite.com",
  SubjectAlternativeNames: ["www.mywebsite.com"],
  CertificateName: "MyWebsiteSSL"
});
```

## Advanced Configuration

Configure a Lightsail Certificate with additional tags for better resource management.

```ts
const advancedCertificate = await AWS.Lightsail.Certificate("advancedCertificate", {
  DomainName: "mysecuredomain.com",
  SubjectAlternativeNames: ["www.mysecuredomain.com", "api.mysecuredomain.com"],
  CertificateName: "MySecureDomainSSL",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Website" }
  ]
});
```

## Resource Adoption

This example demonstrates how to adopt an existing Lightsail Certificate instead of failing if the resource already exists.

```ts
const adoptCertificate = await AWS.Lightsail.Certificate("adoptedCertificate", {
  DomainName: "adopted-domain.com",
  CertificateName: "AdoptedDomainSSL",
  adopt: true // Enables adopting an existing resource
});
```

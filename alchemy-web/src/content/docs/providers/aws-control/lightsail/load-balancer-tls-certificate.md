---
title: LoadBalancerTlsCertificate
description: Learn how to create, update, and manage AWS Lightsail LoadBalancerTlsCertificates using Alchemy Cloud Control.
---


The LoadBalancerTlsCertificate resource allows you to manage TLS certificates for your AWS Lightsail load balancers, enabling secure communication over HTTPS. For more information, see the [AWS Lightsail LoadBalancerTlsCertificates documentation](https://docs.aws.amazon.com/lightsail/latest/userguide/).

## Minimal Example

Create a basic TLS certificate for a load balancer with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const tlsCertificate = await AWS.Lightsail.LoadBalancerTlsCertificate("myTlsCertificate", {
  LoadBalancerName: "my-load-balancer",
  CertificateDomainName: "example.com",
  CertificateName: "example-cert",
  IsAttached: true
});
```

## Advanced Configuration

Configure a TLS certificate with additional properties such as alternative names and HTTPS redirection.

```ts
const advancedTlsCertificate = await AWS.Lightsail.LoadBalancerTlsCertificate("advancedTlsCertificate", {
  LoadBalancerName: "my-load-balancer",
  CertificateDomainName: "example.com",
  CertificateAlternativeNames: ["www.example.com", "api.example.com"],
  HttpsRedirectionEnabled: true,
  CertificateName: "example-advanced-cert"
});
```

## Reuse Existing Certificate

Create a TLS certificate while adopting an existing resource if it already exists.

```ts
const adoptExistingTlsCertificate = await AWS.Lightsail.LoadBalancerTlsCertificate("adoptTlsCertificate", {
  LoadBalancerName: "my-load-balancer",
  CertificateDomainName: "existing-cert.example.com",
  CertificateName: "existing-cert",
  adopt: true
});
```

---
title: Managing AWS Lightsail LoadBalancerTlsCertificates with Alchemy
description: Learn how to create, update, and manage AWS Lightsail LoadBalancerTlsCertificates using Alchemy Cloud Control.
---

# LoadBalancerTlsCertificate

The LoadBalancerTlsCertificate resource allows you to create and manage TLS certificates for your AWS Lightsail load balancers. These certificates enable secure connections to your applications. For more information, visit the [AWS Lightsail LoadBalancerTlsCertificates documentation](https://docs.aws.amazon.com/lightsail/latest/userguide/).

## Minimal Example

Create a basic TLS certificate for a load balancer with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicTlsCertificate = await AWS.Lightsail.LoadBalancerTlsCertificate("BasicTlsCertificate", {
  LoadBalancerName: "MyLoadBalancer",
  CertificateDomainName: "example.com",
  CertificateName: "MyCertificate",
  IsAttached: true
});
```

## Advanced Configuration

Configure a TLS certificate with additional options such as alternative names and HTTPS redirection.

```ts
const advancedTlsCertificate = await AWS.Lightsail.LoadBalancerTlsCertificate("AdvancedTlsCertificate", {
  LoadBalancerName: "MyLoadBalancer",
  CertificateDomainName: "example.com",
  CertificateName: "MyAdvancedCertificate",
  CertificateAlternativeNames: ["www.example.com", "api.example.com"],
  HttpsRedirectionEnabled: true,
  IsAttached: true
});
```

## Adoption of Existing Certificate

Adopt an existing TLS certificate instead of creating a new one if it already exists.

```ts
const adoptedTlsCertificate = await AWS.Lightsail.LoadBalancerTlsCertificate("AdoptedTlsCertificate", {
  LoadBalancerName: "MyLoadBalancer",
  CertificateDomainName: "example.com",
  CertificateName: "MyAdoptedCertificate",
  IsAttached: true,
  adopt: true // Adopt existing resource
});
```

## Certificate Without HTTP Redirection

Create a TLS certificate without enabling HTTP redirection.

```ts
const noRedirectionTlsCertificate = await AWS.Lightsail.LoadBalancerTlsCertificate("NoRedirectionTlsCertificate", {
  LoadBalancerName: "MyLoadBalancer",
  CertificateDomainName: "example.com",
  CertificateName: "MyNoRedirectionCertificate",
  IsAttached: false,
  HttpsRedirectionEnabled: false
});
```
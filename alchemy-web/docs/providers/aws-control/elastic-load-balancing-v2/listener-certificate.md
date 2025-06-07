---
title: Managing AWS Application Load Balancer ListenerCertificates with Alchemy
description: Learn how to create, update, and manage AWS Application Load Balancer ListenerCertificates using Alchemy Cloud Control.
---

# ListenerCertificate

The ListenerCertificate resource allows you to manage SSL/TLS certificates for AWS Application Load Balancer listeners. This enables secure connections for your applications by allowing you to specify the certificates used for SSL termination. For more information, refer to the [AWS Application Load Balancer ListenerCertificates documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/).

## Minimal Example

Create a basic ListenerCertificate with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicListenerCertificate = await AWS.ElasticLoadBalancingV2.ListenerCertificate("basic-listener-cert", {
  Certificates: [
    {
      CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/example-cert-id"
    }
  ],
  ListenerArn: "arn:aws:elasticloadbalancing:us-east-1:123456789012:listener/app/example-load-balancer/50dc6c495c0c9188"
});
```

## Advanced Configuration

Add multiple certificates to a ListenerCertificate for enhanced security.

```ts
const AdvancedListenerCertificate = await AWS.ElasticLoadBalancingV2.ListenerCertificate("advanced-listener-cert", {
  Certificates: [
    {
      CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/example-cert-id-1"
    },
    {
      CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/example-cert-id-2"
    }
  ],
  ListenerArn: "arn:aws:elasticloadbalancing:us-east-1:123456789012:listener/app/example-load-balancer/50dc6c495c0c9188",
  adopt: true // Adopts existing resource instead of failing if it already exists
});
```

## Conditional Adoption Example

Use the adopt property to handle existing resources gracefully.

```ts
const ConditionalListenerCertificate = await AWS.ElasticLoadBalancingV2.ListenerCertificate("conditional-listener-cert", {
  Certificates: [
    {
      CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/example-cert-id-3"
    }
  ],
  ListenerArn: "arn:aws:elasticloadbalancing:us-east-1:123456789012:listener/app/example-load-balancer/50dc6c495c0c9188",
  adopt: true // Will not fail if resource already exists
});
```
---
title: ListenerCertificate
description: Learn how to create, update, and manage AWS Application Load Balancer ListenerCertificates using Alchemy Cloud Control.
---


The `ListenerCertificate` resource allows you to manage SSL/TLS certificates for your AWS Application Load Balancer listeners. This enables secure communication for your applications. For more information, refer to the [AWS Application Load Balancer ListenerCertificates](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/).

## Minimal Example

Create a basic listener certificate for an Application Load Balancer listener with required properties.

```ts
import AWS from "alchemy/aws/control";

const listenerCertificate = await AWS.ElasticLoadBalancingV2.ListenerCertificate("myListenerCertificate", {
  Certificates: [
    {
      CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-56ef-78gh-90ij-klmnopqrstuv"
    }
  ],
  ListenerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:listener/app/my-load-balancer/50dc6c495c0c9188/6c2e0f6a1c3c6f10"
});
```

## Advanced Configuration

Add multiple certificates to a listener for more robust SSL/TLS management.

```ts
const advancedListenerCertificate = await AWS.ElasticLoadBalancingV2.ListenerCertificate("advancedListenerCertificate", {
  Certificates: [
    {
      CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-56ef-78gh-90ij-klmnopqrstuv"
    },
    {
      CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/wxyz5678-90ab-cdef-ghij-klmnopqrstuv"
    }
  ],
  ListenerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:listener/app/my-load-balancer/50dc6c495c0c9188/6c2e0f6a1c3c6f10",
  adopt: true // Adopt existing resource if it already exists
});
```

## Updating Certificates

Update the listener certificate by replacing an existing certificate with a new one.

```ts
const updateListenerCertificate = await AWS.ElasticLoadBalancingV2.ListenerCertificate("updateListenerCertificate", {
  Certificates: [
    {
      CertificateArn: "arn:aws:acm:us-west-2:123456789012:certificate/newcert-5678-90ab-cdef-ghij-klmnopqrstuv"
    }
  ],
  ListenerArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:listener/app/my-load-balancer/50dc6c495c0c9188/6c2e0f6a1c3c6f10"
});
```

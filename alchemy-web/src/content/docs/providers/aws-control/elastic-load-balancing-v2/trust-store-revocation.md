---
title: TrustStoreRevocation
description: Learn how to create, update, and manage AWS Application Load Balancer TrustStoreRevocations using Alchemy Cloud Control.
---


The TrustStoreRevocation resource allows you to manage trust store revocations for AWS Application Load Balancers. This resource is essential for maintaining the security of your load balancers by revoking certificates as needed. For more information, see the [AWS Application Load Balancer TrustStoreRevocations documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic TrustStoreRevocation with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicRevocation = await AWS.ElasticLoadBalancingV2.TrustStoreRevocation("basicRevocation", {
  TrustStoreArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:truststore/myTrustStore",
  RevocationContents: [
    {
      CertificateId: "cert-id-12345",
      RevocationReason: "UNSPECIFIED"
    }
  ]
});
```

## Advanced Configuration

This example shows how to configure a TrustStoreRevocation with multiple revocation contents and the adopt property.

```ts
const advancedRevocation = await AWS.ElasticLoadBalancingV2.TrustStoreRevocation("advancedRevocation", {
  TrustStoreArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:truststore/myAdvancedTrustStore",
  RevocationContents: [
    {
      CertificateId: "cert-id-67890",
      RevocationReason: "KEY_COMPROMISE"
    },
    {
      CertificateId: "cert-id-54321",
      RevocationReason: "AFFILIATION_CHANGED"
    }
  ],
  adopt: true // Adopts the existing resource instead of failing
});
```

## Revoking Multiple Certificates

In this example, we demonstrate revoking multiple certificates at once, which is a common use case for maintaining security.

```ts
const batchRevocation = await AWS.ElasticLoadBalancingV2.TrustStoreRevocation("batchRevocation", {
  TrustStoreArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:truststore/myBatchTrustStore",
  RevocationContents: [
    {
      CertificateId: "cert-id-11111",
      RevocationReason: "AFFILIATION_CHANGED"
    },
    {
      CertificateId: "cert-id-22222",
      RevocationReason: "CERTIFICATE_HOLD"
    },
    {
      CertificateId: "cert-id-33333",
      RevocationReason: "COMPROMISE"
    }
  ]
});
```

## Updating TrustStoreRevocation

This example demonstrates how to update an existing TrustStoreRevocation by adding a new revocation entry.

```ts
const updateRevocation = await AWS.ElasticLoadBalancingV2.TrustStoreRevocation("updateRevocation", {
  TrustStoreArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:truststore/myUpdateTrustStore",
  RevocationContents: [
    {
      CertificateId: "cert-id-44444",
      RevocationReason: "UNSPECIFIED"
    }
  ]
});
```

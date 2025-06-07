---
title: Managing AWS ACMPCA CertificateAuthorityActivations with Alchemy
description: Learn how to create, update, and manage AWS ACMPCA CertificateAuthorityActivations using Alchemy Cloud Control.
---

# CertificateAuthorityActivation

The `CertificateAuthorityActivation` resource allows you to activate a private certificate authority (CA) in AWS Certificate Manager Private Certificate Authority (ACM PCA). This resource is essential for managing the lifecycle of private certificates, enabling secure communications within your organization. For more information, refer to the [AWS ACMPCA CertificateAuthorityActivations documentation](https://docs.aws.amazon.com/acmpca/latest/userguide/).

## Minimal Example

This example demonstrates how to create a minimal `CertificateAuthorityActivation` with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const MinimalCertificateAuthorityActivation = await AWS.ACMPCA.CertificateAuthorityActivation("MyCAActivation", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...==\n-----END CERTIFICATE-----",
  Status: "ACTIVE"
});
```

## Advanced Configuration

In this example, we configure a `CertificateAuthorityActivation` with additional properties, including the certificate chain.

```ts
const AdvancedCertificateAuthorityActivation = await AWS.ACMPCA.CertificateAuthorityActivation("AdvancedCAActivation", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...==\n-----END CERTIFICATE-----",
  CertificateChain: "-----BEGIN CERTIFICATE-----\nMIIE...==\n-----END CERTIFICATE-----",
  Status: "ACTIVE"
});
```

## Adoption of Existing Resource

This example shows how to activate an existing certificate authority by setting the `adopt` property to true.

```ts
const AdoptExistingCertificateAuthorityActivation = await AWS.ACMPCA.CertificateAuthorityActivation("ExistingCAActivation", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...==\n-----END CERTIFICATE-----",
  adopt: true
});
```
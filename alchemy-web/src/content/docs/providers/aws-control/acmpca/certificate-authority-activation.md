---
title: CertificateAuthorityActivation
description: Learn how to create, update, and manage AWS ACMPCA CertificateAuthorityActivations using Alchemy Cloud Control.
---


The CertificateAuthorityActivation resource allows you to manage the activation of a certificate authority in AWS Certificate Manager Private Certificate Authority (ACM PCA). For more information, refer to the [AWS ACMPCA CertificateAuthorityActivations documentation](https://docs.aws.amazon.com/acmpca/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic CertificateAuthorityActivation with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const certAuthorityActivation = await AWS.ACMPCA.CertificateAuthorityActivation("MyCertAuthorityActivation", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/abcd1234-abcd-1234-abcd-1234567890ab",
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...Q==\n-----END CERTIFICATE-----",
  Status: "ACTIVE"
});
```

## Advanced Configuration

This example shows how to activate a certificate authority with both a certificate chain and a specified status.

```ts
const advancedCertAuthorityActivation = await AWS.ACMPCA.CertificateAuthorityActivation("AdvancedCertAuthorityActivation", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/abcd1234-abcd-1234-abcd-1234567890ab",
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...Q==\n-----END CERTIFICATE-----",
  CertificateChain: "-----BEGIN CERTIFICATE-----\nMIID...Q==\n-----END CERTIFICATE-----",
  Status: "ACTIVE"
});
```

## Adoption of Existing Certificate Authority

If you want to adopt an existing resource instead of failing when the resource already exists, you can set the `adopt` property to true.

```ts
const adoptedCertAuthorityActivation = await AWS.ACMPCA.CertificateAuthorityActivation("AdoptedCertAuthorityActivation", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/abcd1234-abcd-1234-abcd-1234567890ab",
  Certificate: "-----BEGIN CERTIFICATE-----\nMIID...Q==\n-----END CERTIFICATE-----",
  adopt: true
});
```

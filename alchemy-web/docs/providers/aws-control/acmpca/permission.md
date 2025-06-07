---
title: Managing AWS ACMPCA Permissions with Alchemy
description: Learn how to create, update, and manage AWS ACMPCA Permissions using Alchemy Cloud Control.
---

# Permission

The Permission resource allows you to manage permissions for AWS Certificate Manager Private Certificate Authority (ACM PCA). This resource is vital for defining who can perform actions on a certificate authority. For more information, refer to the AWS documentation on [AWS ACMPCA Permissions](https://docs.aws.amazon.com/acmpca/latest/userguide/).

## Minimal Example

Create a basic permission for a certificate authority that allows a specific action.

```ts
import AWS from "alchemy/aws/control";

const BasicPermission = await AWS.ACMPCA.Permission("BasicPermission", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  Actions: [
    "acm-pca:IssueCertificate",
    "acm-pca:ListCertificateAuthorities"
  ],
  Principal: "arn:aws:iam::123456789012:role/MyRole"
});
```

## Advanced Configuration

Configure a permission that includes a source account in addition to the basic properties.

```ts
const AdvancedPermission = await AWS.ACMPCA.Permission("AdvancedPermission", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-west-2:123456789012:certificate-authority/wxyz1234-56ef-78gh-90ij-klmnopqrstuv",
  Actions: [
    "acm-pca:RevokeCertificate",
    "acm-pca:GetCertificate"
  ],
  SourceAccount: "123456789012",
  Principal: "arn:aws:iam::123456789012:role/MyOtherRole"
});
```

## Permission with Adoption

Create a permission that adopts an existing resource if it already exists.

```ts
const AdoptPermission = await AWS.ACMPCA.Permission("AdoptPermission", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/qwer1234-56ef-78gh-90ij-klmnopqrstuv",
  Actions: [
    "acm-pca:UpdateCertificateAuthority"
  ],
  Principal: "arn:aws:iam::123456789012:role/MyThirdRole",
  adopt: true
});
```
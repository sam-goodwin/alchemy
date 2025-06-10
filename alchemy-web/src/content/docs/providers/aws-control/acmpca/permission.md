---
title: Permission
description: Learn how to create, update, and manage AWS ACMPCA Permissions using Alchemy Cloud Control.
---


The Permission resource allows you to manage [AWS ACMPCA Permissions](https://docs.aws.amazon.com/acmpca/latest/userguide/) for certificate authorities, enabling you to specify actions that can be performed by specific principals.

## Minimal Example

Create a basic permission for a certificate authority allowing a specific action for a principal:

```ts
import AWS from "alchemy/aws/control";

const acmPermission = await AWS.ACMPCA.Permission("basicPermission", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/abcd1234-efgh-5678-ijkl-90mnopqrst",
  Actions: ["acm-pca:IssueCertificate"],
  Principal: "arn:aws:iam::123456789012:role/MyRole"
});
```

## Advanced Configuration

Specify additional permissions including the optional `SourceAccount` to restrict the actions to a specific AWS account:

```ts
const advancedPermission = await AWS.ACMPCA.Permission("advancedPermission", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/abcd1234-efgh-5678-ijkl-90mnopqrst",
  Actions: [
    "acm-pca:IssueCertificate",
    "acm-pca:GetCertificate"
  ],
  Principal: "arn:aws:iam::123456789012:role/MyRole",
  SourceAccount: "123456789012"
});
```

## Granting Multiple Actions

Demonstrate granting multiple actions to a principal for a certificate authority:

```ts
const multipleActionsPermission = await AWS.ACMPCA.Permission("multipleActionsPermission", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/abcd1234-efgh-5678-ijkl-90mnopqrst",
  Actions: [
    "acm-pca:IssueCertificate",
    "acm-pca:RevokeCertificate",
    "acm-pca:GetCertificate"
  ],
  Principal: "arn:aws:iam::123456789012:role/MyRole"
});
```

## Adopting Existing Permissions

Show how to adopt an existing permission instead of failing when the permission already exists:

```ts
const adoptExistingPermission = await AWS.ACMPCA.Permission("adoptExistingPermission", {
  CertificateAuthorityArn: "arn:aws:acm-pca:us-east-1:123456789012:certificate-authority/abcd1234-efgh-5678-ijkl-90mnopqrst",
  Actions: ["acm-pca:IssueCertificate"],
  Principal: "arn:aws:iam::123456789012:role/MyRole",
  adopt: true
});
```

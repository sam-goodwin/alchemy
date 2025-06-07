---
title: Managing AWS WorkSpacesWeb TrustStores with Alchemy
description: Learn how to create, update, and manage AWS WorkSpacesWeb TrustStores using Alchemy Cloud Control.
---

# TrustStore

The TrustStore resource lets you manage [AWS WorkSpacesWeb TrustStores](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) which are used to store trusted certificates for secure connections.

## Minimal Example

Create a basic TrustStore with required properties and a couple of common optional tags.

```ts
import AWS from "alchemy/aws/control";

const basicTrustStore = await AWS.WorkSpacesWeb.TrustStore("BasicTrustStore", {
  CertificateList: [
    "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv"
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Advanced Configuration

Configure a TrustStore with additional properties such as adoption of an existing resource.

```ts
const advancedTrustStore = await AWS.WorkSpacesWeb.TrustStore("AdvancedTrustStore", {
  CertificateList: [
    "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv"
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Owner", Value: "QA Team" }
  ],
  adopt: true
});
```

## Using Existing Certificates

Create a TrustStore that uses multiple existing certificates from AWS Certificate Manager (ACM).

```ts
const multiCertTrustStore = await AWS.WorkSpacesWeb.TrustStore("MultiCertTrustStore", {
  CertificateList: [
    "arn:aws:acm:us-west-2:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv",
    "arn:aws:acm:us-west-2:123456789012:certificate/wxyz9876-5432-10ab-cdef-ghijklmnopqr"
  ],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "Security Team" }
  ]
});
```
---
title: Managing AWS RolesAnywhere CRLs with Alchemy
description: Learn how to create, update, and manage AWS RolesAnywhere CRLs using Alchemy Cloud Control.
---

# CRL

The CRL resource allows you to manage [AWS RolesAnywhere Certificate Revocation Lists (CRLs)](https://docs.aws.amazon.com/rolesanywhere/latest/userguide/). CRLs are critical for managing the certificates used to establish trust in your AWS roles.

## Minimal Example

Create a simple CRL with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const MyCRL = await AWS.RolesAnywhere.CRL("MyCRL", {
  TrustAnchorArn: "arn:aws:rolesanywhere:us-west-2:123456789012:trust-anchor/MyTrustAnchor",
  CrlData: "-----BEGIN CERTIFICATE-----\n...Your CRL Data...\n-----END CERTIFICATE-----",
  Enabled: true,
  Name: "MyFirstCRL"
});
```

## Advanced Configuration

Configure a CRL with tags for better resource management.

```ts
const AdvancedCRL = await AWS.RolesAnywhere.CRL("AdvancedCRL", {
  TrustAnchorArn: "arn:aws:rolesanywhere:us-west-2:123456789012:trust-anchor/MyTrustAnchor",
  CrlData: "-----BEGIN CERTIFICATE-----\n...Your CRL Data...\n-----END CERTIFICATE-----",
  Enabled: true,
  Name: "AdvancedCRL",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Enabling and Disabling CRL

Demonstrate how to create a CRL and then disable it.

```ts
const MyDisabledCRL = await AWS.RolesAnywhere.CRL("MyDisabledCRL", {
  TrustAnchorArn: "arn:aws:rolesanywhere:us-west-2:123456789012:trust-anchor/MyTrustAnchor",
  CrlData: "-----BEGIN CERTIFICATE-----\n...Your CRL Data...\n-----END CERTIFICATE-----",
  Enabled: false,
  Name: "MyDisabledCRL"
});
```

## Updating an Existing CRL

Show how to update an existing CRL by enabling it and modifying its name.

```ts
const UpdateCRL = await AWS.RolesAnywhere.CRL("UpdateCRL", {
  TrustAnchorArn: "arn:aws:rolesanywhere:us-west-2:123456789012:trust-anchor/MyTrustAnchor",
  CrlData: "-----BEGIN CERTIFICATE-----\n...Your CRL Data...\n-----END CERTIFICATE-----",
  Enabled: true,
  Name: "UpdatedCRL"
});
```
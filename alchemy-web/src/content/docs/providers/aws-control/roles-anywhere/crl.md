---
title: CRL
description: Learn how to create, update, and manage AWS RolesAnywhere CRLs using Alchemy Cloud Control.
---


The CRL (Certificate Revocation List) resource allows you to manage [AWS RolesAnywhere CRLs](https://docs.aws.amazon.com/rolesanywhere/latest/userguide/) for validating certificate-based identities in AWS. This resource is essential for maintaining security by ensuring that revoked certificates are not used for authentication.

## Minimal Example

Create a basic CRL with the required properties along with some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicCrl = await AWS.RolesAnywhere.CRL("basicCrl", {
  name: "MyBasicCRL",
  crlData: "MIIC...yourCrlDataHere...",
  trustAnchorArn: "arn:aws:rolesanywhere:us-east-1:123456789012:trust-anchor/TA123456",
  enabled: true
});
```

This example demonstrates how to create a simple CRL with a name, CRL data, and associated trust anchor ARN, while enabling it for use.

## Advanced Configuration

Configure a CRL with additional settings like tags and adoption of existing resources.

```ts
const advancedCrl = await AWS.RolesAnywhere.CRL("advancedCrl", {
  name: "MyAdvancedCRL",
  crlData: "MIIC...yourCrlDataHere...",
  trustAnchorArn: "arn:aws:rolesanywhere:us-east-1:123456789012:trust-anchor/TA123456",
  enabled: true,
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Security" }
  ],
  adopt: true
});
```

In this example, we create an advanced CRL that includes tags for better organization and resource tracking, and we enable the adoption of an existing resource.

## Using a Disabled CRL

Create a CRL that is disabled, which can be useful for testing or staging purposes.

```ts
const disabledCrl = await AWS.RolesAnywhere.CRL("disabledCrl", {
  name: "MyDisabledCRL",
  crlData: "MIIC...yourCrlDataHere...",
  trustAnchorArn: "arn:aws:rolesanywhere:us-east-1:123456789012:trust-anchor/TA123456",
  enabled: false
});
```

This example illustrates the creation of a CRL that is initially disabled, allowing for later enabling as needed.

## Updating an Existing CRL

Demonstrate how to update an existing CRL's properties.

```ts
const updatedCrl = await AWS.RolesAnywhere.CRL("existingCrl", {
  name: "MyUpdatedCRL",
  crlData: "MIIC...newCrlDataHere...",
  enabled: true
});
```

This example shows how you can update the CRL data and enable the CRL, reflecting changes to improve security or compliance.

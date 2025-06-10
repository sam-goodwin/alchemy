---
title: PublicKey
description: Learn how to create, update, and manage AWS IVS PublicKeys using Alchemy Cloud Control.
---


The PublicKey resource lets you manage [AWS IVS PublicKeys](https://docs.aws.amazon.com/ivs/latest/userguide/) for securely signing video streams. This resource allows you to create and manage public keys used in the signing process of video streams.

## Minimal Example

Create a basic IVS PublicKey with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const publicKey = await AWS.IVS.PublicKey("myPublicKey", {
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1...",
  Name: "MyIVSPublicKey"
});
```

## Advanced Configuration

Configure an IVS PublicKey with tags for better resource management:

```ts
const taggedPublicKey = await AWS.IVS.PublicKey("taggedPublicKey", {
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC2...",
  Name: "TaggedIVSPublicKey",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "LiveStream" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing IVS PublicKey instead of creating a new one if it already exists:

```ts
const existingPublicKey = await AWS.IVS.PublicKey("existingPublicKey", {
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3...",
  Name: "ExistingIVSPublicKey",
  adopt: true
});
```

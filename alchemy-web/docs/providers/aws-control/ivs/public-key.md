---
title: Managing AWS IVS PublicKeys with Alchemy
description: Learn how to create, update, and manage AWS IVS PublicKeys using Alchemy Cloud Control.
---

# PublicKey

The PublicKey resource allows you to manage [AWS IVS PublicKeys](https://docs.aws.amazon.com/ivs/latest/userguide/) for secure streaming. PublicKeys are used to authenticate and encrypt communications for AWS Interactive Video Service.

## Minimal Example

Create a basic IVS PublicKey with essential properties.

```ts
import AWS from "alchemy/aws/control";

const MyPublicKey = await AWS.IVS.PublicKey("MyPublicKey", {
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...",
  Name: "MyIVSPublicKey",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Streaming" }
  ]
});
```

## Advanced Configuration

Configure an IVS PublicKey with optional properties for greater flexibility.

```ts
const AdvancedPublicKey = await AWS.IVS.PublicKey("AdvancedPublicKey", {
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...",
  Name: "AdvancedIVSPublicKey",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Development" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Adoption of Existing Key

Use the `adopt` property to handle existing resources gracefully.

```ts
const AdoptedPublicKey = await AWS.IVS.PublicKey("AdoptedPublicKey", {
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...",
  Name: "AdoptedIVSPublicKey",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Operations" }
  ],
  adopt: true // This will adopt the existing key instead of failing
});
```
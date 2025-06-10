---
title: PlaybackKeyPair
description: Learn how to create, update, and manage AWS IVS PlaybackKeyPairs using Alchemy Cloud Control.
---


The PlaybackKeyPair resource lets you manage AWS IVS Playback Key Pairs, which are used for securely delivering video playback keys. For more information, refer to the [AWS IVS PlaybackKeyPairs documentation](https://docs.aws.amazon.com/ivs/latest/userguide/).

## Minimal Example

Create a basic PlaybackKeyPair with a public key material and a name.

```ts
import AWS from "alchemy/aws/control";

const playbackKeyPair = await AWS.IVS.PlaybackKeyPair("myPlaybackKeyPair", {
  Name: "MyPlaybackKeyPair",
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEArG...your_public_key_here",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Create a PlaybackKeyPair with additional properties, including tags and adopting an existing resource.

```ts
const advancedPlaybackKeyPair = await AWS.IVS.PlaybackKeyPair("advancedPlaybackKeyPair", {
  Name: "AdvancedPlaybackKeyPair",
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEArG...your_public_key_here",
  Tags: [
    { Key: "Project", Value: "IVSStreaming" },
    { Key: "Owner", Value: "TeamAlpha" }
  ],
  adopt: true // Allow adoption of existing resource
});
```

## Use Case: Updating an Existing PlaybackKeyPair

This example demonstrates how to update the name of an existing PlaybackKeyPair.

```ts
const updatedPlaybackKeyPair = await AWS.IVS.PlaybackKeyPair("existingPlaybackKeyPair", {
  Name: "UpdatedPlaybackKeyPair",
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEArG...your_public_key_here"
});
```

This allows you to manage existing resources effectively without needing to recreate them.

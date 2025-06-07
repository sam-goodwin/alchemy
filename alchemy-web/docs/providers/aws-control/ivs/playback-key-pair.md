---
title: Managing AWS IVS PlaybackKeyPairs with Alchemy
description: Learn how to create, update, and manage AWS IVS PlaybackKeyPairs using Alchemy Cloud Control.
---

# PlaybackKeyPair

The PlaybackKeyPair resource allows you to manage AWS IVS (Interactive Video Service) playback key pairs that are used for authenticating video playback. For more information, refer to the [AWS IVS PlaybackKeyPairs documentation](https://docs.aws.amazon.com/ivs/latest/userguide/).

## Minimal Example

Create a basic PlaybackKeyPair with a public key material and tags.

```ts
import AWS from "alchemy/aws/control";

const BasicPlaybackKeyPair = await AWS.IVS.PlaybackKeyPair("BasicPlaybackKeyPair", {
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "MediaTeam" }
  ]
});
```

## Advanced Configuration

Configure a PlaybackKeyPair with a specific name and additional tags.

```ts
const AdvancedPlaybackKeyPair = await AWS.IVS.PlaybackKeyPair("AdvancedPlaybackKeyPair", {
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...",
  Name: "MyCustomPlaybackKeyPair",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Streaming" }
  ],
  adopt: true // This will adopt the existing resource if it already exists
});
```

## Updating an Existing Key Pair

Update an existing PlaybackKeyPair by changing its tags.

```ts
const UpdatedPlaybackKeyPair = await AWS.IVS.PlaybackKeyPair("UpdatedPlaybackKeyPair", {
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "UpdatedMediaTeam" }
  ],
  adopt: true // Ensures no error if the resource already exists
});
```
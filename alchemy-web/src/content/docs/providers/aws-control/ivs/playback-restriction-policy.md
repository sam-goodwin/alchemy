---
title: PlaybackRestrictionPolicy
description: Learn how to create, update, and manage AWS IVS PlaybackRestrictionPolicys using Alchemy Cloud Control.
---


The PlaybackRestrictionPolicy resource allows you to manage playback restrictions for AWS Interactive Video Service (IVS) streams, providing control over allowed origins and countries for playback. For more details, refer to the [AWS IVS PlaybackRestrictionPolicys documentation](https://docs.aws.amazon.com/ivs/latest/userguide/).

## Minimal Example

Create a basic playback restriction policy with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const playbackPolicy = await AWS.IVS.PlaybackRestrictionPolicy("basicPlaybackPolicy", {
  AllowedOrigins: ["https://mywebsite.com"],
  AllowedCountries: ["US", "CA"],
  EnableStrictOriginEnforcement: true,
  Name: "BasicPlaybackPolicy"
});
```

## Advanced Configuration

Configure a playback restriction policy with multiple allowed origins and countries.

```ts
const advancedPlaybackPolicy = await AWS.IVS.PlaybackRestrictionPolicy("advancedPlaybackPolicy", {
  AllowedOrigins: [
    "https://mywebsite.com",
    "https://anotherwebsite.com"
  ],
  AllowedCountries: ["US", "CA", "GB"],
  EnableStrictOriginEnforcement: false,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "LiveStreaming" }
  ],
  Name: "AdvancedPlaybackPolicy"
});
```

## Adoption of Existing Resource

Adopt an existing playback restriction policy without failing if it already exists.

```ts
const existingPolicy = await AWS.IVS.PlaybackRestrictionPolicy("adoptedPlaybackPolicy", {
  AllowedOrigins: ["https://existingwebsite.com"],
  AllowedCountries: ["US"],
  adopt: true,
  Name: "AdoptedPlaybackPolicy"
});
```

## Custom Policy Example

Create a playback restriction policy that allows specific origins and countries with strict origin enforcement.

```ts
const customPlaybackPolicy = await AWS.IVS.PlaybackRestrictionPolicy("customPlaybackPolicy", {
  AllowedOrigins: ["https://customdomain.com"],
  AllowedCountries: ["FR", "DE"],
  EnableStrictOriginEnforcement: true,
  Name: "CustomPlaybackPolicy"
});
```

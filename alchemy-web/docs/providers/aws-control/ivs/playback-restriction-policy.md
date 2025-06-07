---
title: Managing AWS IVS PlaybackRestrictionPolicys with Alchemy
description: Learn how to create, update, and manage AWS IVS PlaybackRestrictionPolicys using Alchemy Cloud Control.
---

# PlaybackRestrictionPolicy

The PlaybackRestrictionPolicy resource allows you to manage playback restrictions for AWS Interactive Video Service (IVS) streams, including allowed origins and countries. For more details, you can refer to the [AWS IVS PlaybackRestrictionPolicys documentation](https://docs.aws.amazon.com/ivs/latest/userguide/).

## Minimal Example

Create a basic playback restriction policy with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const PlaybackRestrictionPolicy = await AWS.IVS.PlaybackRestrictionPolicy("BasicPlaybackPolicy", {
  AllowedOrigins: ["https://example.com", "https://another-example.com"],
  AllowedCountries: ["US", "CA"],
  EnableStrictOriginEnforcement: true,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Streaming" }
  ]
});
```

## Advanced Configuration

Configure a playback restriction policy with additional settings for strict origin enforcement and specific allowed countries.

```ts
const AdvancedPlaybackPolicy = await AWS.IVS.PlaybackRestrictionPolicy("AdvancedPlaybackPolicy", {
  AllowedOrigins: ["https://secure.example.com"],
  AllowedCountries: ["FR", "DE", "JP"],
  EnableStrictOriginEnforcement: true,
  Name: "StrictPlaybackPolicy",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Adopt Existing Resource

If you want to adopt an existing playback restriction policy instead of creating a new one, you can set the `adopt` property to `true`.

```ts
const AdoptedPlaybackPolicy = await AWS.IVS.PlaybackRestrictionPolicy("AdoptedPlaybackPolicy", {
  AllowedOrigins: ["https://existing.example.com"],
  AllowedCountries: ["GB"],
  adopt: true
});
```
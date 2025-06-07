---
title: Managing AWS MediaLive SdiSources with Alchemy
description: Learn how to create, update, and manage AWS MediaLive SdiSources using Alchemy Cloud Control.
---

# SdiSource

The SdiSource resource allows you to manage [AWS MediaLive SdiSources](https://docs.aws.amazon.com/medialive/latest/userguide/) for ingesting SDI video signals into a MediaLive channel.

## Minimal Example

Create a basic SDI source with required properties and one optional tag:

```ts
import AWS from "alchemy/aws/control";

const BasicSdiSource = await AWS.MediaLive.SdiSource("BasicSdiSource", {
  Name: "MainSDISource",
  Type: "SDI",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

Configure an SDI source with additional properties, including mode:

```ts
const AdvancedSdiSource = await AWS.MediaLive.SdiSource("AdvancedSdiSource", {
  Name: "AdvancedSDISource",
  Type: "SDI",
  Mode: "AUTO",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "MediaProduction" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing SDI source instead of failing when the resource already exists, you can set the adopt property:

```ts
const AdoptedSdiSource = await AWS.MediaLive.SdiSource("AdoptedSdiSource", {
  Name: "ExistingSDISource",
  Type: "SDI",
  adopt: true
});
```

## Custom Name and Tags

Create an SDI source with a custom name and multiple tags for better resource management:

```ts
const CustomNamedSdiSource = await AWS.MediaLive.SdiSource("CustomNamedSdiSource", {
  Name: "CustomSDISource",
  Type: "SDI",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "MediaTeam" },
    { Key: "Project", Value: "LiveStreaming" }
  ]
});
```
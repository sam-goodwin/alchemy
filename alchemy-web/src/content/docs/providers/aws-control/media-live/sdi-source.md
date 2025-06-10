---
title: SdiSource
description: Learn how to create, update, and manage AWS MediaLive SdiSources using Alchemy Cloud Control.
---


The SdiSource resource allows you to manage [AWS MediaLive SdiSources](https://docs.aws.amazon.com/medialive/latest/userguide/) for your media workflows. SDI (Serial Digital Interface) sources are used to ingest high-quality video feeds into AWS MediaLive.

## Minimal Example

Create a basic SdiSource with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const sdiSource = await AWS.MediaLive.SdiSource("mySdiSource", {
  Name: "primary-sdi-source",
  Type: "SDI",
  Mode: "AUTO" // Optional: Mode can be AUTO or MANUAL
});
```

## Advanced Configuration

Configure an SdiSource with additional settings such as tags and adoption options.

```ts
const advancedSdiSource = await AWS.MediaLive.SdiSource("advancedSdiSource", {
  Name: "advanced-sdi-source",
  Type: "SDI",
  Mode: "MANUAL", // Optional: Set to MANUAL for specific configurations
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "LiveStreaming" }
  ],
  adopt: true // Optional: If true, adopts existing resource instead of failing
});
```

## Connecting Multiple Sources

Demonstrate how to create multiple SdiSources for redundancy.

```ts
const secondarySdiSource = await AWS.MediaLive.SdiSource("secondarySdiSource", {
  Name: "secondary-sdi-source",
  Type: "SDI",
  Mode: "AUTO"
});
```

## Ingesting Multiple Feeds

Configure an SdiSource to handle multiple video feeds by creating a list of sources.

```ts
const multiFeedSdiSource = await AWS.MediaLive.SdiSource("multiFeedSdiSource", {
  Name: "multi-feed-sdi-source",
  Type: "SDI",
  Mode: "AUTO",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "UseCase", Value: "Testing" }
  ],
  adopt: false // Default is false: will fail if the resource already exists
});
```

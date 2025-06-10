---
title: Discoverer
description: Learn how to create, update, and manage AWS EventSchemas Discoverers using Alchemy Cloud Control.
---


The Discoverer resource lets you manage [AWS EventSchemas Discoverers](https://docs.aws.amazon.com/eventschemas/latest/userguide/) to facilitate the discovery of event schemas in your AWS environment.

## Minimal Example

Create a basic EventSchemas Discoverer with essential properties:

```ts
import AWS from "alchemy/aws/control";

const basicDiscoverer = await AWS.EventSchemas.Discoverer("basic-discoverer", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:event-bus/default",
  Description: "This discoverer is for the default event bus.",
  CrossAccount: false
});
```

## Advanced Configuration

Configure a Discoverer with additional tags and cross-account access:

```ts
const advancedDiscoverer = await AWS.EventSchemas.Discoverer("advanced-discoverer", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:event-bus/custom-bus",
  Description: "This discoverer supports cross-account access.",
  CrossAccount: true,
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Department",
      Value: "Finance"
    }
  ]
});
```

## Adoption of Existing Resource

Create a Discoverer that adopts an existing resource if it already exists:

```ts
const adoptDiscoverer = await AWS.EventSchemas.Discoverer("adopt-discoverer", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:event-bus/adopt-bus",
  Description: "This discoverer will adopt the existing resource.",
  adopt: true
});
```

---
title: Managing AWS EventSchemas Discoverers with Alchemy
description: Learn how to create, update, and manage AWS EventSchemas Discoverers using Alchemy Cloud Control.
---

# Discoverer

The Discoverer resource allows you to create and manage [AWS EventSchemas Discoverers](https://docs.aws.amazon.com/eventschemas/latest/userguide/) which are essential for discovering and managing event schemas in AWS.

## Minimal Example

This example demonstrates how to create a basic EventSchemas Discoverer with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicDiscoverer = await AWS.EventSchemas.Discoverer("BasicDiscoverer", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:event-bus/default",
  Description: "A basic discoverer for event schemas"
});
```

## Advanced Configuration

In this example, we configure a Discoverer with cross-account capabilities and tags for better resource management.

```ts
const AdvancedDiscoverer = await AWS.EventSchemas.Discoverer("AdvancedDiscoverer", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:event-bus/default",
  CrossAccount: true,
  Description: "An advanced discoverer for event schemas with cross-account access",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "EventTeam" }
  ]
});
```

## Adoption of Existing Resource

This example shows how to adopt an existing Discoverer resource instead of failing if it already exists. It uses the `adopt` property to ensure seamless resource management.

```ts
const AdoptedDiscoverer = await AWS.EventSchemas.Discoverer("AdoptedDiscoverer", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:event-bus/default",
  Description: "An adopted discoverer that manages existing resources",
  adopt: true
});
```
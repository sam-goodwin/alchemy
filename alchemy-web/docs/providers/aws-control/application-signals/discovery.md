---
title: Managing AWS ApplicationSignals Discoverys with Alchemy
description: Learn how to create, update, and manage AWS ApplicationSignals Discoverys using Alchemy Cloud Control.
---

# Discovery

The Discovery resource allows you to manage [AWS ApplicationSignals Discoverys](https://docs.aws.amazon.com/applicationsignals/latest/userguide/) to help discover and manage application signals effectively.

## Minimal Example

This example demonstrates how to create a basic Discovery resource with minimal required properties.

```ts
import AWS from "alchemy/aws/control";

const basicDiscovery = await AWS.ApplicationSignals.Discovery("BasicDiscovery", {
  adopt: false // Default is false, will fail if the resource already exists
});
```

## Advanced Configuration

In this example, we configure a Discovery resource with the `adopt` property set to true, allowing the adoption of an existing resource instead of failing.

```ts
const advancedDiscovery = await AWS.ApplicationSignals.Discovery("AdvancedDiscovery", {
  adopt: true
});
```

## Creation Time and Last Update Time

This example shows how to access the ARN, creation time, and last update time of the Discovery resource after creation.

```ts
const detailedDiscovery = await AWS.ApplicationSignals.Discovery("DetailedDiscovery", {
  adopt: false
});

// Accessing additional properties
console.log("ARN:", detailedDiscovery.Arn);
console.log("Creation Time:", detailedDiscovery.CreationTime);
console.log("Last Update Time:", detailedDiscovery.LastUpdateTime);
```
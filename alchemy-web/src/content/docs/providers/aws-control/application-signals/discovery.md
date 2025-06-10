---
title: Discovery
description: Learn how to create, update, and manage AWS ApplicationSignals Discoverys using Alchemy Cloud Control.
---


The Discovery resource lets you manage [AWS ApplicationSignals Discoverys](https://docs.aws.amazon.com/applicationsignals/latest/userguide/) for tracking application performance and signals.

## Minimal Example

Create a basic Discovery resource with minimal properties.

```ts
import AWS from "alchemy/aws/control";

const basicDiscovery = await AWS.ApplicationSignals.Discovery("basic-discovery", {
  adopt: false // Default is false; it will fail if the resource already exists
});
```

## Advanced Configuration

Configure a Discovery resource with the option to adopt an existing resource.

```ts
const advancedDiscovery = await AWS.ApplicationSignals.Discovery("advanced-discovery", {
  adopt: true // This will adopt the existing resource instead of failing
});
```

## Monitoring Discovery Details

Create a Discovery resource and monitor its properties such as ARN and timestamps.

```ts
const monitoredDiscovery = await AWS.ApplicationSignals.Discovery("monitored-discovery", {
  adopt: false
});

// Log details about the Discovery resource
console.log(`ARN: ${monitoredDiscovery.Arn}`);
console.log(`Creation Time: ${monitoredDiscovery.CreationTime}`);
console.log(`Last Update Time: ${monitoredDiscovery.LastUpdateTime}`);
```

---
title: TrackerConsumer
description: Learn how to create, update, and manage AWS Location TrackerConsumers using Alchemy Cloud Control.
---


The TrackerConsumer resource allows you to manage [AWS Location TrackerConsumers](https://docs.aws.amazon.com/location/latest/userguide/) for integrating tracking capabilities within your applications.

## Minimal Example

Create a basic TrackerConsumer with required properties.

```ts
import AWS from "alchemy/aws/control";

const trackerConsumer = await AWS.Location.TrackerConsumer("myTrackerConsumer", {
  TrackerName: "myTracker",
  ConsumerArn: "arn:aws:location:us-east-1:123456789012:tracker/myTracker"
});
```

## Advanced Configuration

You can adopt an existing TrackerConsumer resource if it already exists by setting the `adopt` property.

```ts
const adoptedTrackerConsumer = await AWS.Location.TrackerConsumer("myAdoptedTrackerConsumer", {
  TrackerName: "myTracker",
  ConsumerArn: "arn:aws:location:us-east-1:123456789012:tracker/myTracker",
  adopt: true // Adopts the existing resource instead of failing
});
```

## Resource Properties

The TrackerConsumer resource includes additional properties such as `Arn`, `CreationTime`, and `LastUpdateTime` that provide metadata about the resource.

```ts
const trackerConsumerWithMetadata = await AWS.Location.TrackerConsumer("myTrackerConsumerWithMetadata", {
  TrackerName: "myTracker",
  ConsumerArn: "arn:aws:location:us-east-1:123456789012:tracker/myTracker"
});

// Accessing additional properties
console.log(trackerConsumerWithMetadata.Arn);
console.log(trackerConsumerWithMetadata.CreationTime);
console.log(trackerConsumerWithMetadata.LastUpdateTime);
```

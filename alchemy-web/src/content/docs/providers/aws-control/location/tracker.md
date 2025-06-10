---
title: Tracker
description: Learn how to create, update, and manage AWS Location Trackers using Alchemy Cloud Control.
---


The Tracker resource allows you to manage [AWS Location Trackers](https://docs.aws.amazon.com/location/latest/userguide/) for tracking the location of devices and assets in real-time.

## Minimal Example

Create a basic location tracker with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicTracker = await AWS.Location.Tracker("basicTracker", {
  TrackerName: "MyDeviceTracker",
  Description: "Tracks the location of my devices",
  EventBridgeEnabled: true
});
```

## Advanced Configuration

Configure a tracker with encryption settings and position filtering.

```ts
const advancedTracker = await AWS.Location.Tracker("advancedTracker", {
  TrackerName: "SecureDeviceTracker",
  Description: "Tracks devices with secure settings",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-efgh-5678-ijkl-9876543210mn",
  KmsKeyEnableGeospatialQueries: true,
  PositionFiltering: "TimeBased"
});
```

## Using Tags for Resource Management

Create a tracker with tags for better resource organization.

```ts
const taggedTracker = await AWS.Location.Tracker("taggedTracker", {
  TrackerName: "TaggedDeviceTracker",
  Description: "Tracks devices with tagging",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing tracker instead of failing if it already exists.

```ts
const adoptTracker = await AWS.Location.Tracker("adoptTracker", {
  TrackerName: "ExistingDeviceTracker",
  adopt: true
});
```

---
title: Managing AWS Location Trackers with Alchemy
description: Learn how to create, update, and manage AWS Location Trackers using Alchemy Cloud Control.
---

# Tracker

The Tracker resource lets you manage [AWS Location Trackers](https://docs.aws.amazon.com/location/latest/userguide/) for tracking the geographic locations of assets and devices in real-time.

## Minimal Example

Create a basic Location Tracker with essential properties:

```ts
import AWS from "alchemy/aws/control";

const locationTracker = await AWS.Location.Tracker("MyLocationTracker", {
  TrackerName: "MyTracker",
  Description: "A tracker for monitoring device locations.",
  EventBridgeEnabled: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Operations" }
  ]
});
```

## Advanced Configuration

Configure a tracker with additional settings for enhanced security and data management:

```ts
const secureLocationTracker = await AWS.Location.Tracker("SecureLocationTracker", {
  TrackerName: "SecureTracker",
  Description: "A secure tracker with KMS encryption.",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab",
  KmsKeyEnableGeospatialQueries: true,
  PositionFiltering: "TimeBased",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Using EventBridge for Real-Time Tracking

Set up a tracker that integrates with Amazon EventBridge to trigger events for location updates:

```ts
const eventDrivenTracker = await AWS.Location.Tracker("EventDrivenTracker", {
  TrackerName: "EventDrivenTracker",
  Description: "Tracker that triggers events on location updates.",
  EventBridgeEnabled: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```

## Enabling Position Filtering

Create a tracker with position filtering to manage location data more effectively:

```ts
const filteredTracker = await AWS.Location.Tracker("FilteredTracker", {
  TrackerName: "FilteredTracker",
  Description: "Tracker with position filtering enabled.",
  PositionFiltering: "AccuracyBased",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "R&D" }
  ]
});
```
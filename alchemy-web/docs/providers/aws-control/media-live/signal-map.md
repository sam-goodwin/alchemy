---
title: Managing AWS MediaLive SignalMaps with Alchemy
description: Learn how to create, update, and manage AWS MediaLive SignalMaps using Alchemy Cloud Control.
---

# SignalMap

The SignalMap resource allows you to manage [AWS MediaLive SignalMaps](https://docs.aws.amazon.com/medialive/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic SignalMap with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicSignalMap = await AWS.MediaLive.SignalMap("BasicSignalMap", {
  Name: "MySignalMap",
  DiscoveryEntryPointArn: "arn:aws:medialive:us-west-2:123456789012:discovery-entry-point/abc123",
  Description: "This is a basic SignalMap for our MediaLive configuration."
});
```

## Advanced Configuration

Configure a SignalMap with additional properties, including EventBridge rule template group identifiers and tags.

```ts
const AdvancedSignalMap = await AWS.MediaLive.SignalMap("AdvancedSignalMap", {
  Name: "MyAdvancedSignalMap",
  DiscoveryEntryPointArn: "arn:aws:medialive:us-west-2:123456789012:discovery-entry-point/xyz456",
  EventBridgeRuleTemplateGroupIdentifiers: ["group1", "group2"],
  CloudWatchAlarmTemplateGroupIdentifiers: ["alarmGroup1"],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "MediaLive" }
  ]
});
```

## Force Rediscovery

Create a SignalMap that forces rediscovery of resources.

```ts
const ForceRediscoverySignalMap = await AWS.MediaLive.SignalMap("ForceRediscoverySignalMap", {
  Name: "MyForceRediscoverySignalMap",
  DiscoveryEntryPointArn: "arn:aws:medialive:us-west-2:123456789012:discovery-entry-point/def789",
  ForceRediscovery: true,
  Description: "This SignalMap forces rediscovery of all resources."
});
```

## Adoption of Existing Resources

Create a SignalMap that adopts an existing resource instead of failing.

```ts
const AdoptExistingSignalMap = await AWS.MediaLive.SignalMap("AdoptExistingSignalMap", {
  Name: "MyAdoptExistingSignalMap",
  DiscoveryEntryPointArn: "arn:aws:medialive:us-west-2:123456789012:discovery-entry-point/ghi101",
  adopt: true,
  Description: "This SignalMap will adopt an existing resource if it exists."
});
```
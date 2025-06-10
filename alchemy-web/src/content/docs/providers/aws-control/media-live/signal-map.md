---
title: SignalMap
description: Learn how to create, update, and manage AWS MediaLive SignalMaps using Alchemy Cloud Control.
---


The SignalMap resource allows you to manage [AWS MediaLive SignalMaps](https://docs.aws.amazon.com/medialive/latest/userguide/) for video processing and signal management in your broadcasting workflows.

## Minimal Example

Create a basic SignalMap with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicSignalMap = await AWS.MediaLive.SignalMap("basicSignalMap", {
  discoveryEntryPointArn: "arn:aws:medialive:us-west-2:123456789012:signalmap:basic-signal-map",
  name: "BasicSignalMap",
  description: "This is a basic SignalMap for demonstration purposes."
});
```

## Advanced Configuration

Configure a SignalMap with additional options such as EventBridge rule template group identifiers and CloudWatch alarm template group identifiers.

```ts
const advancedSignalMap = await AWS.MediaLive.SignalMap("advancedSignalMap", {
  discoveryEntryPointArn: "arn:aws:medialive:us-west-2:123456789012:signalmap:advanced-signal-map",
  name: "AdvancedSignalMap",
  eventBridgeRuleTemplateGroupIdentifiers: ["group1", "group2"],
  cloudWatchAlarmTemplateGroupIdentifiers: ["alarmGroup1", "alarmGroup2"],
  forceRediscovery: true,
  tags: {
    project: "media-processing",
    environment: "production"
  }
});
```

## SignalMap with Rediscovery

Create a SignalMap that forces rediscovery of existing resources when created.

```ts
const rediscoverySignalMap = await AWS.MediaLive.SignalMap("rediscoverySignalMap", {
  discoveryEntryPointArn: "arn:aws:medialive:us-west-2:123456789012:signalmap:rediscovery-signal-map",
  name: "RediscoverySignalMap",
  forceRediscovery: true,
  description: "This SignalMap forces rediscovery of existing resources."
});
```

## SignalMap with Tags

Create a SignalMap that utilizes tags for better resource organization and management.

```ts
const taggedSignalMap = await AWS.MediaLive.SignalMap("taggedSignalMap", {
  discoveryEntryPointArn: "arn:aws:medialive:us-west-2:123456789012:signalmap:tagged-signal-map",
  name: "TaggedSignalMap",
  tags: {
    owner: "dev-team",
    purpose: "testing"
  }
});
```

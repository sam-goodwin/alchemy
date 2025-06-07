---
title: Managing AWS MediaLive EventBridgeRuleTemplateGroups with Alchemy
description: Learn how to create, update, and manage AWS MediaLive EventBridgeRuleTemplateGroups using Alchemy Cloud Control.
---

# EventBridgeRuleTemplateGroup

The EventBridgeRuleTemplateGroup resource allows you to manage [AWS MediaLive EventBridge Rule Template Groups](https://docs.aws.amazon.com/medialive/latest/userguide/) for configuring event-driven workflows in your media processing pipeline.

## Minimal Example

Create a basic EventBridge Rule Template Group with a name and description.

```ts
import AWS from "alchemy/aws/control";

const MinimalEventBridgeRuleTemplateGroup = await AWS.MediaLive.EventBridgeRuleTemplateGroup("MinimalRuleTemplateGroup", {
  Name: "MyFirstTemplateGroup",
  Description: "This is a minimal EventBridge Rule Template Group",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Advanced Configuration

Configure an EventBridge Rule Template Group with additional properties such as tags and adoption behavior.

```ts
const AdvancedEventBridgeRuleTemplateGroup = await AWS.MediaLive.EventBridgeRuleTemplateGroup("AdvancedRuleTemplateGroup", {
  Name: "AdvancedTemplateGroup",
  Description: "This template group includes advanced configurations.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "MediaTeam" }
  ],
  adopt: true // Adopt existing resource if it exists
});
```

## Using Tags for Organization

Create an EventBridge Rule Template Group that uses tags to categorize resources effectively.

```ts
const TaggedEventBridgeRuleTemplateGroup = await AWS.MediaLive.EventBridgeRuleTemplateGroup("TaggedRuleTemplateGroup", {
  Name: "TaggedTemplateGroup",
  Description: "A tagged EventBridge Rule Template Group for better management.",
  Tags: [
    { Key: "Project", Value: "LiveStreaming" },
    { Key: "Department", Value: "Broadcast" }
  ]
});
```
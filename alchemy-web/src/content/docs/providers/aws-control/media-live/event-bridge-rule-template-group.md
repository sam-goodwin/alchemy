---
title: EventBridgeRuleTemplateGroup
description: Learn how to create, update, and manage AWS MediaLive EventBridgeRuleTemplateGroups using Alchemy Cloud Control.
---


The EventBridgeRuleTemplateGroup resource allows you to manage groups of AWS MediaLive EventBridge rule templates. This resource is essential for organizing and automating media workflows. For more information, refer to the [AWS MediaLive EventBridgeRuleTemplateGroups](https://docs.aws.amazon.com/medialive/latest/userguide/).

## Minimal Example

Create a basic EventBridgeRuleTemplateGroup with a name and description.

```ts
import AWS from "alchemy/aws/control";

const templateGroup = await AWS.MediaLive.EventBridgeRuleTemplateGroup("basic-template-group", {
  name: "MyMediaLiveTemplateGroup",
  description: "This is a template group for media live events.",
  tags: {
    environment: "production",
    project: "media-live"
  }
});
```

## Advanced Configuration

Configure an EventBridgeRuleTemplateGroup with additional properties such as tags and adoption of existing resources.

```ts
const advancedTemplateGroup = await AWS.MediaLive.EventBridgeRuleTemplateGroup("advanced-template-group", {
  name: "AdvancedMediaLiveTemplateGroup",
  description: "This group adopts existing resources for better management.",
  tags: {
    department: "media",
    owner: "team-a"
  },
  adopt: true
});
```

## Use Case: Automated Event Management

Set up a template group specifically for managing automated events in a media workflow.

```ts
const automatedEventTemplateGroup = await AWS.MediaLive.EventBridgeRuleTemplateGroup("automated-event-group", {
  name: "AutomatedEventTemplateGroup",
  description: "Template group for managing automated media events.",
  tags: {
    useCase: "automation",
    status: "active"
  }
});
```

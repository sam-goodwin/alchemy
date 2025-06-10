---
title: EventBridgeRuleTemplate
description: Learn how to create, update, and manage AWS MediaLive EventBridgeRuleTemplates using Alchemy Cloud Control.
---


The EventBridgeRuleTemplate resource allows you to create and manage EventBridge rule templates for AWS MediaLive, enabling you to define how MediaLive events interact with EventBridge. For more information, see the [AWS MediaLive EventBridgeRuleTemplates documentation](https://docs.aws.amazon.com/medialive/latest/userguide/).

## Minimal Example

Create a basic EventBridge rule template with the required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const minimalEventBridgeRuleTemplate = await AWS.MediaLive.EventBridgeRuleTemplate("basicRuleTemplate", {
  name: "BasicRuleTemplate",
  eventType: "MediaLiveEvent",
  description: "This is a simple EventBridge rule template for MediaLive events."
});
```

## Advanced Configuration

Configure an EventBridge rule template with multiple event targets and tags for better organization.

```ts
const advancedEventBridgeRuleTemplate = await AWS.MediaLive.EventBridgeRuleTemplate("advancedRuleTemplate", {
  name: "AdvancedRuleTemplate",
  eventType: "MediaLiveEvent",
  description: "This template has multiple targets and tags.",
  eventTargets: [
    {
      targetArn: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
      id: "SQSQueueTarget",
      inputTransformer: {
        inputPathsMap: {
          detail: "$.detail",
          source: "$.source"
        },
        inputTemplate: "<template>${detail}</template>"
      }
    },
    {
      targetArn: "arn:aws:lambda:us-east-1:123456789012:function:MyFunction",
      id: "LambdaFunctionTarget"
    }
  ],
  tags: {
    Project: "MediaLiveIntegration",
    Environment: "Production"
  }
});
```

## Using Group Identifier

Demonstrate how to create an EventBridge rule template with a group identifier to manage related rules.

```ts
const groupedEventBridgeRuleTemplate = await AWS.MediaLive.EventBridgeRuleTemplate("groupedRuleTemplate", {
  name: "GroupedRuleTemplate",
  eventType: "MediaLiveEvent",
  description: "This template is part of a group of related templates.",
  groupIdentifier: "media-live-group",
  eventTargets: [
    {
      targetArn: "arn:aws:events:us-east-1:123456789012:rule/MyRule",
      id: "EventRuleTarget"
    }
  ]
});
```

---
title: Managing AWS MediaLive EventBridgeRuleTemplates with Alchemy
description: Learn how to create, update, and manage AWS MediaLive EventBridgeRuleTemplates using Alchemy Cloud Control.
---

# EventBridgeRuleTemplate

The EventBridgeRuleTemplate resource lets you create and manage [AWS MediaLive EventBridgeRuleTemplates](https://docs.aws.amazon.com/medialive/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-medialive-eventbridgeruletemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const eventbridgeruletemplate = await AWS.MediaLive.EventBridgeRuleTemplate(
  "eventbridgeruletemplate-example",
  {
    EventType: "example-eventtype",
    Name: "eventbridgeruletemplate-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A eventbridgeruletemplate resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a eventbridgeruletemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEventBridgeRuleTemplate = await AWS.MediaLive.EventBridgeRuleTemplate(
  "advanced-eventbridgeruletemplate",
  {
    EventType: "example-eventtype",
    Name: "eventbridgeruletemplate-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A eventbridgeruletemplate resource managed by Alchemy",
  }
);
```


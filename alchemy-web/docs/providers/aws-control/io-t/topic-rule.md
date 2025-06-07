---
title: Managing AWS IoT TopicRules with Alchemy
description: Learn how to create, update, and manage AWS IoT TopicRules using Alchemy Cloud Control.
---

# TopicRule

The TopicRule resource lets you create and manage [AWS IoT TopicRules](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const topicrule = await AWS.IoT.TopicRule("topicrule-example", {
  TopicRulePayload: "example-topicrulepayload",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a topicrule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTopicRule = await AWS.IoT.TopicRule("advanced-topicrule", {
  TopicRulePayload: "example-topicrulepayload",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


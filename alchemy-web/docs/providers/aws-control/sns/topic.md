---
title: Managing AWS SNS Topics with Alchemy
description: Learn how to create, update, and manage AWS SNS Topics using Alchemy Cloud Control.
---

# Topic

The Topic resource lets you create and manage [AWS SNS Topics](https://docs.aws.amazon.com/sns/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-topic.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const topic = await AWS.SNS.Topic("topic-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a topic with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTopic = await AWS.SNS.Topic("advanced-topic", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


---
title: Managing AWS QuickSight Topics with Alchemy
description: Learn how to create, update, and manage AWS QuickSight Topics using Alchemy Cloud Control.
---

# Topic

The Topic resource lets you create and manage [AWS QuickSight Topics](https://docs.aws.amazon.com/quicksight/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-topic.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const topic = await AWS.QuickSight.Topic("topic-example", {
  Description: "A topic resource managed by Alchemy",
});
```

## Advanced Configuration

Create a topic with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTopic = await AWS.QuickSight.Topic("advanced-topic", {
  Description: "A topic resource managed by Alchemy",
});
```


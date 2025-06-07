---
title: Managing AWS SNS TopicPolicys with Alchemy
description: Learn how to create, update, and manage AWS SNS TopicPolicys using Alchemy Cloud Control.
---

# TopicPolicy

The TopicPolicy resource lets you create and manage [AWS SNS TopicPolicys](https://docs.aws.amazon.com/sns/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-topicpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const topicpolicy = await AWS.SNS.TopicPolicy("topicpolicy-example", {
  Topics: ["example-topics-1"],
  PolicyDocument: {},
});
```


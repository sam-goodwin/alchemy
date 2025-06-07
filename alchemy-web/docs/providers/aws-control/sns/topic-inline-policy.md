---
title: Managing AWS SNS TopicInlinePolicys with Alchemy
description: Learn how to create, update, and manage AWS SNS TopicInlinePolicys using Alchemy Cloud Control.
---

# TopicInlinePolicy

The TopicInlinePolicy resource lets you create and manage [AWS SNS TopicInlinePolicys](https://docs.aws.amazon.com/sns/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-topicinlinepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const topicinlinepolicy = await AWS.SNS.TopicInlinePolicy("topicinlinepolicy-example", {
  TopicArn: "example-topicarn",
  PolicyDocument: {},
});
```


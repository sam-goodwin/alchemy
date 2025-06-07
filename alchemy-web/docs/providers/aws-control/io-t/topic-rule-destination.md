---
title: Managing AWS IoT TopicRuleDestinations with Alchemy
description: Learn how to create, update, and manage AWS IoT TopicRuleDestinations using Alchemy Cloud Control.
---

# TopicRuleDestination

The TopicRuleDestination resource lets you create and manage [AWS IoT TopicRuleDestinations](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicruledestination.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const topicruledestination = await AWS.IoT.TopicRuleDestination("topicruledestination-example", {});
```


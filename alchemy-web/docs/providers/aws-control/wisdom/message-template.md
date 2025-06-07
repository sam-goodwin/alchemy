---
title: Managing AWS Wisdom MessageTemplates with Alchemy
description: Learn how to create, update, and manage AWS Wisdom MessageTemplates using Alchemy Cloud Control.
---

# MessageTemplate

The MessageTemplate resource lets you create and manage [AWS Wisdom MessageTemplates](https://docs.aws.amazon.com/wisdom/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wisdom-messagetemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const messagetemplate = await AWS.Wisdom.MessageTemplate("messagetemplate-example", {
  Content: "example-content",
  KnowledgeBaseArn: "example-knowledgebasearn",
  ChannelSubtype: "example-channelsubtype",
  Name: "messagetemplate-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A messagetemplate resource managed by Alchemy",
});
```

## Advanced Configuration

Create a messagetemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMessageTemplate = await AWS.Wisdom.MessageTemplate("advanced-messagetemplate", {
  Content: "example-content",
  KnowledgeBaseArn: "example-knowledgebasearn",
  ChannelSubtype: "example-channelsubtype",
  Name: "messagetemplate-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A messagetemplate resource managed by Alchemy",
});
```


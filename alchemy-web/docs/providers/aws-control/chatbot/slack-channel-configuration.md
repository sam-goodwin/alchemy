---
title: Managing AWS Chatbot SlackChannelConfigurations with Alchemy
description: Learn how to create, update, and manage AWS Chatbot SlackChannelConfigurations using Alchemy Cloud Control.
---

# SlackChannelConfiguration

The SlackChannelConfiguration resource lets you create and manage [AWS Chatbot SlackChannelConfigurations](https://docs.aws.amazon.com/chatbot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-chatbot-slackchannelconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const slackchannelconfiguration = await AWS.Chatbot.SlackChannelConfiguration(
  "slackchannelconfiguration-example",
  {
    SlackWorkspaceId: "example-slackworkspaceid",
    SlackChannelId: "example-slackchannelid",
    IamRoleArn: "example-iamrolearn",
    ConfigurationName: "slackchannelconfiguration-configuration",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a slackchannelconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSlackChannelConfiguration = await AWS.Chatbot.SlackChannelConfiguration(
  "advanced-slackchannelconfiguration",
  {
    SlackWorkspaceId: "example-slackworkspaceid",
    SlackChannelId: "example-slackchannelid",
    IamRoleArn: "example-iamrolearn",
    ConfigurationName: "slackchannelconfiguration-configuration",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```


---
title: SlackChannelConfiguration
description: Learn how to create, update, and manage AWS Chatbot SlackChannelConfigurations using Alchemy Cloud Control.
---


The SlackChannelConfiguration resource lets you manage [AWS Chatbot Slack Channel Configurations](https://docs.aws.amazon.com/chatbot/latest/userguide/) for sending notifications and executing AWS commands directly from your Slack channels.

## Minimal Example

Create a basic SlackChannelConfiguration with required properties and a common optional setting.

```ts
import AWS from "alchemy/aws/control";

const slackChannelConfig = await AWS.Chatbot.SlackChannelConfiguration("mySlackChannelConfig", {
  SlackWorkspaceId: "T12345678",
  SlackChannelId: "C12345678",
  IamRoleArn: "arn:aws:iam::123456789012:role/myChatbotRole",
  ConfigurationName: "MySlackBotConfig",
  UserRoleRequired: true // Optional: Indicates if user role is required
});
```

## Advanced Configuration

Configure a SlackChannelConfiguration with logging level and SNS topic ARNs for notifications.

```ts
const advancedSlackChannelConfig = await AWS.Chatbot.SlackChannelConfiguration("advancedSlackChannelConfig", {
  SlackWorkspaceId: "T87654321",
  SlackChannelId: "C87654321",
  IamRoleArn: "arn:aws:iam::123456789012:role/myAdvancedChatbotRole",
  ConfigurationName: "AdvancedSlackBotConfig",
  LoggingLevel: "INFO", // Optional: Set logging level for the configuration
  SnsTopicArns: [
    "arn:aws:sns:us-east-1:123456789012:myTopic1",
    "arn:aws:sns:us-east-1:123456789012:myTopic2"
  ]
});
```

## Customization and Guardrail Policies

Create a SlackChannelConfiguration with customization resource ARNs and guardrail policies for enhanced security.

```ts
const securedSlackChannelConfig = await AWS.Chatbot.SlackChannelConfiguration("securedSlackChannelConfig", {
  SlackWorkspaceId: "T13579246",
  SlackChannelId: "C13579246",
  IamRoleArn: "arn:aws:iam::123456789012:role/mySecuredChatbotRole",
  ConfigurationName: "SecuredSlackBotConfig",
  CustomizationResourceArns: [
    "arn:aws:lambda:us-east-1:123456789012:function:myCustomFunction"
  ],
  GuardrailPolicies: [
    JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "sns:Publish",
          Resource: "arn:aws:sns:us-east-1:123456789012:myTopic1"
        }
      ]
    })
  ]
});
```

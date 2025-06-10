---
title: MicrosoftTeamsChannelConfiguration
description: Learn how to create, update, and manage AWS Chatbot MicrosoftTeamsChannelConfigurations using Alchemy Cloud Control.
---


The MicrosoftTeamsChannelConfiguration resource allows you to configure AWS Chatbot to send notifications and execute commands in Microsoft Teams channels. For more information, refer to the [AWS Chatbot MicrosoftTeamsChannelConfigurations](https://docs.aws.amazon.com/chatbot/latest/userguide/) documentation.

## Minimal Example

This example demonstrates how to create a basic Microsoft Teams channel configuration with required properties and one optional property for logging level.

```ts
import AWS from "alchemy/aws/control";

const teamsChannelConfig = await AWS.Chatbot.MicrosoftTeamsChannelConfiguration("myTeamsChannelConfig", {
  IamRoleArn: "arn:aws:iam::123456789012:role/MyChatbotRole",
  TeamId: "myTeamId",
  ConfigurationName: "MyTeamsChannelConfig",
  TeamsTenantId: "myTenantId",
  TeamsChannelId: "myChannelId",
  UserRoleRequired: true // Optional: Require user role for commands
});
```

## Advanced Configuration

This example shows how to configure a Microsoft Teams channel with multiple optional properties, including SNS topics, guardrail policies, and customization resource ARNs.

```ts
const advancedTeamsChannelConfig = await AWS.Chatbot.MicrosoftTeamsChannelConfiguration("advancedTeamsChannelConfig", {
  IamRoleArn: "arn:aws:iam::123456789012:role/MyChatbotRole",
  TeamId: "myTeamId",
  ConfigurationName: "AdvancedTeamsChannelConfig",
  TeamsTenantId: "myTenantId",
  TeamsChannelId: "myChannelId",
  LoggingLevel: "ERROR", // Optional: Set logging level to ERROR
  SnsTopicArns: [
    "arn:aws:sns:us-east-1:123456789012:myTopic"
  ],
  GuardrailPolicies: [
    JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "lambda:InvokeFunction",
          Resource: "arn:aws:lambda:us-east-1:123456789012:function:myLambdaFunction"
        }
      ]
    })
  ],
  CustomizationResourceArns: [
    "arn:aws:lambda:us-east-1:123456789012:function:myCustomizationFunction"
  ]
});
```

## Configuring Tags

This example demonstrates how to add tags to your Microsoft Teams channel configuration for better resource management.

```ts
const taggedTeamsChannelConfig = await AWS.Chatbot.MicrosoftTeamsChannelConfiguration("taggedTeamsChannelConfig", {
  IamRoleArn: "arn:aws:iam::123456789012:role/MyChatbotRole",
  TeamId: "myTeamId",
  ConfigurationName: "TaggedTeamsChannelConfig",
  TeamsTenantId: "myTenantId",
  TeamsChannelId: "myChannelId",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "ChatbotIntegration" }
  ]
});
```

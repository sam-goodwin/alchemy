---
title: Managing AWS Chatbot MicrosoftTeamsChannelConfigurations with Alchemy
description: Learn how to create, update, and manage AWS Chatbot MicrosoftTeamsChannelConfigurations using Alchemy Cloud Control.
---

# MicrosoftTeamsChannelConfiguration

The MicrosoftTeamsChannelConfiguration resource lets you create and manage [AWS Chatbot MicrosoftTeamsChannelConfigurations](https://docs.aws.amazon.com/chatbot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-chatbot-microsoftteamschannelconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const microsoftteamschannelconfiguration = await AWS.Chatbot.MicrosoftTeamsChannelConfiguration(
  "microsoftteamschannelconfiguration-example",
  {
    IamRoleArn: "example-iamrolearn",
    TeamId: "example-teamid",
    ConfigurationName: "microsoftteamschannelconfiguration-configuration",
    TeamsTenantId: "example-teamstenantid",
    TeamsChannelId: "example-teamschannelid",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a microsoftteamschannelconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMicrosoftTeamsChannelConfiguration =
  await AWS.Chatbot.MicrosoftTeamsChannelConfiguration(
    "advanced-microsoftteamschannelconfiguration",
    {
      IamRoleArn: "example-iamrolearn",
      TeamId: "example-teamid",
      ConfigurationName: "microsoftteamschannelconfiguration-configuration",
      TeamsTenantId: "example-teamstenantid",
      TeamsChannelId: "example-teamschannelid",
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


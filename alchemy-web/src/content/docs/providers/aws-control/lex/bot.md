---
title: Bot
description: Learn how to create, update, and manage AWS Lex Bots using Alchemy Cloud Control.
---


The Bot resource lets you create and manage [AWS Lex Bots](https://docs.aws.amazon.com/lex/latest/userguide/) for building conversational interfaces using voice and text. 

## Minimal Example

Create a basic Lex Bot with minimal configuration, including required properties and one optional setting.

```ts
import AWS from "alchemy/aws/control";

const basicBot = await AWS.Lex.Bot("basicBot", {
  Name: "CustomerSupportBot",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AWSLexBotRole",
  IdleSessionTTLInSeconds: 300,
  DataPrivacy: {
    ChildDirected: false,
    AllowUnencrypted: true
  }
});
```

## Advanced Configuration

Configure a Lex Bot with advanced settings, including multiple locales and auto-building capabilities.

```ts
const advancedBot = await AWS.Lex.Bot("advancedBot", {
  Name: "MultiLangSupportBot",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AWSLexBotRole",
  IdleSessionTTLInSeconds: 300,
  AutoBuildBotLocales: true,
  BotLocales: [
    {
      LocaleId: "en-US",
      NluIntentConfidenceThreshold: 0.8,
      VoiceId: "Joanna",
      BotAlias: "en-US-Prod",
      BotVersion: "$LATEST"
    },
    {
      LocaleId: "es-US",
      NluIntentConfidenceThreshold: 0.8,
      VoiceId: "Penelope",
      BotAlias: "es-US-Prod",
      BotVersion: "$LATEST"
    }
  ],
  DataPrivacy: {
    ChildDirected: false,
    AllowUnencrypted: true
  }
});
```

## Using S3 for Bot Files

Create a Lex Bot that uses an S3 bucket for the bot file location, allowing for easier management of bot definitions.

```ts
const s3LocationBot = await AWS.Lex.Bot("s3LocationBot", {
  Name: "FileBasedBot",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AWSLexBotRole",
  IdleSessionTTLInSeconds: 300,
  BotFileS3Location: {
    Bucket: "my-lex-bot-bucket",
    Key: "bots/file-based-bot.json"
  },
  DataPrivacy: {
    ChildDirected: false,
    AllowUnencrypted: true
  }
});
```

## Test Bot Alias Settings

Configure a Lex Bot with test alias settings for easier development and testing of new features.

```ts
const testAliasBot = await AWS.Lex.Bot("testAliasBot", {
  Name: "TestingBot",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AWSLexBotRole",
  IdleSessionTTLInSeconds: 300,
  TestBotAliasSettings: {
    BotAlias: "testAlias",
    BotVersion: "$LATEST",
    Tags: [
      { Key: "Environment", Value: "Testing" }
    ]
  },
  DataPrivacy: {
    ChildDirected: false,
    AllowUnencrypted: true
  }
});
```

---
title: BotAlias
description: Learn how to create, update, and manage AWS Lex BotAliases using Alchemy Cloud Control.
---


The BotAlias resource allows you to manage [AWS Lex BotAliases](https://docs.aws.amazon.com/lex/latest/userguide/) which are used to define specific configurations for your bots, enabling different versions and settings for your Amazon Lex chatbots.

## Minimal Example

Create a basic BotAlias with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicBotAlias = await AWS.Lex.BotAlias("basicBotAlias", {
  BotId: "myBotId",
  BotAliasName: "myBotAlias",
  BotVersion: "1",
  Description: "This is a basic BotAlias for my bot."
});
```

## Advanced Configuration

Configure a BotAlias with conversation log settings and sentiment analysis.

```ts
const advancedBotAlias = await AWS.Lex.BotAlias("advancedBotAlias", {
  BotId: "myBotId",
  BotAliasName: "myAdvancedBotAlias",
  BotVersion: "1",
  Description: "This BotAlias includes advanced settings.",
  ConversationLogSettings: {
    LogSettings: {
      Enabled: true,
      S3BucketArn: "arn:aws:s3:::my-log-bucket",
      KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/my-key"
    }
  },
  SentimentAnalysisSettings: {
    DetectSentiment: true
  }
});
```

## Locales Configuration

Create a BotAlias with locale-specific settings.

```ts
const localizedBotAlias = await AWS.Lex.BotAlias("localizedBotAlias", {
  BotId: "myBotId",
  BotAliasName: "myLocalizedBotAlias",
  BotVersion: "1",
  BotAliasLocaleSettings: [
    {
      LocaleId: "en_US",
      NluIntentConfidenceThreshold: 0.8
    },
    {
      LocaleId: "es_ES",
      NluIntentConfidenceThreshold: 0.75
    }
  ]
});
```

## Tagging Example

Create a BotAlias and apply tags for better resource management.

```ts
const taggedBotAlias = await AWS.Lex.BotAlias("taggedBotAlias", {
  BotId: "myBotId",
  BotAliasName: "myTaggedBotAlias",
  BotVersion: "1",
  BotAliasTags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "CustomerSupport" }
  ]
});
```

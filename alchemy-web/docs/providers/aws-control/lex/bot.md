---
title: Managing AWS Lex Bots with Alchemy
description: Learn how to create, update, and manage AWS Lex Bots using Alchemy Cloud Control.
---

# Bot

The Bot resource lets you create and manage [AWS Lex Bots](https://docs.aws.amazon.com/lex/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lex-bot.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const bot = await AWS.Lex.Bot("bot-example", {
  IdleSessionTTLInSeconds: 1,
  RoleArn: "example-rolearn",
  Name: "bot-",
  DataPrivacy: "example-dataprivacy",
  Description: "A bot resource managed by Alchemy",
});
```

## Advanced Configuration

Create a bot with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedBot = await AWS.Lex.Bot("advanced-bot", {
  IdleSessionTTLInSeconds: 1,
  RoleArn: "example-rolearn",
  Name: "bot-",
  DataPrivacy: "example-dataprivacy",
  Description: "A bot resource managed by Alchemy",
});
```


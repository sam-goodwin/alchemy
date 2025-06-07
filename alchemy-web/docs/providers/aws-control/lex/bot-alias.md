---
title: Managing AWS Lex BotAliass with Alchemy
description: Learn how to create, update, and manage AWS Lex BotAliass using Alchemy Cloud Control.
---

# BotAlias

The BotAlias resource lets you create and manage [AWS Lex BotAliass](https://docs.aws.amazon.com/lex/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lex-botalias.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const botalias = await AWS.Lex.BotAlias("botalias-example", {
  BotId: "example-botid",
  BotAliasName: "botalias-botalias",
  Description: "A botalias resource managed by Alchemy",
});
```

## Advanced Configuration

Create a botalias with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedBotAlias = await AWS.Lex.BotAlias("advanced-botalias", {
  BotId: "example-botid",
  BotAliasName: "botalias-botalias",
  Description: "A botalias resource managed by Alchemy",
});
```


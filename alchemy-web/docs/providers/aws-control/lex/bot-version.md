---
title: Managing AWS Lex BotVersions with Alchemy
description: Learn how to create, update, and manage AWS Lex BotVersions using Alchemy Cloud Control.
---

# BotVersion

The BotVersion resource lets you create and manage [AWS Lex BotVersions](https://docs.aws.amazon.com/lex/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lex-botversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const botversion = await AWS.Lex.BotVersion("botversion-example", {
  BotId: "example-botid",
  BotVersionLocaleSpecification: [],
  Description: "A botversion resource managed by Alchemy",
});
```

## Advanced Configuration

Create a botversion with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedBotVersion = await AWS.Lex.BotVersion("advanced-botversion", {
  BotId: "example-botid",
  BotVersionLocaleSpecification: [],
  Description: "A botversion resource managed by Alchemy",
});
```


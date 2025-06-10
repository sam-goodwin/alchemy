---
title: BotVersion
description: Learn how to create, update, and manage AWS Lex BotVersions using Alchemy Cloud Control.
---


The BotVersion resource lets you manage [AWS Lex BotVersions](https://docs.aws.amazon.com/lex/latest/userguide/) for building conversational interfaces. You can create and maintain different versions of your bots, allowing for version control and updates without disrupting ongoing interactions.

## Minimal Example

Create a basic Lex BotVersion with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const botVersion = await AWS.Lex.BotVersion("myBotVersion", {
  BotId: "myLexBot",
  Description: "Version 1 of my Lex bot",
  BotVersionLocaleSpecification: [
    {
      LocaleId: "en-US",
      NluIntentConfidenceThreshold: 0.5,
      SampleUtterances: [
        "Hello",
        "Help me with my order"
      ]
    }
  ]
});
```

## Advanced Configuration

Configure a BotVersion with additional locales and a higher confidence threshold.

```ts
const advancedBotVersion = await AWS.Lex.BotVersion("advancedBotVersion", {
  BotId: "myLexBot",
  Description: "Version 2 of my Lex bot with enhanced configurations",
  BotVersionLocaleSpecification: [
    {
      LocaleId: "en-US",
      NluIntentConfidenceThreshold: 0.7,
      SampleUtterances: [
        "What is the status of my order?",
        "Can you assist me?"
      ]
    },
    {
      LocaleId: "es-US",
      NluIntentConfidenceThreshold: 0.6,
      SampleUtterances: [
        "¿Cuál es el estado de mi pedido?",
        "¿Puedes ayudarme?"
      ]
    }
  ]
});
```

## Adoption of Existing Resource

Create a BotVersion while adopting an existing resource if it already exists.

```ts
const adoptedBotVersion = await AWS.Lex.BotVersion("adoptedBotVersion", {
  BotId: "myLexBot",
  Description: "Adopting an existing BotVersion",
  BotVersionLocaleSpecification: [
    {
      LocaleId: "en-US",
      NluIntentConfidenceThreshold: 0.5,
      SampleUtterances: [
        "Where can I find my invoice?",
        "Need assistance with billing"
      ]
    }
  ],
  adopt: true
});
```

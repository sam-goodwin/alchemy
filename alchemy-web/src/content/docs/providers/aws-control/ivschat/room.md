---
title: Room
description: Learn how to create, update, and manage AWS IVSChat Rooms using Alchemy Cloud Control.
---


The Room resource allows you to manage [AWS IVSChat Rooms](https://docs.aws.amazon.com/ivschat/latest/userguide/) for real-time chat applications. This resource provides configuration options for message handling and logging.

## Minimal Example

Create a basic IVSChat Room with a maximum message length and rate:

```ts
import AWS from "alchemy/aws/control";

const chatRoom = await AWS.IVSChat.Room("basicChatRoom", {
  Name: "GeneralChatRoom",
  MaximumMessageLength: 200,
  MaximumMessageRatePerSecond: 5
});
```

## Advanced Configuration

Configure an IVSChat Room with message review handling and logging identifiers:

```ts
const advancedChatRoom = await AWS.IVSChat.Room("advancedChatRoom", {
  Name: "AdvancedChatRoom",
  MaximumMessageLength: 500,
  MaximumMessageRatePerSecond: 10,
  MessageReviewHandler: {
    LambdaFunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:MessageReviewFunction",
    InvocationType: "Event"
  },
  LoggingConfigurationIdentifiers: ["logConfig123"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Application", Value: "ChatApp" }
  ]
});
```

## Resource Adoption

If you want to adopt an existing IVSChat Room instead of failing when it already exists, you can set the `adopt` property:

```ts
const adoptedChatRoom = await AWS.IVSChat.Room("existingChatRoom", {
  Name: "ExistingChatRoom",
  adopt: true // Adopts the existing resource
});
```

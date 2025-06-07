---
title: Managing AWS Pinpoint SMSChannels with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint SMSChannels using Alchemy Cloud Control.
---

# SMSChannel

The SMSChannel resource allows you to manage SMS messaging settings for your AWS Pinpoint applications. For more detailed information, visit the [AWS Pinpoint SMSChannels documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic SMS channel with the required `ApplicationId` property and an optional `Enabled` property to turn on the channel.

```ts
import AWS from "alchemy/aws/control";

const SmsChannel = await AWS.Pinpoint.SMSChannel("MySmsChannel", {
  ApplicationId: "1234567890abcdefg",
  Enabled: true
});
```

## Advanced Configuration

Here’s how to configure an SMS channel with additional parameters like `ShortCode` and `SenderId` for enhanced functionality.

```ts
const AdvancedSmsChannel = await AWS.Pinpoint.SMSChannel("MyAdvancedSmsChannel", {
  ApplicationId: "1234567890abcdefg",
  Enabled: true,
  ShortCode: "12345",
  SenderId: "MySender"
});
```

## Adopt Existing Resource

Use this example to adopt an existing SMS channel instead of creating a new one, which is useful in scenarios where the resource already exists.

```ts
const AdoptedSmsChannel = await AWS.Pinpoint.SMSChannel("MyAdoptedSmsChannel", {
  ApplicationId: "1234567890abcdefg",
  Enabled: true,
  adopt: true
});
```

## Disabling the SMS Channel

This example shows how to disable an existing SMS channel by setting the `Enabled` property to `false`.

```ts
const DisabledSmsChannel = await AWS.Pinpoint.SMSChannel("MyDisabledSmsChannel", {
  ApplicationId: "1234567890abcdefg",
  Enabled: false
});
```
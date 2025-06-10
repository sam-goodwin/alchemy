---
title: ADMChannel
description: Learn how to create, update, and manage AWS Pinpoint ADMChannels using Alchemy Cloud Control.
---


The ADMChannel resource allows you to manage the Amazon Device Messaging (ADM) channel for AWS Pinpoint, enabling you to send messages to your Android applications. For more detailed information, refer to the [AWS Pinpoint ADMChannels documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create a basic ADM channel with required properties, using default settings for optional ones.

```ts
import AWS from "alchemy/aws/control";

const admChannel = await AWS.Pinpoint.ADMChannel("myAdmChannel", {
  ClientId: "myClientId123",
  ClientSecret: "myClientSecret456",
  ApplicationId: "myApplicationId789",
  Enabled: true // Optional property
});
```

## Advanced Configuration

Configure an ADM channel with additional options, such as enabling or disabling the channel.

```ts
const configuredAdmChannel = await AWS.Pinpoint.ADMChannel("configuredAdmChannel", {
  ClientId: "myAdvancedClientId123",
  ClientSecret: "myAdvancedClientSecret456",
  ApplicationId: "myAdvancedApplicationId789",
  Enabled: false // Disabling the channel
});
```

## Resource Adoption

Adopt an existing ADM channel instead of creating a new one, which can be useful in certain deployment scenarios.

```ts
const adoptedAdmChannel = await AWS.Pinpoint.ADMChannel("adoptedAdmChannel", {
  ClientId: "existingClientId123",
  ClientSecret: "existingClientSecret456",
  ApplicationId: "existingApplicationId789",
  adopt: true // Adopting an existing resource
});
```

---
title: SMSChannel
description: Learn how to create, update, and manage AWS Pinpoint SMSChannels using Alchemy Cloud Control.
---


The SMSChannel resource allows you to manage SMS messaging capabilities in [AWS Pinpoint](https://docs.aws.amazon.com/pinpoint/latest/userguide/). This includes configuring settings for sending messages via SMS to your users.

## Minimal Example

Create a basic SMSChannel with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const smsChannel = await AWS.Pinpoint.SMSChannel("mySmsChannel", {
  ApplicationId: "myPinpointApplicationId",
  Enabled: true // Optional: Enable the SMS channel
});
```

## Advanced Configuration

Configure an SMSChannel with additional properties such as SenderId and ShortCode:

```ts
const advancedSmsChannel = await AWS.Pinpoint.SMSChannel("advancedSmsChannel", {
  ApplicationId: "myPinpointApplicationId",
  Enabled: true,
  SenderId: "MyBrand", // Optional: Specify a brand name for SMS
  ShortCode: "12345" // Optional: Specify a short code for SMS
});
```

## Integration with Existing Resources

Adopt an existing SMSChannel instead of failing if it already exists:

```ts
const adoptSmsChannel = await AWS.Pinpoint.SMSChannel("existingSmsChannel", {
  ApplicationId: "myPinpointApplicationId",
  Enabled: true,
  adopt: true // Optional: Adopt existing resource
});
```

## Conditional Configuration

Create an SMSChannel with conditional settings based on a feature flag:

```ts
const isSmsEnabled = true; // Example feature flag

const conditionalSmsChannel = await AWS.Pinpoint.SMSChannel("conditionalSmsChannel", {
  ApplicationId: "myPinpointApplicationId",
  Enabled: isSmsEnabled, // Enable SMS channel based on feature flag
  SenderId: isSmsEnabled ? "MyBrand" : undefined // Optionally set SenderId
});
```

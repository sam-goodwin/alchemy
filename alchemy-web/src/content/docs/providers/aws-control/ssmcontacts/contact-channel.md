---
title: ContactChannel
description: Learn how to create, update, and manage AWS SSMContacts ContactChannels using Alchemy Cloud Control.
---


The ContactChannel resource allows you to manage [AWS SSMContacts ContactChannels](https://docs.aws.amazon.com/ssmcontacts/latest/userguide/) for notifying users through various communication methods.

## Minimal Example

Create a basic contact channel with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicContactChannel = await AWS.SSMContacts.ContactChannel("basicContactChannel", {
  ChannelName: "EmailNotification",
  ChannelAddress: "user@example.com",
  ContactId: "12345678-1234-1234-1234-1234567890ab",
  ChannelType: "EMAIL",
  DeferActivation: false // Optional: Set to true to defer activation
});
```

## Advanced Configuration

Configure a contact channel with defer activation to manage when the channel becomes active:

```ts
const advancedContactChannel = await AWS.SSMContacts.ContactChannel("advancedContactChannel", {
  ChannelName: "SMSNotification",
  ChannelAddress: "+15555551234",
  ContactId: "12345678-1234-1234-1234-1234567890ab",
  ChannelType: "SMS",
  DeferActivation: true, // Optional: Defer activation until explicitly activated
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Integration Use Case

Set up a contact channel for a user that will be used for incident notifications:

```ts
const incidentNotificationChannel = await AWS.SSMContacts.ContactChannel("incidentNotificationChannel", {
  ChannelName: "IncidentAlerts",
  ChannelAddress: "alertuser@example.com",
  ContactId: "12345678-1234-1234-1234-1234567890cd",
  ChannelType: "EMAIL",
  DeferActivation: false // Set to false for immediate activation
});
```

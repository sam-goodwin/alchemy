---
title: APNSVoipChannel
description: Learn how to create, update, and manage AWS Pinpoint APNSVoipChannels using Alchemy Cloud Control.
---


The APNSVoipChannel resource enables you to manage the Apple Push Notification service (APNs) VOIP channel for AWS Pinpoint. This service allows you to send notifications to iOS devices for VoIP applications. For more detailed information, you can refer to the [AWS Pinpoint APNSVoipChannels documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create a basic APNSVoipChannel with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const apnsVoipChannel = await AWS.Pinpoint.APNSVoipChannel("myAPNSVoipChannel", {
  ApplicationId: "myApplicationId",
  BundleId: "com.mycompany.myapp",
  PrivateKey: "myPrivateKey",
  Enabled: true
});
```

## Advanced Configuration

Configure an APNSVoipChannel with additional authentication methods and team ID.

```ts
const advancedApnsVoipChannel = await AWS.Pinpoint.APNSVoipChannel("advancedAPNSVoipChannel", {
  ApplicationId: "myApplicationId",
  BundleId: "com.mycompany.myapp",
  PrivateKey: "myPrivateKey",
  Enabled: true,
  DefaultAuthenticationMethod: "key",
  TokenKey: "myTokenKey",
  TokenKeyId: "myTokenKeyId",
  TeamId: "myTeamId"
});
```

## Enable and Disable Channel

Demonstrate how to enable and disable the APNSVoipChannel.

```ts
const toggleApnsVoipChannel = await AWS.Pinpoint.APNSVoipChannel("toggleAPNSVoipChannel", {
  ApplicationId: "myApplicationId",
  BundleId: "com.mycompany.myapp",
  PrivateKey: "myPrivateKey",
  Enabled: false // Initially disabled
});

// Later on, enable the channel
toggleApnsVoipChannel.props.Enabled = true;
```

## Using Adopt Feature

Show how to create an APNSVoipChannel while adopting an existing resource.

```ts
const adoptApnsVoipChannel = await AWS.Pinpoint.APNSVoipChannel("adoptAPNSVoipChannel", {
  ApplicationId: "myApplicationId",
  BundleId: "com.mycompany.myapp",
  PrivateKey: "myPrivateKey",
  adopt: true // Adopt existing resource instead of failing
});
```

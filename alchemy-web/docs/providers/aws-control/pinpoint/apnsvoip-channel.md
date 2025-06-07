---
title: Managing AWS Pinpoint APNSVoipChannels with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint APNSVoipChannels using Alchemy Cloud Control.
---

# APNSVoipChannel

The APNSVoipChannel resource allows you to manage the Apple Push Notification Service (APNS) VoIP channels for AWS Pinpoint. This resource enables you to send real-time notifications to your iOS applications. For more details, see the [AWS Pinpoint APNSVoipChannels documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create an APNS VoIP channel with the required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const apnsVoipChannel = await AWS.Pinpoint.APNSVoipChannel("MyAPNSVoipChannel", {
  ApplicationId: "my-application-id",
  BundleId: "com.mycompany.myapp",
  PrivateKey: "my-private-key",
  Certificate: "my-certificate"
});
```

## Advanced Configuration

Configure an APNS VoIP channel with additional properties for enhanced functionality.

```ts
const advancedAPNSVoipChannel = await AWS.Pinpoint.APNSVoipChannel("AdvancedAPNSVoipChannel", {
  ApplicationId: "my-application-id",
  BundleId: "com.mycompany.myapp",
  PrivateKey: "my-private-key",
  Certificate: "my-certificate",
  Enabled: true,
  DefaultAuthenticationMethod: "key",
  TokenKey: "my-token-key",
  TokenKeyId: "my-token-key-id",
  TeamId: "my-team-id"
});
```

## Adoption of Existing Resource

If you want to adopt an existing APNS VoIP channel instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const adoptExistingAPNSVoipChannel = await AWS.Pinpoint.APNSVoipChannel("ExistingAPNSVoipChannel", {
  ApplicationId: "my-application-id",
  BundleId: "com.mycompany.myapp",
  PrivateKey: "my-private-key",
  Certificate: "my-certificate",
  adopt: true
});
```
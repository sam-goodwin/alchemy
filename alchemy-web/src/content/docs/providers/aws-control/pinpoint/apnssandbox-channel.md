---
title: APNSSandboxChannel
description: Learn how to create, update, and manage AWS Pinpoint APNSSandboxChannels using Alchemy Cloud Control.
---


The APNSSandboxChannel resource allows you to manage the Apple Push Notification service (APNs) sandbox channel in AWS Pinpoint. This enables you to send push notifications to iOS devices for testing purposes. For more information, refer to the [AWS Pinpoint APNSSandboxChannels documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create a basic APNSSandboxChannel with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const apnsSandboxChannel = await AWS.Pinpoint.APNSSandboxChannel("MyAPNSSandboxChannel", {
  ApplicationId: "your-application-id",
  BundleId: "com.example.app",
  Certificate: "YOUR_CERTIFICATE_CONTENT",
  PrivateKey: "YOUR_PRIVATE_KEY_CONTENT",
  Enabled: true
});
```

## Advanced Configuration

Configure an APNSSandboxChannel with additional security settings and authentication methods.

```ts
const advancedApnsSandboxChannel = await AWS.Pinpoint.APNSSandboxChannel("AdvancedAPNSSandboxChannel", {
  ApplicationId: "your-application-id",
  BundleId: "com.example.app",
  Certificate: "YOUR_CERTIFICATE_CONTENT",
  PrivateKey: "YOUR_PRIVATE_KEY_CONTENT",
  Enabled: true,
  DefaultAuthenticationMethod: "key",
  TeamId: "YOUR_TEAM_ID",
  TokenKey: "YOUR_TOKEN_KEY_CONTENT",
  TokenKeyId: "YOUR_TOKEN_KEY_ID"
});
```

## Example with Resource Adoption

Adopt an existing APNSSandboxChannel resource instead of failing if it already exists.

```ts
const adoptedApnsSandboxChannel = await AWS.Pinpoint.APNSSandboxChannel("AdoptedAPNSSandboxChannel", {
  ApplicationId: "your-application-id",
  BundleId: "com.example.app",
  Certificate: "YOUR_CERTIFICATE_CONTENT",
  PrivateKey: "YOUR_PRIVATE_KEY_CONTENT",
  Enabled: true,
  adopt: true // Allows adopting existing resource
});
```

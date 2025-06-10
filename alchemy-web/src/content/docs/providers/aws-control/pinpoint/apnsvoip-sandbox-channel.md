---
title: APNSVoipSandboxChannel
description: Learn how to create, update, and manage AWS Pinpoint APNSVoipSandboxChannels using Alchemy Cloud Control.
---


The APNSVoipSandboxChannel resource allows you to configure and manage the Apple Push Notification service (APNS) VoIP sandbox channel for AWS Pinpoint applications. This enables you to send notifications to users of your iOS applications. For more detailed information, refer to the [AWS Pinpoint APNSVoipSandboxChannels documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create a basic APNS VoIP sandbox channel with required properties and a couple of optional settings.

```ts
import AWS from "alchemy/aws/control";

const apnsVoipSandboxChannel = await AWS.Pinpoint.APNSVoipSandboxChannel("myApnsVoipSandboxChannel", {
  ApplicationId: "12345678-1234-1234-1234-123456789012",
  BundleId: "com.example.myapp",
  Certificate: "-----BEGIN CERTIFICATE-----\n...certificate data...\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\n...private key data...\n-----END PRIVATE KEY-----",
  Enabled: true
});
```

## Advanced Configuration

Configure an APNS VoIP sandbox channel with additional advanced settings such as a team ID and token key.

```ts
const advancedApnsVoipSandboxChannel = await AWS.Pinpoint.APNSVoipSandboxChannel("advancedApnsVoipSandboxChannel", {
  ApplicationId: "12345678-1234-1234-1234-123456789012",
  BundleId: "com.example.myapp",
  Certificate: "-----BEGIN CERTIFICATE-----\n...certificate data...\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\n...private key data...\n-----END PRIVATE KEY-----",
  Enabled: true,
  TeamId: "ABCDEFG123",
  TokenKey: "your-token-key",
  TokenKeyId: "your-token-key-id",
  DefaultAuthenticationMethod: "key"
});
```

## Example with Adopt Option

Create an APNS VoIP sandbox channel while adopting existing resources, which is useful in scenarios where you want to avoid failures due to pre-existing resources.

```ts
const adoptApnsVoipSandboxChannel = await AWS.Pinpoint.APNSVoipSandboxChannel("adoptApnsVoipSandboxChannel", {
  ApplicationId: "12345678-1234-1234-1234-123456789012",
  BundleId: "com.example.myapp",
  Certificate: "-----BEGIN CERTIFICATE-----\n...certificate data...\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\n...private key data...\n-----END PRIVATE KEY-----",
  Enabled: true,
  adopt: true
});
```

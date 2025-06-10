---
title: APNSChannel
description: Learn how to create, update, and manage AWS Pinpoint APNSChannels using Alchemy Cloud Control.
---


The APNSChannel resource allows you to manage the Apple Push Notification Service (APNS) channels within AWS Pinpoint, enabling you to send notifications to iOS devices. For more details, refer to the [AWS Pinpoint APNSChannels documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create a basic APNSChannel with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const apnsChannel = await AWS.Pinpoint.APNSChannel("myApnsChannel", {
  ApplicationId: "abc123def456",
  BundleId: "com.example.myapp",
  Certificate: "-----BEGIN CERTIFICATE-----\nYOUR_CERTIFICATE_DATA\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_DATA\n-----END PRIVATE KEY-----",
  Enabled: true
});
```

## Advanced Configuration

Configure an APNSChannel with additional security settings, including token-based authentication.

```ts
const advancedApnsChannel = await AWS.Pinpoint.APNSChannel("advancedApnsChannel", {
  ApplicationId: "abc123def456",
  BundleId: "com.example.myapp",
  TokenKey: "YOUR_TOKEN_KEY_DATA",
  TokenKeyId: "YOUR_TOKEN_KEY_ID",
  TeamId: "YOUR_TEAM_ID",
  DefaultAuthenticationMethod: "TOKEN",
  Enabled: true
});
```

## Development Mode

Set up an APNSChannel for development purposes, allowing for testing notifications without affecting production.

```ts
const devApnsChannel = await AWS.Pinpoint.APNSChannel("devApnsChannel", {
  ApplicationId: "abc123def456",
  BundleId: "com.example.myapp",
  Certificate: "-----BEGIN CERTIFICATE-----\nYOUR_DEV_CERTIFICATE_DATA\n-----END CERTIFICATE-----",
  PrivateKey: "-----BEGIN PRIVATE KEY-----\nYOUR_DEV_PRIVATE_KEY_DATA\n-----END PRIVATE KEY-----",
  Enabled: true,
  adopt: true // Adopt existing resource if it already exists
});
```

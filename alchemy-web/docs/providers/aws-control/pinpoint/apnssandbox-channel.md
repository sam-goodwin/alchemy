---
title: Managing AWS Pinpoint APNSSandboxChannels with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint APNSSandboxChannels using Alchemy Cloud Control.
---

# APNSSandboxChannel

The APNSSandboxChannel resource allows you to configure the Apple Push Notification Service (APNS) sandbox channel for your AWS Pinpoint application. This resource is essential for sending notifications to iOS devices during the development phase. For more information, refer to the [AWS Pinpoint APNSSandboxChannels documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create a basic APNSSandboxChannel with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const MyAPNSSandboxChannel = await AWS.Pinpoint.APNSSandboxChannel("MyAPNSSandboxChannel", {
  ApplicationId: "my-application-id",
  BundleId: "com.example.myapp",
  Certificate: "my-certificate-content",
  PrivateKey: "my-private-key-content",
  Enabled: true
});
```

## Advanced Configuration

Configure the APNSSandboxChannel with additional settings, including a default authentication method and team ID.

```ts
const AdvancedAPNSSandboxChannel = await AWS.Pinpoint.APNSSandboxChannel("AdvancedAPNSSandboxChannel", {
  ApplicationId: "my-application-id",
  BundleId: "com.example.myapp",
  Certificate: "my-certificate-content",
  PrivateKey: "my-private-key-content",
  Enabled: true,
  DefaultAuthenticationMethod: "key", // or "certificate"
  TeamId: "my-team-id"
});
```

## Token-Based Authentication

Create an APNSSandboxChannel that utilizes token-based authentication with a token key and token key ID.

```ts
const TokenBasedAPNSSandboxChannel = await AWS.Pinpoint.APNSSandboxChannel("TokenBasedAPNSSandboxChannel", {
  ApplicationId: "my-application-id",
  TokenKey: "my-token-key",
  TokenKeyId: "my-token-key-id",
  Enabled: true
});
```

## Adoption of Existing Resource

If you need to adopt an existing APNSSandboxChannel instead of failing when it already exists, you can set the adopt property to true.

```ts
const AdoptExistingAPNSSandboxChannel = await AWS.Pinpoint.APNSSandboxChannel("AdoptExistingAPNSSandboxChannel", {
  ApplicationId: "my-application-id",
  BundleId: "com.example.myapp",
  Certificate: "my-certificate-content",
  PrivateKey: "my-private-key-content",
  Enabled: true,
  adopt: true
});
```
---
title: GCMChannel
description: Learn how to create, update, and manage AWS Pinpoint GCMChannels using Alchemy Cloud Control.
---


The GCMChannel resource lets you manage [AWS Pinpoint GCMChannels](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for sending push notifications to Android devices.

## Minimal Example

Create a basic GCMChannel with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const gcmChannel = await AWS.Pinpoint.GCMChannel("MyGCMChannel", {
  ApplicationId: "my-pinpoint-application-id",
  ApiKey: "my-gcm-api-key",
  Enabled: true
});
```

## Advanced Configuration

Configure a GCMChannel with more advanced options such as service JSON and authentication method.

```ts
const advancedGcmChannel = await AWS.Pinpoint.GCMChannel("AdvancedGCMChannel", {
  ApplicationId: "my-pinpoint-application-id",
  ApiKey: "my-gcm-api-key",
  Enabled: true,
  ServiceJson: JSON.stringify({
    project_number: "123456789012",
    api_key: "my-api-key"
  }),
  DefaultAuthenticationMethod: "API_KEY"
});
```

## Adoption of Existing Resource

If you want to adopt an existing GCMChannel instead of creating a new one, you can set the adopt property to true.

```ts
const adoptedGcmChannel = await AWS.Pinpoint.GCMChannel("AdoptedGCMChannel", {
  ApplicationId: "my-pinpoint-application-id",
  ApiKey: "my-gcm-api-key",
  Enabled: true,
  adopt: true // Adopts existing resource
});
```

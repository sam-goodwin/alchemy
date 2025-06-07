---
title: Managing AWS Pinpoint GCMChannels with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint GCMChannels using Alchemy Cloud Control.
---

# GCMChannel

The GCMChannel resource lets you manage the Google Cloud Messaging (GCM) channel for AWS Pinpoint, enabling you to send push notifications to Android devices. For more details, refer to the [AWS Pinpoint GCMChannels documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create a basic GCM channel with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const gcmChannel = await AWS.Pinpoint.GCMChannel("MyGCMChannel", {
  ApiKey: "AIzaSyD-YourAPIKeyHere",
  Enabled: true,
  ApplicationId: "my-pinpoint-app-id"
});
```

## Advanced Configuration

Configure a GCM channel with additional properties including service JSON and default authentication method.

```ts
const advancedGcmChannel = await AWS.Pinpoint.GCMChannel("AdvancedGCMChannel", {
  ApiKey: "AIzaSyD-YourAPIKeyHere",
  Enabled: true,
  ApplicationId: "my-pinpoint-app-id",
  ServiceJson: JSON.stringify({
    someKey: "someValue"
  }),
  DefaultAuthenticationMethod: "API_KEY"
});
```

## Adoption of Existing Resource

Create a GCM channel that adopts an existing resource instead of failing if it already exists.

```ts
const adoptGcmChannel = await AWS.Pinpoint.GCMChannel("AdoptedGCMChannel", {
  ApiKey: "AIzaSyD-YourAPIKeyHere",
  ApplicationId: "my-pinpoint-app-id",
  adopt: true
});
```
---
title: EmailChannel
description: Learn how to create, update, and manage AWS Pinpoint EmailChannels using Alchemy Cloud Control.
---


The EmailChannel resource lets you manage [AWS Pinpoint EmailChannels](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for sending emails to users through your applications.

## Minimal Example

Create a basic EmailChannel with the required properties.

```ts
import AWS from "alchemy/aws/control";

const emailChannel = await AWS.Pinpoint.EmailChannel("myEmailChannel", {
  ApplicationId: "12345678-abcd-1234-abcd-1234567890ab",
  FromAddress: "noreply@example.com",
  Identity: "identity@example.com",
  Enabled: true
});
```

## Advanced Configuration

Configure an EmailChannel with additional properties such as a configuration set and orchestration sending role ARN.

```ts
const advancedEmailChannel = await AWS.Pinpoint.EmailChannel("advancedEmailChannel", {
  ApplicationId: "12345678-abcd-1234-abcd-1234567890ab",
  FromAddress: "noreply@example.com",
  Identity: "identity@example.com",
  ConfigurationSet: "myConfigurationSet",
  OrchestrationSendingRoleArn: "arn:aws:iam::123456789012:role/myOrchestrationRole",
  Enabled: true
});
```

## Adoption of Existing Resources

If you want to adopt an existing EmailChannel instead of failing, use the `adopt` property.

```ts
const adoptEmailChannel = await AWS.Pinpoint.EmailChannel("adoptEmailChannel", {
  ApplicationId: "12345678-abcd-1234-abcd-1234567890ab",
  FromAddress: "noreply@example.com",
  Identity: "identity@example.com",
  adopt: true
});
```

## Disabling the Email Channel

To temporarily disable an EmailChannel while retaining its configuration, set the `Enabled` property to false.

```ts
const disabledEmailChannel = await AWS.Pinpoint.EmailChannel("disabledEmailChannel", {
  ApplicationId: "12345678-abcd-1234-abcd-1234567890ab",
  FromAddress: "noreply@example.com",
  Identity: "identity@example.com",
  Enabled: false
});
```

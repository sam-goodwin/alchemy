---
title: Managing AWS Pinpoint ADMChannels with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint ADMChannels using Alchemy Cloud Control.
---

# ADMChannel

The ADMChannel resource lets you create and manage [AWS Pinpoint ADMChannels](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-admchannel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const admchannel = await AWS.Pinpoint.ADMChannel("admchannel-example", {
  ClientSecret: "example-clientsecret",
  ClientId: "example-clientid",
  ApplicationId: "example-applicationid",
});
```


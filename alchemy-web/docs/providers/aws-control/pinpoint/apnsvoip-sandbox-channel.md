---
title: Managing AWS Pinpoint APNSVoipSandboxChannels with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint APNSVoipSandboxChannels using Alchemy Cloud Control.
---

# APNSVoipSandboxChannel

The APNSVoipSandboxChannel resource lets you create and manage [AWS Pinpoint APNSVoipSandboxChannels](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-apnsvoipsandboxchannel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const apnsvoipsandboxchannel = await AWS.Pinpoint.APNSVoipSandboxChannel(
  "apnsvoipsandboxchannel-example",
  { ApplicationId: "example-applicationid" }
);
```


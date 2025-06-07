---
title: Managing AWS Pinpoint APNSChannels with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint APNSChannels using Alchemy Cloud Control.
---

# APNSChannel

The APNSChannel resource lets you create and manage [AWS Pinpoint APNSChannels](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-apnschannel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const apnschannel = await AWS.Pinpoint.APNSChannel("apnschannel-example", {
  ApplicationId: "example-applicationid",
});
```


---
title: Managing AWS Pinpoint EmailChannels with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint EmailChannels using Alchemy Cloud Control.
---

# EmailChannel

The EmailChannel resource lets you create and manage [AWS Pinpoint EmailChannels](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-emailchannel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const emailchannel = await AWS.Pinpoint.EmailChannel("emailchannel-example", {
  FromAddress: "example-fromaddress",
  ApplicationId: "example-applicationid",
  Identity: "example-identity",
});
```


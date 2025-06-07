---
title: Managing AWS Pinpoint BaiduChannels with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint BaiduChannels using Alchemy Cloud Control.
---

# BaiduChannel

The BaiduChannel resource lets you create and manage [AWS Pinpoint BaiduChannels](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-baiduchannel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const baiduchannel = await AWS.Pinpoint.BaiduChannel("baiduchannel-example", {
  SecretKey: "example-secretkey",
  ApiKey: "example-apikey",
  ApplicationId: "example-applicationid",
});
```


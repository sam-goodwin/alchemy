---
title: BaiduChannel
description: Learn how to create, update, and manage AWS Pinpoint BaiduChannels using Alchemy Cloud Control.
---


The BaiduChannel resource allows you to manage [AWS Pinpoint BaiduChannels](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for sending push notifications to users on Baidu.

## Minimal Example

This example demonstrates how to create a basic BaiduChannel with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const baiduChannel = await AWS.Pinpoint.BaiduChannel("myBaiduChannel", {
  ApiKey: "your-baidu-api-key",
  SecretKey: "your-baidu-secret-key",
  ApplicationId: "your-application-id",
  Enabled: true // Optional: Enables the channel
});
```

## Advanced Configuration

In this example, we show how to create a BaiduChannel while adopting an existing resource if it already exists.

```ts
const existingBaiduChannel = await AWS.Pinpoint.BaiduChannel("existingBaiduChannel", {
  ApiKey: "your-baidu-api-key",
  SecretKey: "your-baidu-secret-key",
  ApplicationId: "your-application-id",
  adopt: true // Optional: Adopt existing resource instead of failing
});
```

## Sending Notifications

This example showcases how to configure a BaiduChannel to send notifications, demonstrating how it integrates into the broader AWS Pinpoint service.

```ts
const notification = await AWS.Pinpoint.Notification("myNotification", {
  ApplicationId: "your-application-id",
  Message: {
    Action: "OPEN_APP",
    Title: "Welcome!",
    Body: "Thanks for joining us!",
    SilentPush: false
  },
  Target: {
    ChannelType: "BAIDU",
    UserId: "user-id-123"
  }
});
```

---
title: ApplicationSettings
description: Learn how to create, update, and manage AWS Pinpoint ApplicationSettingss using Alchemy Cloud Control.
---


The ApplicationSettings resource allows you to manage the settings for an [AWS Pinpoint application](https://docs.aws.amazon.com/pinpoint/latest/userguide/). This includes configuring limits, enabling CloudWatch metrics, and setting quiet times for campaigns.

## Minimal Example

Create a basic ApplicationSettings resource with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const appSettings = await AWS.Pinpoint.ApplicationSettings("myAppSettings", {
  ApplicationId: "abcdefg1234567",
  QuietTime: {
    Start: "22:00",
    End: "06:00"
  }
});
```

## Advanced Configuration

Configure ApplicationSettings with additional options such as CloudWatch metrics and campaign hooks.

```ts
const advancedAppSettings = await AWS.Pinpoint.ApplicationSettings("advancedAppSettings", {
  ApplicationId: "abcdefg1234567",
  CloudWatchMetricsEnabled: true,
  CampaignHook: {
    LambdaFunctionName: "myCampaignHookFunction",
    Mode: "FILTER",
    WebUrl: "https://my-webhook-url.com"
  },
  Limits: {
    Daily: 1000,
    Total: 5000
  }
});
```

## Setting Campaign Limits

In this example, we set specific limits for campaigns within the application settings.

```ts
const limitAppSettings = await AWS.Pinpoint.ApplicationSettings("limitAppSettings", {
  ApplicationId: "abcdefg1234567",
  Limits: {
    Daily: 500,
    Total: 2000
  }
});
```

## Configuring Quiet Time

This example demonstrates how to configure a quiet time for campaigns to avoid sending messages during specific hours.

```ts
const quietTimeSettings = await AWS.Pinpoint.ApplicationSettings("quietTimeSettings", {
  ApplicationId: "abcdefg1234567",
  QuietTime: {
    Start: "23:00",
    End: "07:00"
  }
});
```

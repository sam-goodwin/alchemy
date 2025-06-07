---
title: Managing AWS KinesisAnalyticsV2 ApplicationCloudWatchLoggingOptions with Alchemy
description: Learn how to create, update, and manage AWS KinesisAnalyticsV2 ApplicationCloudWatchLoggingOptions using Alchemy Cloud Control.
---

# ApplicationCloudWatchLoggingOption

The ApplicationCloudWatchLoggingOption resource lets you create and manage [AWS KinesisAnalyticsV2 ApplicationCloudWatchLoggingOptions](https://docs.aws.amazon.com/kinesisanalyticsv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationcloudwatchloggingoption.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const applicationcloudwatchloggingoption =
  await AWS.KinesisAnalyticsV2.ApplicationCloudWatchLoggingOption(
    "applicationcloudwatchloggingoption-example",
    {
      ApplicationName: "applicationcloudwatchloggingoption-application",
      CloudWatchLoggingOption: "example-cloudwatchloggingoption",
    }
  );
```


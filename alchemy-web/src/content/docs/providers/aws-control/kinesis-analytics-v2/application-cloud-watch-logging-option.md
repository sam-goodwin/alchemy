---
title: ApplicationCloudWatchLoggingOption
description: Learn how to create, update, and manage AWS KinesisAnalyticsV2 ApplicationCloudWatchLoggingOptions using Alchemy Cloud Control.
---


The ApplicationCloudWatchLoggingOption resource lets you manage the CloudWatch logging options for your AWS Kinesis Analytics V2 applications, enabling you to configure logging settings for monitoring application performance and behavior. For more details, refer to the official AWS documentation: [AWS KinesisAnalyticsV2 ApplicationCloudWatchLoggingOptions](https://docs.aws.amazon.com/kinesisanalyticsv2/latest/userguide/).

## Minimal Example

Create a basic CloudWatch logging option for a Kinesis Analytics V2 application with required properties.

```ts
import AWS from "alchemy/aws/control";

const loggingOption = await AWS.KinesisAnalyticsV2.ApplicationCloudWatchLoggingOption("basicLoggingOption", {
  ApplicationName: "MyKinesisApplication",
  CloudWatchLoggingOption: {
    LogStreamARN: "arn:aws:logs:us-west-2:123456789012:log-group:MyLogGroup:log-stream:MyLogStream",
    RoleARN: "arn:aws:iam::123456789012:role/service-role/MyKinesisAnalyticsRole"
  },
  adopt: false // Default is false
});
```

## Advanced Configuration

Configure a CloudWatch logging option with additional settings for enhanced logging capabilities.

```ts
const advancedLoggingOption = await AWS.KinesisAnalyticsV2.ApplicationCloudWatchLoggingOption("advancedLoggingOption", {
  ApplicationName: "AdvancedKinesisApplication",
  CloudWatchLoggingOption: {
    LogStreamARN: "arn:aws:logs:us-east-1:123456789012:log-group:AdvancedLogGroup:log-stream:AdvancedLogStream",
    RoleARN: "arn:aws:iam::123456789012:role/service-role/AdvancedKinesisAnalyticsRole"
  },
  adopt: true // Adopt existing resource if it exists
});
```

## Updating Logging Options

Update an existing CloudWatch logging option for an application.

```ts
const updateLoggingOption = await AWS.KinesisAnalyticsV2.ApplicationCloudWatchLoggingOption("updateLoggingOption", {
  ApplicationName: "MyKinesisApplication",
  CloudWatchLoggingOption: {
    LogStreamARN: "arn:aws:logs:us-west-2:123456789012:log-group:UpdatedLogGroup:log-stream:UpdatedLogStream",
    RoleARN: "arn:aws:iam::123456789012:role/service-role/UpdatedKinesisAnalyticsRole"
  },
  adopt: false
});
```

---
title: SlackChannelConfiguration
description: Learn how to create, update, and manage AWS SupportApp SlackChannelConfigurations using Alchemy Cloud Control.
---


The SlackChannelConfiguration resource allows you to manage Slack channel configurations for AWS SupportApp, enabling notifications for case updates. For more information, refer to the [AWS SupportApp SlackChannelConfigurations documentation](https://docs.aws.amazon.com/supportapp/latest/userguide/).

## Minimal Example

Create a basic Slack channel configuration that notifies on case severity:

```ts
import AWS from "alchemy/aws/control";

const slackChannelConfig = await AWS.SupportApp.SlackChannelConfiguration("basicSlackChannelConfig", {
  ChannelName: "aws-support-updates",
  ChannelRoleArn: "arn:aws:iam::123456789012:role/SlackChannelRole",
  NotifyOnCaseSeverity: "high",
  TeamId: "T1234567890",
  ChannelId: "C1234567890"
});
```

## Advanced Configuration

Configure a Slack channel with multiple notification settings:

```ts
const advancedSlackChannelConfig = await AWS.SupportApp.SlackChannelConfiguration("advancedSlackChannelConfig", {
  ChannelName: "aws-support-team",
  ChannelRoleArn: "arn:aws:iam::123456789012:role/SlackChannelRole",
  NotifyOnCaseSeverity: "all",
  TeamId: "T0987654321",
  ChannelId: "C0987654321",
  NotifyOnAddCorrespondenceToCase: true,
  NotifyOnResolveCase: true,
  NotifyOnCreateOrReopenCase: true
});
```

## Use Case: Adopting Existing Resources

If you need to adopt an existing Slack channel configuration without failing, you can specify the `adopt` property:

```ts
const adoptExistingSlackChannelConfig = await AWS.SupportApp.SlackChannelConfiguration("adoptExistingSlackChannelConfig", {
  ChannelName: "existing-slack-channel",
  ChannelRoleArn: "arn:aws:iam::123456789012:role/SlackChannelRole",
  NotifyOnCaseSeverity: "medium",
  TeamId: "T1122334455",
  ChannelId: "C1122334455",
  adopt: true // This will adopt the existing resource instead of failing
});
```

---
title: Managing AWS SupportApp SlackChannelConfigurations with Alchemy
description: Learn how to create, update, and manage AWS SupportApp SlackChannelConfigurations using Alchemy Cloud Control.
---

# SlackChannelConfiguration

The SlackChannelConfiguration resource allows you to manage the configuration of Slack channels for AWS SupportApp, enabling seamless integration between AWS Support and your Slack workspace. For more information, refer to the [AWS SupportApp SlackChannelConfigurations documentation](https://docs.aws.amazon.com/supportapp/latest/userguide/).

## Minimal Example

Create a basic Slack channel configuration with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicSlackChannelConfig = await AWS.SupportApp.SlackChannelConfiguration("BasicSlackChannel", {
  ChannelName: "AWSSupport",
  ChannelRoleArn: "arn:aws:iam::123456789012:role/SlackChannelRole",
  ChannelId: "C12345678",
  TeamId: "T12345678",
  NotifyOnCaseSeverity: "high",
  NotifyOnCreateOrReopenCase: true
});
```

## Advanced Configuration

Configure a Slack channel with advanced notification settings for case updates.

```ts
const AdvancedSlackChannelConfig = await AWS.SupportApp.SlackChannelConfiguration("AdvancedSlackChannel", {
  ChannelName: "AWSDevOps",
  ChannelRoleArn: "arn:aws:iam::123456789012:role/SlackChannelRole",
  ChannelId: "C87654321",
  TeamId: "T87654321",
  NotifyOnCaseSeverity: "medium",
  NotifyOnAddCorrespondenceToCase: true,
  NotifyOnResolveCase: true
});
```

## Resource Adoption

Create a Slack channel configuration while adopting an existing resource if it already exists.

```ts
const AdoptedSlackChannelConfig = await AWS.SupportApp.SlackChannelConfiguration("AdoptedSlackChannel", {
  ChannelName: "AWSAdoption",
  ChannelRoleArn: "arn:aws:iam::123456789012:role/SlackChannelRole",
  ChannelId: "C11223344",
  TeamId: "T11223344",
  NotifyOnCaseSeverity: "low",
  adopt: true
});
```

## Notifications Configuration

Set up a channel configuration that focuses on notification preferences.

```ts
const NotificationsSlackChannelConfig = await AWS.SupportApp.SlackChannelConfiguration("NotificationsSlackChannel", {
  ChannelName: "AWSNotifications",
  ChannelRoleArn: "arn:aws:iam::123456789012:role/SlackChannelRole",
  ChannelId: "C33445566",
  TeamId: "T33445566",
  NotifyOnCaseSeverity: "critical",
  NotifyOnCreateOrReopenCase: true,
  NotifyOnAddCorrespondenceToCase: false,
  NotifyOnResolveCase: true
});
```
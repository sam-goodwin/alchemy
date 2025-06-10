---
title: NotificationRule
description: Learn how to create, update, and manage AWS CodeStarNotifications NotificationRules using Alchemy Cloud Control.
---


The NotificationRule resource lets you manage [AWS CodeStarNotifications NotificationRules](https://docs.aws.amazon.com/codestarnotifications/latest/userguide/) for monitoring events and sending notifications based on specific triggers.

## Minimal Example

Create a basic notification rule with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicNotificationRule = await AWS.CodeStarNotifications.NotificationRule("basicNotificationRule", {
  EventTypeIds: ["codecommit:ReferenceCreated"],
  DetailType: "full",
  Resource: "arn:aws:codestar:us-east-1:123456789012:project/my-project",
  Targets: [{
    TargetAddress: "example@example.com",
    TargetType: "SNS"
  }],
  Name: "BasicNotificationRule"
});
```

## Advanced Configuration

Configure a notification rule with additional options such as tags and custom status.

```ts
const advancedNotificationRule = await AWS.CodeStarNotifications.NotificationRule("advancedNotificationRule", {
  EventTypeIds: ["codecommit:ReferenceCreated", "codebuild:BuildStateChanged"],
  DetailType: "full",
  Resource: "arn:aws:codestar:us-east-1:123456789012:project/my-advanced-project",
  Targets: [{
    TargetAddress: "arn:aws:sns:us-east-1:123456789012:my-sns-topic",
    TargetType: "SNS"
  }],
  Tags: {
    Environment: "Production",
    Project: "MyAdvancedProject"
  },
  Status: "ACTIVE",
  Name: "AdvancedNotificationRule"
});
```

## Custom Notification Target

Set up a notification rule targeting a Slack channel using a webhook.

```ts
const slackNotificationRule = await AWS.CodeStarNotifications.NotificationRule("slackNotificationRule", {
  EventTypeIds: ["codecommit:ReferenceCreated"],
  DetailType: "full",
  Resource: "arn:aws:codestar:us-east-1:123456789012:project/my-slack-project",
  Targets: [{
    TargetAddress: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    TargetType: "Webhook"
  }],
  Name: "SlackNotificationRule"
});
```

## Notification Rule with Multiple Targets

Create a notification rule that sends alerts to both an SNS topic and an email address.

```ts
const multiTargetNotificationRule = await AWS.CodeStarNotifications.NotificationRule("multiTargetNotificationRule", {
  EventTypeIds: ["codedeploy:DeploymentSuccess"],
  DetailType: "full",
  Resource: "arn:aws:codestar:us-east-1:123456789012:project/my-multi-target-project",
  Targets: [
    {
      TargetAddress: "arn:aws:sns:us-east-1:123456789012:my-sns-topic",
      TargetType: "SNS"
    },
    {
      TargetAddress: "example@example.com",
      TargetType: "Email"
    }
  ],
  Name: "MultiTargetNotificationRule"
});
```

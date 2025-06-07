---
title: Managing AWS CodeStarNotifications NotificationRules with Alchemy
description: Learn how to create, update, and manage AWS CodeStarNotifications NotificationRules using Alchemy Cloud Control.
---

# NotificationRule

The NotificationRule resource lets you manage [AWS CodeStarNotifications NotificationRules](https://docs.aws.amazon.com/codestarnotifications/latest/userguide/) for receiving notifications based on events occurring in your AWS services.

## Minimal Example

Create a basic NotificationRule with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicNotificationRule = await AWS.CodeStarNotifications.NotificationRule("BasicNotificationRule", {
  Name: "MyNotificationRule",
  EventTypeIds: ["codecommit:ReferenceCreated", "codecommit:ReferenceUpdated"],
  DetailType: "FULL",
  Resource: "arn:aws:codecommit:us-west-2:123456789012:MyDemoRepo",
  Targets: [{
    TargetType: "SNS",
    TargetAddress: "arn:aws:sns:us-west-2:123456789012:MySNSTopic"
  }],
  Status: "ACTIVE",
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

Configure a NotificationRule with additional properties such as a custom status and multiple targets.

```ts
const advancedNotificationRule = await AWS.CodeStarNotifications.NotificationRule("AdvancedNotificationRule", {
  Name: "AdvancedNotificationRule",
  EventTypeIds: ["codecommit:PullRequestCreated", "codecommit:PullRequestUpdated"],
  DetailType: "BASIC",
  Resource: "arn:aws:codecommit:us-west-2:123456789012:MyAdvancedRepo",
  Targets: [
    {
      TargetType: "SNS",
      TargetAddress: "arn:aws:sns:us-west-2:123456789012:MyAdvancedSNSTopic"
    },
    {
      TargetType: "Chatbot",
      TargetAddress: "Slack:MySlackChannel"
    }
  ],
  Status: "ACTIVE",
  Tags: [{ Key: "Environment", Value: "Production" }, { Key: "Team", Value: "DevOps" }]
});
```

## Example with Custom Status and Multiple Tags

Create a NotificationRule that uses a custom status and multiple tags for better resource management.

```ts
const customStatusNotificationRule = await AWS.CodeStarNotifications.NotificationRule("CustomStatusNotificationRule", {
  Name: "CustomStatusNotificationRule",
  EventTypeIds: ["codecommit:CommitCreated"],
  DetailType: "FULL",
  Resource: "arn:aws:codecommit:us-west-2:123456789012:MyCustomRepo",
  Targets: [{
    TargetType: "Lambda",
    TargetAddress: "arn:aws:lambda:us-west-2:123456789012:function:MyLambdaFunction"
  }],
  Status: "DISABLED",
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Owner", Value: "TeamA" }
  ]
});
```
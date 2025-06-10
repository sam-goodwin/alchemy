---
title: SubscriberNotification
description: Learn how to create, update, and manage AWS SecurityLake SubscriberNotifications using Alchemy Cloud Control.
---


The SubscriberNotification resource allows you to manage notifications for AWS Security Lake subscribers. For more information, refer to the [AWS SecurityLake SubscriberNotifications](https://docs.aws.amazon.com/securitylake/latest/userguide/).

## Minimal Example

Create a basic SubscriberNotification with required properties:

```ts
import AWS from "alchemy/aws/control";

const subscriberNotification = await AWS.SecurityLake.SubscriberNotification("mySubscriberNotification", {
  SubscriberArn: "arn:aws:securitylake:us-west-2:123456789012:subscriber/my-subscriber",
  NotificationConfiguration: {
    SnsConfiguration: {
      SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-sns-topic",
      RoleArn: "arn:aws:iam::123456789012:role/my-sns-role"
    }
  },
  adopt: true // Adopts existing resource if it already exists
});
```

## Advanced Configuration

Configure a SubscriberNotification with additional notification settings:

```ts
const advancedSubscriberNotification = await AWS.SecurityLake.SubscriberNotification("advancedSubscriberNotification", {
  SubscriberArn: "arn:aws:securitylake:us-west-2:123456789012:subscriber/advanced-subscriber",
  NotificationConfiguration: {
    SnsConfiguration: {
      SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-advanced-sns-topic",
      RoleArn: "arn:aws:iam::123456789012:role/my-advanced-sns-role"
    },
    EmailConfiguration: {
      EmailAddresses: ["notify@example.com"],
      SuccessFeedbackRoleArn: "arn:aws:iam::123456789012:role/my-email-success-role",
      FailureFeedbackRoleArn: "arn:aws:iam::123456789012:role/my-email-failure-role"
    }
  }
});
```

## Custom Notification Settings

Create a SubscriberNotification with custom notification settings:

```ts
const customNotification = await AWS.SecurityLake.SubscriberNotification("customSubscriberNotification", {
  SubscriberArn: "arn:aws:securitylake:us-west-2:123456789012:subscriber/custom-subscriber",
  NotificationConfiguration: {
    SnsConfiguration: {
      SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-custom-sns-topic",
      RoleArn: "arn:aws:iam::123456789012:role/my-custom-sns-role"
    },
    SqsConfiguration: {
      QueueUrl: "https://sqs.us-west-2.amazonaws.com/123456789012/my-queue",
      RoleArn: "arn:aws:iam::123456789012:role/my-sqs-role"
    }
  }
});
```
